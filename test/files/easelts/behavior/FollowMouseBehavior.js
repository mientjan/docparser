var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './AbstractBehavior', '../display/Stage'], function (require, exports, AbstractBehavior, Stage) {
    var FollowMouseBehavior = (function (_super) {
        __extends(FollowMouseBehavior, _super);
        function FollowMouseBehavior() {
            var _this = this;
            _super.apply(this, arguments);
            this.onMouseMove = function (e) {
                var owner = _this.owner;
                owner.x = e.stageX;
                owner.y = e.stageY;
            };
        }
        FollowMouseBehavior.prototype.initialize = function (displayObject) {
            _super.prototype.initialize.call(this, displayObject);
            this.owner.enableMouseInteraction();
            this.owner.cursor = 'pointer';
            this._stage = this.owner.stage;
            if (!this._stage) {
                throw new Error('stage must be known before adding this behavior to a component.');
            }
            this._stage.addEventListener(Stage.EVENT_STAGE_MOUSE_MOVE, this.onMouseMove);
        };
        FollowMouseBehavior.prototype.destruct = function () {
            this._stage.removeEventListener(Stage.EVENT_STAGE_MOUSE_MOVE, this.onMouseMove);
            this._stage = null;
            _super.prototype.destruct.call(this);
        };
        return FollowMouseBehavior;
    })(AbstractBehavior);
    return FollowMouseBehavior;
});
