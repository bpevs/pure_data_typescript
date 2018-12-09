var body = document.getElementsByTagName("body")[0];
var ContextMenu = /** @class */ (function () {
    function ContextMenu() {
        var _this = this;
        this.ref = null;
        this.listeners = [];
        this.removeMenu = function () {
            if (_this.ref) {
                body.removeChild(_this.ref);
                _this.ref = null;
            }
            if (_this.listeners) {
                _this.listeners.forEach(function (listener) { return removeEventListener("click", listener); });
            }
        };
        body.addEventListener("click", this.removeMenu);
    }
    ContextMenu.prototype.render = function (xPos, yPos, items) {
        var _this = this;
        var menu = this.ref || document.createElement("div");
        menu.className = "context-menu";
        menu.style.top = yPos + "px";
        menu.style.left = xPos + "px";
        var menuItems = items.map(function (_a, i) {
            var name = _a.name;
            return "<li class=\"context-" + i + "\">" + name + "</li>";
        }).join("");
        menu.innerHTML = "<ul>" + menuItems + "</ul>";
        if (!this.ref) {
            body.appendChild(menu);
            items.forEach(function (_a, i) {
                var method = _a.method;
                var ref = document.getElementsByClassName("context-" + i)[0];
                if (ref)
                    _this.listeners.push(ref.addEventListener("click", method));
            });
        }
        this.ref = menu;
    };
    return ContextMenu;
}());
export { ContextMenu };
//# sourceMappingURL=ContextMenu.js.map