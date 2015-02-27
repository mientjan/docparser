var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../display/Bitmap'], function (require, exports, Bitmap) {
    /**
     * @class ImageSequence
     */
    var ImageSequence = (function (_super) {
        __extends(ImageSequence, _super);
        /**
         *
         * @param {string[]} images
         * @param {number} fps
         * @param {string|number} width
         * @param {string|number} height
         * @param {string|number} x
         * @param {string|number} y
         * @param {string|number} regX
         * @param {string|number} regY
         */
        function ImageSequence(images, fps, width, height, x, y, regX, regY) {
            if (fps === void 0) { fps = 1; }
            if (width === void 0) { width = 'auto'; }
            if (height === void 0) { height = 'auto'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, images[0], width, height, x, y, regX, regY);
            this._playing = false;
            this._timeIndex = -1;
            this._frame = -1;
            this._fps = 0;
            this._length = 0;
            this._images = [];
            this._onComplete = null;
            this._times = 1;
            for (var i = 0; i < images.length; i++) {
                var img = document.createElement('img');
                img.src = images[i];
                this._images.push(img);
            }
            this._fps = 1000 / fps;
            this._length = images.length;
        }
        ImageSequence.prototype.draw = function (ctx, ignoreCache) {
            ctx.drawImage(this.image, 0, 0);
            return true;
        };
        ImageSequence.prototype.play = function (times, onComplete) {
            if (times === void 0) { times = 1; }
            if (onComplete === void 0) { onComplete = null; }
            this._playing = true;
            this._frame = 0;
            this._times = times;
            this._onComplete = onComplete;
        };
        ImageSequence.prototype.stop = function () {
            this._playing = false;
            this._timeIndex = -1;
            this._frame = -1;
            if (this._onComplete) {
                this._onComplete.call(null);
            }
        };
        ImageSequence.prototype.onTick = function (e) {
            var playing = this._playing;
            if (playing) {
                if (this._timeIndex < 0) {
                    this._timeIndex = e.time;
                }
                var fps = this._fps, length = this._length, times = this._times, time = e.time - this._timeIndex, frame = Math.floor(time / fps), currentFrame = this._frame;
                if (times > -1 && !(times - Math.floor(frame / length))) {
                    this.stop();
                }
                else {
                    frame %= length;
                    if (currentFrame != frame) {
                        this._frame = frame;
                        this.image = this._images[frame];
                    }
                }
            }
        };
        return ImageSequence;
    })(Bitmap);
    return ImageSequence;
});
