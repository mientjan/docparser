import Container = require('../display/Container');
import Text = require('../display/Text');
import Shape = require('../display/Shape');
import Bitmap = require('../display/Bitmap');
import ButtonBehavior = require('../behavior/ButtonBehavior');

/**
 * @class BasicImageButton
 */
class BasicImageButton extends Container
{

	public hitArea:Shape = new Shape();
	public image:Bitmap;

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
		constructor(image:Bitmap, x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(100, 100, x, y, regX, regY);

		image.addEventListener(Bitmap.EVENT_ONLOAD, this.onLoad.bind(this));

		if(image.loaded)
		{
			this.onLoad();
		}

		this.addBehavior(new ButtonBehavior);

		this.image = image;
		this.addChild(this.image);
	}

	public onLoad()
	{
		this.setWidth(this.image.width);
		this.setHeight(this.image.height);
	}

	public onResize(e)
	{

		this.width = this.image.width;
		this.height = this.image.height;
		this.hitArea.graphics.clear().beginFill('#FFF').drawRect(0, 0, this.width, this.height);
		super.onResize(e);
	}
}

export = BasicImageButton;