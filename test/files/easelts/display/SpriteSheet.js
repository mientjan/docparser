/*
 * SpriteSheet
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../createts/event/EventDispatcher', '../geom/Rectangle'], function (require, exports, EventDispatcher, Rectangle) {
    var SpriteSheet = (function (_super) {
        __extends(SpriteSheet, _super);
        /**
         * @method constructor
         * @param {Object} data An object describing the SpriteSheet data.
         * @protected
         **/
        function SpriteSheet(data) {
            _super.call(this);
            // events:
            /**
             * Dispatched when all images are loaded.  Note that this only fires if the images
             * were not fully loaded when the sprite sheet was initialized. You should check the complete property
             * to prior to adding a listener. Ex.
             * <pre><code>var sheet = new SpriteSheet(data);
             * if (!sheet.complete) {
             *  &nbsp; // not preloaded, listen for the complete event:
             *  &nbsp; sheet.addEventListener("complete", handler);
             * }</code></pre>
             * @event complete
             * @param {Object} target The object that dispatched the event.
             * @param {String} type The event type.
             * @since 0.6.0
             */
            // public properties:
            /**
             * Indicates whether all images are finished loading.
             * @property complete
             * @type Boolean
             * @readonly
             **/
            this.complete = true;
            /**
             * Specifies the framerate to use by default for Sprite instances using the SpriteSheet. See
             * Sprite.framerate for more information.
             * @property framerate
             * @type Number
             **/
            this.framerate = 0;
            // TODO: deprecated.
            /**
             * REMOVED. Use {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}} and the {{#crossLink "SpriteSheet/complete:event"}}{{/crossLink}}
             * event.
             * @property onComplete
             * @type Function
             * @deprecated Use addEventListener and the "complete" event.
             **/
            // private properties:
            /**
             * @property _animations
             * @protected
             **/
            this._animations = null;
            /**
             * @property _frames
             * @protected
             **/
            this._frames = [];
            /**
             * @property _images
             * @protected
             **/
            this._images = [];
            /**
             * @property _data
             * @protected
             **/
            this._data = null;
            /**
             * @property _loadCount
             * @protected
             **/
            this._loadCount = 0;
            // only used for simple frame defs:
            /**
             * @property _frameHeight
             * @protected
             **/
            this._frameHeight = 0;
            /**
             * @property _frameWidth
             * @protected
             **/
            this._frameWidth = 0;
            /**
             * @property _numFrames
             * @protected
             **/
            this._numFrames = 0;
            /**
             * @property _regX
             * @protected
             **/
            this._regX = 0;
            /**
             * @property _regY
             * @protected
             **/
            this._regY = 0;
            var i, l, o, a;
            if (data == null) {
                return;
            }
            this.framerate = data.framerate || 0;
            // parse images:
            if (data.images && (l = data.images.length) > 0) {
                a = this._images = [];
                for (i = 0; i < l; i++) {
                    var img = data.images[i];
                    if (typeof img == "string") {
                        var src = img;
                        img = document.createElement("img");
                        img.src = src;
                    }
                    a.push(img);
                    if (!img.getContext && !img.complete) {
                        this._loadCount++;
                        this.complete = false;
                        (function (o) {
                            img.onload = function () {
                                o._handleImageLoad();
                            };
                        })(this);
                    }
                }
            }
            // parse frames:
            if (data.frames == null) {
            }
            else if (data.frames instanceof Array) {
                this._frames = [];
                a = data.frames;
                for (i = 0, l = a.length; i < l; i++) {
                    var arr = a[i];
                    this._frames.push({ image: this._images[arr[4] ? arr[4] : 0], rect: new Rectangle(arr[0], arr[1], arr[2], arr[3]), regX: arr[5] || 0, regY: arr[6] || 0 });
                }
            }
            else {
                o = data.frames;
                this._frameWidth = o.width;
                this._frameHeight = o.height;
                this._regX = o.regX || 0;
                this._regY = o.regY || 0;
                this._numFrames = o.count;
                if (this._loadCount == 0) {
                    this._calculateFrames();
                }
            }
            // parse animations:
            this._animations = [];
            if ((o = data.animations) != null) {
                this._data = {};
                var name;
                for (name in o) {
                    var anim = { name: name };
                    var obj = o[name];
                    if (typeof obj == "number") {
                        a = anim.frames = [obj];
                    }
                    else if (obj instanceof Array) {
                        if (obj.length == 1) {
                            anim.frames = [obj[0]];
                        }
                        else {
                            anim.speed = obj[3];
                            anim.next = obj[2];
                            a = anim.frames = [];
                            for (i = obj[0]; i <= obj[1]; i++) {
                                a.push(i);
                            }
                        }
                    }
                    else {
                        anim.speed = obj.speed;
                        anim.next = obj.next;
                        var frames = obj.frames;
                        a = anim.frames = (typeof frames == "number") ? [frames] : frames.slice(0);
                    }
                    if (anim.next === true || anim.next === undefined) {
                        anim.next = name;
                    } // loop
                    if (anim.next === false || (a.length < 2 && anim.next == name)) {
                        anim.next = null;
                    } // stop
                    if (!anim.speed) {
                        anim.speed = 1;
                    }
                    this._animations.push(name);
                    this._data[name] = anim;
                }
            }
        }
        // public methods:
        /**
         * Returns the total number of frames in the specified animation, or in the whole sprite
         * sheet if the animation param is omitted.
         * @method getNumFrames
         * @param {String} animation The name of the animation to get a frame count for.
         * @return {Number} The number of frames in the animation, or in the entire sprite sheet if the animation param is omitted.
         */
        SpriteSheet.prototype.getNumFrames = function (animation) {
            if (animation == null) {
                return this._frames ? this._frames.length : this._numFrames;
            }
            else {
                var data = this._data[animation];
                if (data == null) {
                    return 0;
                }
                else {
                    return data.frames.length;
                }
            }
        };
        /**
         * Returns an array of all available animation names as strings.
         * @method getAnimations
         * @return {Array} an array of animation names available on this sprite sheet.
         **/
        SpriteSheet.prototype.getAnimations = function () {
            return this._animations.slice(0);
        };
        /**
         * Returns an object defining the specified animation. The returned object contains:<UL>
         *     <LI>frames: an array of the frame ids in the animation</LI>
         *     <LI>speed: the playback speed for this animation</LI>
         *     <LI>name: the name of the animation</LI>
         *     <LI>next: the default animation to play next. If the animation loops, the name and next property will be the
         *     same.</LI>
         * </UL>
         * @method getAnimation
         * @param {String} name The name of the animation to get.
         * @return {Object} a generic object with frames, speed, name, and next properties.
         **/
        SpriteSheet.prototype.getAnimation = function (name) {
            return this._data[name];
        };
        /**
         * Returns an object specifying the image and source rect of the specified frame. The returned object has:<UL>
         *     <LI>an image property holding a reference to the image object in which the frame is found</LI>
         *     <LI>a rect property containing a Rectangle instance which defines the boundaries for the frame within that
         *     image.</LI>
         *     <LI> A regX and regY property corresponding to the regX/Y values for the frame.
         * </UL>
         * @method getFrame
         * @param {Number} frameIndex The index of the frame.
         * @return {Object} a generic object with image and rect properties. Returns null if the frame does not exist.
         **/
        SpriteSheet.prototype.getFrame = function (frameIndex) {
            var frame;
            if (this._frames && (frame = this._frames[frameIndex])) {
                return frame;
            }
            return null;
        };
        /**
         * Returns a {{#crossLink "Rectangle"}}{{/crossLink}} instance defining the bounds of the specified frame relative
         * to the origin. For example, a 90 x 70 frame with a regX of 50 and a regY of 40 would return:
         *
         *      [x=-50, y=-40, width=90, height=70]
         *
         * @method getFrameBounds
         * @param {Number} frameIndex The index of the frame.
         * @param {Rectangle} [rectangle] A Rectangle instance to copy the values into. By default a new instance is created.
         * @return {Rectangle} A Rectangle instance. Returns null if the frame does not exist, or the image is not fully loaded.
         **/
        SpriteSheet.prototype.getFrameBounds = function (frameIndex, rectangle) {
            var frame = this.getFrame(frameIndex);
            return frame ? (rectangle || new Rectangle(-frame.regX, -frame.regY, frame.rect.width, frame.rect.height)) : null;
        };
        /**
         * Returns a string representation of this object.
         * @method toString
         * @return {String} a string representation of the instance.
         **/
        SpriteSheet.prototype.toString = function () {
            return "[SpriteSheet]";
        };
        /**
         * Returns a clone of the SpriteSheet instance.
         * @method clone
         * @return {SpriteSheet} a clone of the SpriteSheet instance.
         **/
        SpriteSheet.prototype.clone = function () {
            // TODO: there isn't really any reason to clone SpriteSheet instances, because they can be reused.
            var o = new SpriteSheet();
            o.complete = this.complete;
            o._animations = this._animations;
            o._frames = this._frames;
            o._images = this._images;
            o._data = this._data;
            o._frameHeight = this._frameHeight;
            o._frameWidth = this._frameWidth;
            o._numFrames = this._numFrames;
            o._loadCount = this._loadCount;
            return o;
        };
        // private methods:
        /**
         * @method _handleImageLoad
         * @protected
         **/
        SpriteSheet.prototype._handleImageLoad = function () {
            if (--this._loadCount == 0) {
                this._calculateFrames();
                this.complete = true;
                this.dispatchEvent("complete");
            }
        };
        /**
         * @method _calculateFrames
         * @protected
         **/
        SpriteSheet.prototype._calculateFrames = function () {
            if (this._frames || this._frameWidth == 0) {
                return;
            }
            this._frames = [];
            var ttlFrames = 0;
            var fw = this._frameWidth;
            var fh = this._frameHeight;
            for (var i = 0, imgs = this._images; i < imgs.length; i++) {
                var img = imgs[i];
                var cols = img.width / fw | 0;
                var rows = img.height / fh | 0;
                var ttl = this._numFrames > 0 ? Math.min(this._numFrames - ttlFrames, cols * rows) : cols * rows;
                for (var j = 0; j < ttl; j++) {
                    this._frames.push({ image: img, rect: new Rectangle(j % cols * fw, (j / cols | 0) * fh, fw, fh), regX: this._regX, regY: this._regY });
                }
                ttlFrames += ttl;
            }
            this._numFrames = ttlFrames;
        };
        return SpriteSheet;
    })(EventDispatcher);
    return SpriteSheet;
});
