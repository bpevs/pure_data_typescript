export function downloadPatch(patchText: string) {
  const blob = new Blob([patchText], { type: "application/octet-stream" });
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", "patch.pd");
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}

export const loadPatch = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  const files = e.dataTransfer.files; // Array of all files
  const file = files[0];

  return new Promise((resolve) => {
    if (file && file.name.match(/\.pd$/)) {
      const reader = new FileReader();

      reader.onload = (e2: any) => {
        resolve(e2.target.result);
      };

      reader.readAsBinaryString(file); // start reading the file data.
    }
  });
};
