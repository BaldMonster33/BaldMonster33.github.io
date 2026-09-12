# SoundAround — historical prototype source

SoundAround is a Spring 2023 Engineering Interactive Systems course project at the University of Michigan by Jeremy Zhengqi Huang and Johnny (Le) Qin. It explores wearable sound-direction feedback through peripheral LEDs.

Johnny originated the idea and handled hardware assembly, software, interaction design, testing, and results analysis. He did not lead the participant study sessions. These are project-level contributions; the recovered archive does not establish authorship of each individual file.

## Archive status

This package preserves all seven Python files from the historical `code.zip` archive, whose entries are dated April 24, 2023. The files are unchanged. Only macOS resource forks, `.DS_Store`, and IDE metadata were excluded. `PROVENANCE.json` records the original archive hash, individual source hashes, and upstream driver comparison.

This is an experimental source archive, not a verified runnable release. No project code was executed during recovery or packaging, and no hardware replay or benchmark reproduction was performed. The course report and the recovered code capture different stages of the prototype; the archive does not establish a clean final application build.

## System and dependencies

The reported prototype combines a ReSpeaker four-microphone array, Raspberry Pi, programmable LED strip, and portable power bank. Python reads direction estimates supplied by the microphone device and shares them between acquisition and display processes. LED position and color convey direction. The project integrates the device's direction estimates; it does not implement a new localization or beamforming algorithm.

The source imports Python `multiprocessing`, PyUSB, NumPy, and `rpi_ws281x`. It also imports the ReSpeaker `Tuning` driver. No dependency lockfile, confirmed final package versions, wiring specification, or complete setup procedure was recovered, so this archive does not provide an unverified installation command. Imports of `tuning` assume a module search path that is not configured by this package.

## Files and known differences

| File | Historical contents and limitations |
| --- | --- |
| `multiprocessing/scratchMultiprocessing.py` | Combined acquisition/display experiment with shared state and red/green direction mapping closest to the report. It initializes a 17-pixel strip while mapping directions to 12 positions. |
| `multiprocessing/main.py` | Refactored entry point that launches acquisition and a white-flashing display path. It is a different variant from the report's red/green interaction. |
| `multiprocessing/mic.py` | Direction polling at a 0.1-second interval. Its shared-array assignment uses a process-name string as an index, which is a defect. The polling interval is not a measured end-to-end latency. |
| `multiprocessing/lights.py` | Red/green mapping plus an alternative white-flashing display routine. Cleanup and indexing need review before reuse. |
| `scripts/drawSingleBeads.py` | LED experiment that expects an unrecovered `degree_input.txt` and configures a 40-pixel strip. |
| `scripts/tuning.py` | ReSpeaker device driver; see the attribution and historical change notice in `THIRD_PARTY_NOTICES.md`. |
| `audio/readMicrophoneArray.py` | A localhost TCP socket experiment that sends a fixed greeting; despite the filename, it does not acquire microphone direction data. |

The archived application does not configure the noise-suppression parameters exposed by the driver. Some routines refer to cleanup functions that are not defined in their module. These issues remain unchanged to preserve the historical artifact.

## Evaluation context

The course report describes five participants and quiet-lab direction-identification tasks: 22 of 25 front-direction trials were correct (88%), and 14 of 15 rear-direction trials were correct (93.3%). These are participant task results, not measured angular localization error. Noise-cancelling headphones were used for LED-only conditions; the report explicitly says this is not equivalent to the deaf or hard-of-hearing experience. Outdoor noise exposed limitations in indication stability and response time. The packaged source has not independently reproduced these results.

## Rights and attribution

This package does not grant a new license to the team-authored project code or report, and the portfolio website's root MIT license does not apply to these historical project files. Authorship and existing rights remain with their respective authors.

The third-party ReSpeaker driver retains its Apache-2.0 licensing. The exact upstream license is included in `LICENSES/Apache-2.0-ReSpeaker.txt`; its provenance and the historical local change are recorded in `THIRD_PARTY_NOTICES.md`. The other files depend on external libraries; those libraries are not bundled here.
