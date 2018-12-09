import Observable from "zen-observable";
export var mouseon = new Observable(function (observer) {
    var listener = addEventListener("mousemove", function (evt) { return observer.next(evt); });
    return function () { return removeEventListener("mousemove", listener); };
});
//# sourceMappingURL=mouseListener.js.map