export const loadPatch = (e: any) => {
  e.stopPropagation()
  e.preventDefault()
  const files = e.dataTransfer.files // Array of all files
  const file = files[0]

  return new Promise(resolve => {
    if (file && file.name.match(/\.pd$/)) {
      const reader = new FileReader()

      reader.onload = (e2: any) => {
        resolve(e2.target.result)
      }

      reader.readAsBinaryString(file) // start reading the file data.
    }
  })
}

