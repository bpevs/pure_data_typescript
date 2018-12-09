export var loadPatch = function (e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // Array of all files
    var file = files[0];
    return new Promise(function (resolve) {
        if (file && file.name.match(/\.pd$/)) {
            var reader = new FileReader();
            reader.onload = function (e2) {
                resolve(e2.target.result);
            };
            reader.readAsBinaryString(file); // start reading the file data.
        }
    });
};
//# sourceMappingURL=loadPatch.js.map