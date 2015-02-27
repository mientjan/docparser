var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../display/Container', '../display/Shape', '../display/Bitmap', '../behavior/ButtonBehavior'], function (require, exports, Container, Shape, Bitmap, ButtonBehavior) {
    /**
     * @class BasicImageButton
     */
    var BasicImageButton = (function (_super) {
        __extends(BasicImageButton, _super);
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
        function BasicImageButton(image, x, y, regX, regY) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, 100, 100, x, y, regX, regY);
            this.hitArea = new Shape();
            image.addEventListener(Bitmap.EVENT_ONLOAD, this.onLoad.bind(this));
            if (image.loaded) {
                this.onLoad();
            }
            this.addBehavior(new ButtonBehavior);
            this.image = image;
            this.addChild(this.image);
        }
        BasicImageButton.prototype.onLoad = function () {
            this.setWidth(this.image.width);
            this.setHeight(this.image.height);
        };
        BasicImageButton.prototype.onResize = function (e) {
            this.width = this.image.width;
            this.height = this.image.height;
            this.hitArea.graphics.clear().beginFill('#FFF').drawRect(0, 0, this.width, this.height);
            _super.prototype.onResize.call(this, e);
        };
        return BasicImageButton;
    })(Container);
    return BasicImageButton;
});
