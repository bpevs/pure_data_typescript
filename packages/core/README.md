**This is experimental software. Expect broken parts, and breaking changes.**

# Pure Data
This is the unofficial javascript module for Pure-Data. It from-the-ground-up implementation of [Pure Data](https://puredata.info/) created for web. This sdk is meant for websites that want to consume Pure Data patches as audio effects. It is also used to power our web implementation of the Pure Data application. While you can use our subpackages for live creation of Pure Data patches, and you can technically connect patches together, "sdk" is designed for the consumption of completed and self-contained patches.

# Philosophy
- Sandbox modules; Developers should be able to add entities with minimal code added to core.
- Rendering should be separated from audio; we should be able to create multiple renderers for PureData patches.

# Technology
- Entities should be able to be written with either [Typescript](https://www.typescriptlang.org) or with [Rust + WebAssembly](https://rustwasm.github.io). Everything will be powered by the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- Our Initial Renderer will be [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

# Usage
```js
import { pdToPatch, startPatch } from "@pure-data/core"
import renderPatch from "@pure-data/canvas"

const patch = pdToPatch("#N canvas 624 103 899 784 10;")
renderPatch("#puredata", patch)
patch.setInlet(1, 100)
patch.streamInlet(0, audioInput)

startPatch(patch) // Turn on DSP. By default, outlet is default output
```
