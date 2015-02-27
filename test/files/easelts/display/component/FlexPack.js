var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../Container'], function (require, exports, Container) {
    /**
     *
     */
    var FlexPack = (function (_super) {
        __extends(FlexPack, _super);
        function FlexPack(width, height, x, y, regX, regY) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, width, height, x, y, regX, regY);
            this.axis = 'y';
            this.margin = 0;
            this.autoWidth = false;
            this.autoHeight = false;
        }
        FlexPack.prototype.onResize = function (e) {
            //		super.onResize(e);
            var height = 0;
            var width = 0;
            if (this.children.length > 0) {
                switch (this.axis) {
                    case 'y':
                        {
                            var children = this.children;
                            var y = children[0].y;
                            var margin = this.margin;
                            for (var i = 0; i < children.length; i++) {
                                var child = children[i];
                                child.y = y;
                                y += child.height;
                                y += margin;
                                width += child.width;
                                height += child.height;
                            }
                            break;
                        }
                }
            }
            _super.prototype.onResize.call(this, e);
        };
        return FlexPack;
    })(Container);
    return FlexPack;
});
