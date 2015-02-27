var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../Shape'], function (require, exports, Shape) {
    /**
     * @class BackgroundColor
     */
    var BackgroundColor = (function (_super) {
        __extends(BackgroundColor, _super);
        /**
         *
         * @param {string} color
         * @param {string|number} width
         * @param {string|number} height
         * @param {string|number} x
         * @param {string|number} y
         * @param {string|number} regX
         * @param {string|number} regY
         */
        function BackgroundColor(color, width, height, x, y, regX, regY) {
            if (width === void 0) { width = '100%'; }
            if (height === void 0) { height = '100%'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, undefined, width, height, x, y, regX, regY);
            this._color = '#000';
            this._color = color;
        }
        Object.defineProperty(BackgroundColor.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
                this.setBackground();
            },
            enumerable: true,
            configurable: true
        });
        BackgroundColor.prototype.setBackground = function () {
            this.graphics.clear().beginFill(this._color).drawRect(0, 0, this.width, this.height);
        };
        BackgroundColor.prototype.onResize = function (e) {
            _super.prototype.onResize.call(this, e);
            this.setBackground();
        };
        return BackgroundColor;
    })(Shape);
    return BackgroundColor;
});
