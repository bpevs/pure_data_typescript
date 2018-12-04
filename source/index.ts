import { parse } from "./parser.js"

fetch("/example/example.pd")
  .then(res => res.text())
  .then(text => console.log(parse(text)))
  .catch(error => console.log(error))
