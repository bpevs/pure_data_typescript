import { serializeToFile } from "../utilities/serialization"


export function downloadPatch(patch: any[]) {
  if (patch != null) {
    const patchText = serializeToFile(patch)
    const blob = new Blob([patchText], { type: "application/octet-stream" })
    const blobURL = window.URL.createObjectURL(blob)
    const tempLink = document.createElement("a")
    tempLink.style.display = "none"
    tempLink.href = blobURL
    tempLink.setAttribute("download", "patch.pd")
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank")
    }

    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }
}
