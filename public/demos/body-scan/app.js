(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const canvas = $('#scan');
  const ctx = canvas.getContext('2d');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const jointNames = ['Nose','Neck','R shoulder','R elbow','R wrist','L shoulder','L elbow','L wrist','Mid hip','R hip','R knee','R ankle','L hip','L knee','L ankle','R eye','L eye','R ear','L ear','L big toe','L small toe','L heel','R big toe','R small toe','R heel'];
  const baseJoints = [
    [0,1.34,.01,.98],[0,1.08,0,.99],[-.30,.99,0,.97],[-.48,.58,.02,.91],[-.52,.18,.03,.76],[.30,.99,0,.96],[.48,.58,.02,.88],[.52,.18,.03,.72],[0,.04,0,.99],[-.17,.03,0,.98],[-.16,-.78,.03,.94],[-.15,-1.60,.04,.86],[.17,.03,0,.97],[.16,-.78,.03,.92],[.15,-1.60,.04,.84],[-.05,1.38,.01,.81],[.05,1.38,.01,.79],[-.11,1.35,0,.68],[.11,1.35,0,.65],[.19,-1.72,-.12,.71],[.10,-1.72,-.15,.62],[.15,-1.67,.13,.74],[-.19,-1.72,-.12,.69],[-.10,-1.72,-.15,.60],[-.15,-1.67,.13,.72]
  ];
  const bones = [[0,1],[0,15],[0,16],[15,17],[16,18],[1,2],[2,3],[3,4],[1,5],[5,6],[6,7],[1,8],[8,9],[9,10],[10,11],[8,12],[12,13],[13,14],[11,22],[22,23],[11,24],[14,19],[19,20],[14,21]];
  const stages = {
    scan:   {kicker:'Input',title:'Read PLY mesh',copy:'VTK loads the selected scan as polygonal data.'},
    render: {kicker:'Nine viewpoints',title:'Generate offscreen renders',copy:'Rotate 0° through 360° at 45° intervals and save PNGs.'},
    pose:   {kicker:'OpenPose',title:'Detect BODY_25 landmarks',copy:'Each view returns 25 × (x, y, confidence) values.'},
    rays:   {kicker:'VTK point picker',title:'Map detections onto the scan',copy:'Each accepted 2D point becomes a ray through the 3D mesh.'},
    solve:  {kicker:'SciPy optimization',title:'Reconstruct 3D joints',copy:'Inverse transforms align views; minimization finds the closest point to all rays.'},
    export: {kicker:'Result',title:'Visualize and write coordinates',copy:'Render joints over the scan and export CSV or JSON output.'}
  };
  const stageOrder = Object.keys(stages);
  const variants = {
    standing:{shoulder:1,torso:1,stance:0,seated:false,metrics:['44.8 cm','61.3 cm','38.9 cm','173.6 cm']},
    jacket:{shoulder:1.13,torso:1.08,stance:.02,seated:false,metrics:['46.1 cm','62.0 cm','40.2 cm','174.1 cm']},
    seated:{shoulder:.96,torso:1,stance:.28,seated:true,metrics:['43.2 cm','60.7 cm','38.1 cm','172.9 cm']}
  };

  const state = {stage:'scan', yaw:0, pitch:-.04, zoom:1, mode:'surface', viewIndex:0, threshold:.3, model:'jacket', points:[], joints:[], drag:false, lastX:0, lastY:0, running:false, auto:false, raf:0, toastTimer:0};

  function seeded(index, salt = 0) {
    const x = Math.sin(index * 91.173 + salt * 17.31) * 43758.5453;
    return x - Math.floor(x);
  }

  function makeJointSet(kind) {
    const variant = variants[kind];
    return baseJoints.map((joint, index) => {
      let [x,y,z,confidence] = joint;
      if ([2,3,4,5,6,7].includes(index)) x *= variant.shoulder;
      if ([2,5,1].includes(index)) y *= variant.torso;
      if ([9,10,11].includes(index)) x -= variant.stance;
      if ([12,13,14].includes(index)) x += variant.stance;
      if (variant.seated && [10,11,13,14,19,20,21,22,23,24].includes(index)) {
        if ([10,13].includes(index)) { y = -.42; z = -.48; }
        if ([11,14].includes(index)) { y = -.98; z = -.46; }
        if (index >= 19) { y = -1.02; z = -.68; }
      }
      confidence = Math.max(.42, Math.min(.99, confidence + (seeded(index, kind.length)-.5)*.08));
      return {x,y,z,c:confidence,name:jointNames[index],index};
    });
  }

  function addEllipsoid(points, center, radii, rings, perRing, salt) {
    for (let ring = 0; ring <= rings; ring++) {
      const v = -Math.PI/2 + (ring/rings)*Math.PI;
      for (let index = 0; index < perRing; index++) {
        const u = index/perRing*Math.PI*2;
        const noise = (seeded(index+ring*perRing,salt)-.5)*.016;
        points.push({
          x:center[0]+Math.cos(v)*Math.cos(u)*(radii[0]+noise),
          y:center[1]+Math.sin(v)*(radii[1]+noise),
          z:center[2]+Math.cos(v)*Math.sin(u)*(radii[2]+noise),
          band:ring/rings
        });
      }
    }
  }

  function addLimb(points, a, b, radius, steps, salt) {
    const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z;
    const length=Math.hypot(dx,dy,dz)||1;
    const nx=dx/length,ny=dy/length,nz=dz/length;
    const ref=Math.abs(ny)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};
    let ux=ny*ref.z-nz*ref.y,uy=nz*ref.x-nx*ref.z,uz=nx*ref.y-ny*ref.x;
    const unitLength=Math.hypot(ux,uy,uz)||1;ux/=unitLength;uy/=unitLength;uz/=unitLength;
    const vx=ny*uz-nz*uy,vy=nz*ux-nx*uz,vz=nx*uy-ny*ux;
    for(let step=0;step<=steps;step++){
      const t=step/steps,taper=.78+.22*Math.sin(Math.PI*t);
      for(let index=0;index<13;index++){
        const q=index/13*Math.PI*2,noise=(seeded(index+step*13,salt)-.5)*.009;
        const size=radius*taper+noise,cos=Math.cos(q),sin=Math.sin(q);
        points.push({x:a.x+dx*t+(ux*cos+vx*sin)*size,y:a.y+dy*t+(uy*cos+vy*sin)*size,z:a.z+dz*t+(uz*cos+vz*sin)*size,band:t});
      }
    }
  }

  function addLooseShirt(points, joints) {
    for(let ring=0;ring<=22;ring++){
      const t=ring/22,y=.02+t*1.02;
      const shoulderEase=Math.pow(t,2.4),width=.31+shoulderEase*.11;
      const depth=.235+(1-t)*.018;
      for(let index=0;index<38;index++){
        const angle=index/38*Math.PI*2;
        const fold=(seeded(index+ring*38,16)-.5)*.018+(Math.sin(angle*5+ring*.55)*.009);
        points.push({x:Math.cos(angle)*(width+fold),y,z:Math.sin(angle)*(depth+fold*.45),band:t,garment:true});
      }
    }
    addLimb(points,joints[2],{x:(joints[2].x+joints[3].x)*.5,y:(joints[2].y+joints[3].y)*.5,z:0},.145,8,17);
    addLimb(points,joints[5],{x:(joints[5].x+joints[6].x)*.5,y:(joints[5].y+joints[6].y)*.5,z:0},.145,8,18);
  }

  function buildModel(kind) {
    const variant=variants[kind];
    const joints=makeJointSet(kind),points=[];
    addEllipsoid(points,[0,.56,0],[.34*variant.shoulder,.66,.22*variant.torso],22,34,1);
    addEllipsoid(points,[0,.02,0],[.29,.31,.23],11,30,2);
    addEllipsoid(points,[0,1.32,0],[.15,.20,.145],12,28,3);
    addLimb(points,joints[2],joints[3],.10,12,4); addLimb(points,joints[3],joints[4],.075,12,5);
    addLimb(points,joints[5],joints[6],.10,12,6); addLimb(points,joints[6],joints[7],.075,12,7);
    addLimb(points,joints[9],joints[10],.135,15,8); addLimb(points,joints[10],joints[11],.105,15,9);
    addLimb(points,joints[12],joints[13],.135,15,10); addLimb(points,joints[13],joints[14],.105,15,11);
    if(kind==='jacket') addLooseShirt(points,joints);
    state.points=points;state.joints=joints;
    const metrics=variant.metrics;$('#shoulder').textContent=metrics[0];$('#torso').textContent=metrics[1];$('#hip').textContent=metrics[2];$('#height').textContent=metrics[3];
    renderJointList();drawCameraStrip();draw();
  }

  function rotatePoint(point) {
    let {x,y,z}=point;
    const yawCos=Math.cos(state.yaw),yawSin=Math.sin(state.yaw);
    [x,z]=[x*yawCos-z*yawSin,x*yawSin+z*yawCos];
    const pitchCos=Math.cos(state.pitch),pitchSin=Math.sin(state.pitch);
    [y,z]=[y*pitchCos-z*pitchSin,y*pitchSin+z*pitchCos];
    return {x,y,z};
  }

  function project(point, width = canvas.clientWidth, height = canvas.clientHeight) {
    const transformed=rotatePoint(point),scale=Math.min(width,height)*.245*state.zoom;
    return {x:width/2+transformed.x*scale,y:height*.53-transformed.y*scale,z:transformed.z};
  }

  function drawGrid(width,height) {
    ctx.lineWidth=1;ctx.strokeStyle='rgba(75,63,53,.055)';
    for(let index=-12;index<=12;index++){
      ctx.beginPath();ctx.moveTo(width/2+index*32,0);ctx.lineTo(width/2+index*32,height);ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,height*.53+index*32);ctx.lineTo(width,height*.53+index*32);ctx.stroke();
    }
    ctx.strokeStyle='rgba(75,63,53,.16)';ctx.beginPath();ctx.moveTo(0,height*.83);ctx.lineTo(width,height*.83);ctx.stroke();
  }

  function drawSmoothBodySurface() {
    const scale=Math.min(canvas.clientWidth,canvas.clientHeight)*.245*state.zoom;
    const screenRadius=(xRadius,zRadius)=>Math.hypot(xRadius*Math.cos(state.yaw),zRadius*Math.sin(state.yaw))*scale;
    const capsule=(a,b,radius,color)=>{const start=project(state.joints[a]),end=project(state.joints[b]);ctx.strokeStyle=color;ctx.lineWidth=radius*scale*2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(start.x,start.y);ctx.lineTo(end.x,end.y);ctx.stroke();};
    const ellipse=(center,xRadius,yRadius,zRadius,color)=>{const point=project({x:center[0],y:center[1],z:center[2]});ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(point.x,point.y,screenRadius(xRadius,zRadius),yRadius*scale,0,0,Math.PI*2);ctx.fill();};
    ctx.save();
    capsule(9,10,.135,'#aaa69f');capsule(10,11,.105,'#aaa69f');capsule(12,13,.135,'#b4b0a9');capsule(13,14,.105,'#b4b0a9');
    capsule(2,3,.10,'#aaa69f');capsule(3,4,.075,'#aaa69f');capsule(5,6,.10,'#b4b0a9');capsule(6,7,.075,'#b4b0a9');
    ellipse([0,.02,0],.29,.31,.23,'#aaa69f');
    ellipse([0,.56,0],.34*variants[state.model].shoulder,.66,.22*variants[state.model].torso,'#aaa69f');
    if(state.model==='jacket'){
      const center=project({x:0,y:.53,z:0}),topY=project({x:0,y:1.06,z:0}).y,bottomY=project({x:0,y:.04,z:0}).y;
      const topWidth=screenRadius(.43,.25),bottomWidth=screenRadius(.33,.25);
      ctx.fillStyle='#bab3aa';ctx.beginPath();ctx.moveTo(center.x-topWidth,topY);ctx.quadraticCurveTo(center.x-topWidth*1.04,(topY+bottomY)/2,center.x-bottomWidth,bottomY);ctx.lineTo(center.x+bottomWidth,bottomY);ctx.quadraticCurveTo(center.x+topWidth*1.04,(topY+bottomY)/2,center.x+topWidth,topY);ctx.closePath();ctx.fill();
      capsule(2,3,.145,'#bab3aa');capsule(5,6,.145,'#bab3aa');
    }
    ellipse([0,1.32,0],.15,.20,.145,'#b8b4ad');
    ctx.restore();
  }

  function drawPointCloud() {
    const sorted=state.points.map(point=>({point,projected:project(point)})).sort((a,b)=>a.projected.z-b.projected.z);
    if(state.mode==='surface'){
      drawSmoothBodySurface();ctx.globalAlpha=.34;
      sorted.forEach(({point,projected},index)=>{
        if(index%2)return;
        const shade=Math.round(151+Math.max(-.25,Math.min(.34,projected.z)) * 72);
        ctx.fillStyle=point.garment?`rgb(${shade+12},${shade+7},${shade})`:`rgb(${shade},${shade-3},${shade-7})`;
        const size=point.garment?3.8:3.2;
        ctx.fillRect(projected.x-size/2,projected.y-size/2,size,size);
      });
      ctx.globalAlpha=1;
    } else {
      sorted.forEach(({projected},index)=>{
        const depth=Math.max(.16,Math.min(.74,.42+projected.z*.45));
        ctx.fillStyle=state.mode==='wire'?`rgba(82,72,64,${depth*.75})`:`rgba(157,76,52,${depth})`;
        const size=state.mode==='wire'?(index%4===0?1.8:.8):1.7;
        ctx.fillRect(projected.x,projected.y,size,size);
      });
    }
  }

  function drawCameras() {
    const width=canvas.clientWidth,height=canvas.clientHeight;
    for(let index=0;index<9;index++){
      const angle=index*Math.PI/4,camera={x:Math.sin(angle)*1.85,y:.35,z:Math.cos(angle)*1.85},point=project(camera);
      ctx.strokeStyle=index===state.viewIndex?'#b85c3d':'rgba(96,81,68,.38)';ctx.lineWidth=index===state.viewIndex?2:1;
      ctx.beginPath();ctx.arc(point.x,point.y,6,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(point.x,point.y);ctx.lineTo(width/2,height*.50);ctx.strokeStyle='rgba(96,81,68,.12)';ctx.stroke();
      ctx.fillStyle=index===state.viewIndex?'#9d4c34':'#796f66';ctx.font='600 9px ui-monospace';ctx.fillText(`${index*45}°`,point.x+8,point.y+3);
    }
  }

  function accepted(joint){return joint.c>=state.threshold;}

  function drawSkeleton(color='#9d4c34',lineColor='rgba(157,76,52,.94)') {
    const points=state.joints.map(project);ctx.lineWidth=3.4;ctx.strokeStyle=lineColor;
    bones.forEach(([a,b])=>{if(!accepted(state.joints[a])||!accepted(state.joints[b]))return;ctx.beginPath();ctx.moveTo(points[a].x,points[a].y);ctx.lineTo(points[b].x,points[b].y);ctx.stroke();});
    points.forEach((point,index)=>{if(!accepted(state.joints[index]))return;ctx.beginPath();ctx.arc(point.x,point.y,5,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();ctx.lineWidth=1.6;ctx.strokeStyle='#faf8f3';ctx.stroke();});
  }

  function drawPoseFrame() {
    const width=canvas.clientWidth,height=canvas.clientHeight;ctx.save();ctx.strokeStyle='rgba(174,121,63,.44)';ctx.setLineDash([6,5]);ctx.strokeRect(width*.31,height*.09,width*.38,height*.78);ctx.restore();
    ctx.fillStyle='rgba(143,98,46,.9)';ctx.font='600 10px ui-monospace';ctx.fillText(`model_${state.viewIndex*45}.png · BODY_25`,width*.31,height*.075);
    drawSkeleton();
  }

  function drawRays() {
    const cameraAngle=state.viewIndex*Math.PI/4;
    const camera=project({x:Math.sin(cameraAngle)*1.75,y:.35,z:Math.cos(cameraAngle)*1.75});
    const ids=[0,2,5,8,9,12,10,13,11,14];
    ids.forEach((id,index)=>{const point=project(state.joints[id]);if(!accepted(state.joints[id]))return;ctx.strokeStyle=`rgba(117,87,101,${.25+(index%3)*.12})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(camera.x,camera.y);ctx.lineTo(point.x,point.y);ctx.stroke();});
    ctx.fillStyle='#755765';ctx.beginPath();ctx.arc(camera.x,camera.y,6,0,Math.PI*2);ctx.fill();drawSkeleton('#ae793f','rgba(174,121,63,.58)');
  }

  function dimensionLine(a,b,label,offset=0) {
    const start=project(state.joints[a]),end=project(state.joints[b]);ctx.save();ctx.strokeStyle='#a65348';ctx.fillStyle='#8f4036';ctx.lineWidth=1.8;ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(start.x,start.y+offset);ctx.lineTo(end.x,end.y+offset);ctx.stroke();ctx.setLineDash([]);ctx.font='700 9px ui-monospace';ctx.textAlign='center';ctx.fillText(label,(start.x+end.x)/2,(start.y+end.y)/2+offset-6);ctx.restore();
  }

  function draw() {
    const width=canvas.clientWidth,height=canvas.clientHeight;ctx.clearRect(0,0,width,height);drawGrid(width,height);drawPointCloud();
    if(state.stage==='render') drawCameras();
    if(state.stage==='pose') drawPoseFrame();
    if(state.stage==='rays') drawRays();
    if(state.stage==='solve'||state.stage==='export') drawSkeleton();
    if(state.stage==='solve'){
      const point=project(state.joints[8]);ctx.strokeStyle='rgba(117,87,101,.72)';for(let index=0;index<5;index++){ctx.beginPath();ctx.arc(point.x,point.y,9+index*6,0,Math.PI*2);ctx.stroke();}
    }
    if(state.stage==='export'){
      const metrics=variants[state.model].metrics;dimensionLine(2,5,metrics[0],-12);dimensionLine(9,12,metrics[2],9);dimensionLine(0,14,metrics[3],20);
    }
  }

  function resize() {
    const rect=canvas.getBoundingClientRect(),density=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(rect.width*density);canvas.height=Math.round(rect.height*density);ctx.setTransform(density,0,0,density,0,0);draw();
  }

  function miniProject(point, angle, width, height) {
    const yawCos=Math.cos(angle),yawSin=Math.sin(angle),x=point.x*yawCos-point.z*yawSin,z=point.x*yawSin+point.z*yawCos,scale=Math.min(width,height)*.25;
    return {x:width/2+x*scale,y:height*.54-point.y*scale,z};
  }

  function drawMiniSkeleton(miniContext, angle, width, height) {
    const joints=state.joints.map(joint=>miniProject(joint,angle,width,height));
    miniContext.lineWidth=1.15;miniContext.strokeStyle='rgba(174,121,63,.9)';
    bones.forEach(([a,b])=>{if(!accepted(state.joints[a])||!accepted(state.joints[b]))return;miniContext.beginPath();miniContext.moveTo(joints[a].x,joints[a].y);miniContext.lineTo(joints[b].x,joints[b].y);miniContext.stroke();});
    miniContext.fillStyle='#a85d38';joints.forEach((joint,index)=>{if(!accepted(state.joints[index]))return;miniContext.beginPath();miniContext.arc(joint.x,joint.y,1.35,0,Math.PI*2);miniContext.fill();});
  }

  function drawCameraStrip() {
    const wrap=$('#camera-strip');wrap.innerHTML='';
    for(let index=0;index<9;index++){
      const button=document.createElement('button');button.type='button';button.className='camera-view';button.dataset.camera=String(index);button.setAttribute('aria-label',`Rendered camera view ${index+1}, ${index*45} degrees`);button.setAttribute('aria-pressed',String(index===state.viewIndex));button.innerHTML=`<canvas width="94" height="72"></canvas><span>${index*45}°</span>`;wrap.append(button);
      const mini=button.querySelector('canvas'),miniContext=mini.getContext('2d'),angle=index*Math.PI/4;
      const projected=state.points.filter((_,pointIndex)=>pointIndex%3===0).map(point=>miniProject(point,angle,94,72)).sort((a,b)=>a.z-b.z);
      projected.forEach(point=>{const shade=Math.round(154+Math.max(-.25,Math.min(.3,point.z))*70);miniContext.fillStyle=`rgb(${shade},${shade-3},${shade-7})`;miniContext.fillRect(point.x-1.25,point.y-1.25,2.5,2.5)});
      if(['pose','rays','solve','export'].includes(state.stage))drawMiniSkeleton(miniContext,angle,94,72);
    }
  }

  function selectCamera(index) {
    state.viewIndex=index;state.yaw=index*Math.PI/4;$$('[data-camera]').forEach((button,buttonIndex)=>button.setAttribute('aria-pressed',String(buttonIndex===index)));$('#view-label').textContent=`Camera ${index+1} / 9 · ${index*45}°`;$('#view-detail').textContent=`${index*45}° · model_${index*45}.png`;draw();
  }

  function setStage(stage, fromRun=false) {
    state.stage=stage;$$('[data-stage]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.stage===stage)));const data=stages[stage];$('#stage-kicker').textContent=data.kicker;$('#stage-title').textContent=data.title;$('#stage-copy').textContent=data.copy;$('#viewer-hint').textContent=stage==='render'?'Choose any generated viewpoint':stage==='rays'?'Purple lines show 2D picks projected into 3D':'Drag to orbit · scroll to zoom';
    if(!fromRun) $(`[data-stage="${stage}"]`).scrollIntoView({block:'nearest'});drawCameraStrip();draw();
  }

  function renderJointList() {
    const wrap=$('#joint-list');wrap.innerHTML=state.joints.map(joint=>{
      const point=[joint.x*500,joint.y*500,joint.z*500].map(value=>`${value>=0?'+':''}${value.toFixed(1)}`).join(', '),low=!accepted(joint);
      return `<div class="joint-row"><span>${String(joint.index).padStart(2,'0')} · ${joint.name}</span><span class="${low?'low':'conf'}">${joint.c.toFixed(2)}</span><code>${low?'filtered':point}</code></div>`;
    }).join('');
    const count=state.joints.filter(accepted).length;$('#accepted-count').textContent=String(count);$('#residual').textContent=`${(2.1+(25-count)*.42).toFixed(1)} mm`;
  }

  function addLog(message, success=false) {
    const logs=$('#logs'),time=new Date().toLocaleTimeString([],{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});logs.insertAdjacentHTML('beforeend',`<div><span>[${time}]</span> ${success?'<b>✓</b> ':''}${message}</div>`);logs.scrollTop=logs.scrollHeight;
  }

  function setProgress(value,label) {$('#progress-bar').style.width=`${value}%`;$('#progress-value').textContent=`${value}%`;$('#progress-label').textContent=label;}
  const wait=milliseconds=>new Promise(resolve=>setTimeout(resolve,reducedMotion?40:milliseconds));

  async function runPipeline(all=false) {
    if(state.running)return;const chosen=all?$$('.model-row input'):$$('.model-row input:checked');if(!chosen.length){showToast('Select at least one synthetic PLY model first.');return;}
    state.running=true;$('#status-dot').textContent='running';$('#status-dot').className='status-dot running';$('#download-csv').disabled=true;$$('#pipeline button').forEach(button=>button.classList.remove('done','running'));$('#logs').innerHTML='';$$('[data-result-tab]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.resultTab==='logs')));$$('[data-result-panel]').forEach(panel=>panel.hidden=panel.dataset.resultPanel!=='logs');
    const total=chosen.length*stageOrder.length;let completed=0;
    for(const input of chosen){
      state.model=input.value;$$('.model-row').forEach(row=>row.classList.toggle('active',row.contains(input)));buildModel(input.value);addLog(`Loading ${input.closest('.model-row').querySelector('strong').textContent}`);
      for(let index=0;index<stageOrder.length;index++){
        const stage=stageOrder[index],button=$(`[data-stage="${stage}"]`);button.classList.add('running');setStage(stage,true);
        const messages={scan:'Read PLY polygon data',render:'Wrote 9 offscreen PNG renders',pose:'OpenPose returned BODY_25 arrays',rays:`Filtered at ${state.threshold.toFixed(2)} and picked mesh rays`,solve:'Aligned inverse transforms and minimized ray distance',export:$('#write-results').checked?'Wrote 25 joint coordinates to CSV':'Results held in memory'};
        setProgress(Math.round((completed/total)*100),`${input.value} · ${index+1}/6`);await wait(stage==='render'?720:540);addLog(messages[stage],true);button.classList.remove('running');button.classList.add('done');completed++;setProgress(Math.round((completed/total)*100),`${input.value} · ${index+1}/6`);
      }
    }
    state.running=false;$('#status-dot').textContent='complete';$('#status-dot').className='status-dot complete';$('#download-csv').disabled=!$('#write-results').checked;setProgress(100,`${chosen.length} model${chosen.length>1?'s':''} complete`);addLog(`Finished ${chosen.length} model${chosen.length>1?'s':''}`,true);setStage('export',true);showToast(`Pipeline complete: ${chosen.length} synthetic model${chosen.length>1?'s':''} processed.`);
  }

  function showToast(message) {const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);}

  function updateSelection() {const selected=$$('.model-row input:checked').length;$('#selection-count').textContent=`${selected} selected`;}

  function downloadCSV() {
    const rows=['joint,x_mm,y_mm,z_mm,confidence',...state.joints.map(joint=>[joint.name,(joint.x*500).toFixed(2),(joint.y*500).toFixed(2),(joint.z*500).toFixed(2),joint.c.toFixed(3)].join(','))];const blob=new Blob([rows.join('\n')],{type:'text/csv'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`${state.model}_synthetic_joints.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast('Synthetic joint CSV downloaded.');
  }

  function autoLoop() {if(!state.auto)return;state.yaw+=.006;draw();state.raf=requestAnimationFrame(autoLoop);}

  $('#camera-strip').addEventListener('click',event=>{const button=event.target.closest('[data-camera]');if(button)selectCamera(Number(button.dataset.camera));});
  $$('#pipeline [data-stage]').forEach(button=>button.addEventListener('click',()=>setStage(button.dataset.stage)));
  $$('[data-view-mode]').forEach(button=>button.addEventListener('click',()=>{state.mode=button.dataset.viewMode;$$('[data-view-mode]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));draw();}));
  $$('[data-result-tab]').forEach(button=>button.addEventListener('click',()=>{$$('[data-result-tab]').forEach(item=>item.setAttribute('aria-selected',String(item===button)));$$('[data-result-panel]').forEach(panel=>panel.hidden=panel.dataset.resultPanel!==button.dataset.resultTab);}));
  $$('[data-toast]').forEach(button=>button.addEventListener('click',()=>showToast(button.dataset.toast)));
  $$('.model-row input').forEach(input=>input.addEventListener('change',()=>{updateSelection();if(input.checked){state.model=input.value;$$('.model-row').forEach(row=>row.classList.toggle('active',row.contains(input)));buildModel(input.value);}}));
  $('#threshold').addEventListener('input',event=>{state.threshold=Number(event.target.value)/100;$('#threshold-label').value=state.threshold.toFixed(2);$('#threshold-stat').textContent=state.threshold.toFixed(2);renderJointList();draw();});
  $('#axis').addEventListener('change',event=>{const axis=event.target.value;state.pitch=axis==='x'?.5:axis==='y'?.12:-.04;showToast(`Rotation axis set to ${event.target.selectedOptions[0].textContent}.`);draw();});
  $('#reset-camera').addEventListener('click',()=>{state.yaw=0;state.pitch=-.04;state.zoom=1;state.viewIndex=0;$('#view-label').textContent='Orbit view · 0°';draw();});
  $('#auto-rotate').addEventListener('click',event=>{state.auto=!state.auto;event.currentTarget.setAttribute('aria-pressed',String(state.auto));if(state.auto)autoLoop();else cancelAnimationFrame(state.raf);});
  $('#run-selected').addEventListener('click',()=>runPipeline(false));$('#run-all').addEventListener('click',()=>runPipeline(true));$('#download-csv').addEventListener('click',downloadCSV);
  $('#write-results').addEventListener('change',event=>{if(!event.target.checked)$('#download-csv').disabled=true;});
  canvas.addEventListener('pointerdown',event=>{state.drag=true;state.lastX=event.clientX;state.lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{if(!state.drag)return;state.yaw+=(event.clientX-state.lastX)*.012;state.pitch=Math.max(-.75,Math.min(.75,state.pitch+(event.clientY-state.lastY)*.007));state.lastX=event.clientX;state.lastY=event.clientY;draw();});
  canvas.addEventListener('pointerup',()=>state.drag=false);canvas.addEventListener('pointercancel',()=>state.drag=false);
  canvas.addEventListener('wheel',event=>{event.preventDefault();state.zoom=Math.max(.68,Math.min(1.6,state.zoom-event.deltaY*.0008));draw();},{passive:false});

  new ResizeObserver(resize).observe(canvas);buildModel('jacket');setStage('scan');updateSelection();setProgress(0,'Ready');addLog('Recovered application ready · synthetic clothed scan selected');resize();
})();
