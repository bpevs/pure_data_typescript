import { serializeToFile } from "./serialization";
export function downloadPatch(patch) {
    if (patch != null) {
        var patchText = serializeToFile(patch);
        var blob = new Blob([patchText], { type: "application/octet-stream" });
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement("a");
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
}
//# sourceMappingURL=downloadPatch.js.map