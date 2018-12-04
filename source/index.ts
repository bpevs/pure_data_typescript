import { deserializeFromFile, serializeToFile } from "./utilities/serialization.js"


fetch("/example/example.pd")
  .then(res => res.text())
  .then(text => {
    const deserialized = deserializeFromFile(text)
    const serialized = serializeToFile(deserialized)
    console.log(deserialized)
    console.log(text)
    console.log(serialized)
  })
  .catch(error => console.log(error))
