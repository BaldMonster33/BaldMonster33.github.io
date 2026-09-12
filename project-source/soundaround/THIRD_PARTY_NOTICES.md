# Third-party notices

## ReSpeaker USB 4 Mic Array tuning driver

- Local file: `scripts/tuning.py`
- Upstream project: ReSpeaker USB 4 Mic Array, https://github.com/respeaker/usb_4_mic_array
- Comparison commit: `00585f08779a816107f1668684815660aab2fe43`
- Upstream source: https://github.com/respeaker/usb_4_mic_array/blob/00585f08779a816107f1668684815660aab2fe43/tuning.py
- Upstream license: Apache License 2.0, reproduced verbatim in `LICENSES/Apache-2.0-ReSpeaker.txt`.
- License source: https://github.com/respeaker/usb_4_mic_array/blob/00585f08779a816107f1668684815660aab2fe43/LICENSE

**Historical modified-file notice:** the archived `scripts/tuning.py` changes `response.tostring()` to `response.tobytes()` when unpacking a USB response. Its remaining differences from the comparison source are whitespace. The original editor of this change is not established. The file was copied without further modification when this archive was prepared on September 12, 2026. The cited comparison commit identifies the version inspected; it does not establish which upstream revision was originally downloaded in 2023.

The upstream source file contains no individual copyright header. This notice preserves its attribution to the ReSpeaker project without inventing an author or claiming the driver as original SoundAround code. Hashes of the upstream source, license, and local file are recorded in `PROVENANCE.json`.

## External libraries

The source imports PyUSB, NumPy, and `rpi_ws281x`, which are not bundled in this package. Their inclusion as dependencies does not imply authorship by the SoundAround project team. No new license is granted to the historical team-authored code by this package or by the surrounding portfolio website's MIT license.
