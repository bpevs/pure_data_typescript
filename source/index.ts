import { PDFloatatom, PDMsg, PDText } from "./elements/index.js"
import { deserializeFromFile, serializeToFile } from "./utilities/serialization.js"

fetch("/example/BPD_midikeys.pd")
  .then(res => res.text())
  .then(text => {
    const deserialized = deserializeFromFile(text)
    const serialized = serializeToFile(deserialized)

    deserialized.forEach(item => {
      if (
        item instanceof PDMsg
        || item instanceof PDFloatatom
        || item instanceof PDText
      ) item.render()
    })

    console.log(deserialized)
    console.log(text)
    console.log(serialized)
  })
  .catch(error => console.log(error))
