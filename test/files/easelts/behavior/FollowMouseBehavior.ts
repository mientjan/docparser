import AbstractBehavior = require('./AbstractBehavior');
import DisplayObject = require('../display/DisplayObject');
import Stage = require('../display/Stage');
import Container = require('../display/Container');
import PointerEvent = require('../event/PointerEvent');
import DisplayType = require('../enum/DisplayType');

class FollowMouseBehavior extends AbstractBehavior
{
	private _stage:Stage;

	public initialize(displayObject:DisplayObject):void
	{
		super.initialize(displayObject);

		this.owner.enableMouseInteraction();
		this.owner.cursor = 'pointer';

		this._stage = this.owner.stage;
		if(!this._stage){
			throw new Error('stage must be known before adding this behavior to a component.')
		}

		this._stage.addEventListener(Stage.EVENT_STAGE_MOUSE_MOVE, this.onMouseMove );
	}

	public onMouseMove = (e:PointerEvent) => {
		var owner = this.owner;
		owner.x = e.stageX;
		owner.y = e.stageY;
	}

	public destruct():void
	{
		this._stage.removeEventListener(Stage.EVENT_STAGE_MOUSE_MOVE, this.onMouseMove );
		this._stage = null;
		super.destruct();
	}
}

export = FollowMouseBehavior;