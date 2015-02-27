var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../display/Container', '../geom/Size'], function (require, exports, Container, Size) {
    /**
     *
     */
    var FlexXPack = (function (_super) {
        __extends(FlexXPack, _super);
        function FlexXPack(margin, width, height, x, y, regX, regY) {
            if (margin === void 0) { margin = 0; }
            if (width === void 0) { width = 'auto'; }
            if (height === void 0) { height = 'auto'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, 1, 1, x, y, regX, regY);
            this.margin = 0;
            this.autoWidth = false;
            this.autoHeight = false;
            if (width == 'auto') {
                this.autoWidth = true;
            }
            else {
                this.setWidth(width);
            }
            if (height == 'auto') {
                this.autoHeight = true;
            }
            else {
                this.setHeight(height);
            }
            this.margin = margin;
        }
        FlexXPack.prototype.addChild = function () {
            var children = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                children[_i - 0] = arguments[_i];
            }
            var data = _super.prototype.addChild.apply(this, children);
            if (this._parentSizeIsKnown) {
                this.onResize(new Size(this.parent.getWidth(), this.parent.getHeight()));
            }
            return data;
        };
        FlexXPack.prototype.removeChild = function () {
            var children = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                children[_i - 0] = arguments[_i];
            }
            var data = _super.prototype.removeChild.apply(this, children);
            if (this._parentSizeIsKnown) {
                this.onResize(new Size(this.parent.getWidth(), this.parent.getHeight()));
            }
            return data;
        };
        FlexXPack.prototype.onResize = function (e) {
            var height = 0;
            var width = 0;
            if (this.children.length > 0) {
                var children = this.children;
                var x = 0;
                var margin = this.margin;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    child.x = x;
                    x += child.width;
                    x += margin;
                    width += child.width;
                    height = Math.max(height, child.height);
                }
                if (this.autoWidth) {
                    this.width = width + (margin * (this.children.length - 1));
                }
                if (this.autoHeight) {
                    this.height = height;
                }
            }
            _super.prototype.onResize.call(this, e);
        };
        return FlexXPack;
    })(Container);
    return FlexXPack;
});
