import { PDFloatatom, PDMsg, PDText } from "./elements"
import { mouseon } from "./utilities/mouseListener"
import { deserializeFromFile } from "./utilities/serialization"

fetch("/example/BPD_midikeys.pd")
  .then(res => res.text())
  .then(text => {
    const deserialized = deserializeFromFile(text)

    deserialized.forEach(item => {
      if (
        item instanceof PDMsg
        || item instanceof PDFloatatom
        || item instanceof PDText
      ) item.render()
    })

    console.log(deserialized)
  })
  .catch(error => console.log(error))

mouseon.forEach((evt) => {
  console.log(evt)
})
