import Container = require('../display/Container');
import DisplayObject = require('../display/DisplayObject');
import Size = require('../geom/Size');

/**
 *
 */
class FlexXPack extends Container
{
	public margin:number = 0;
	public autoWidth:boolean = false;
	public autoHeight:boolean = false;

	constructor(margin = 0, width:any = 'auto', height:any = 'auto', x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(1, 1, x, y, regX, regY);

		if(width == 'auto')
		{
			this.autoWidth = true;
		}
		else
		{
			this.setWidth(width);
		}

		if(height == 'auto')
		{
			this.autoHeight = true;
		}
		else
		{
			this.setHeight(height);
		}

		this.margin = margin;
	}

	public addChild(...children:DisplayObject[]):DisplayObject
	{
		var data = super.addChild.apply(this, children);

		if(this._parentSizeIsKnown)
		{
			this.onResize(new Size(this.parent.getWidth(), this.parent.getHeight()));
		}
		return data;
	}

	public removeChild(...children:DisplayObject[]):boolean
	{
		var data = super.removeChild.apply(this, children);

		if(this._parentSizeIsKnown)
		{
			this.onResize(new Size(this.parent.getWidth(), this.parent.getHeight()));
		}
		return data;
	}

	public onResize(e)
	{
		var height = 0;
		var width = 0;

		if(this.children.length > 0)
		{
			var children = this.children;
			var x = 0;
			var margin = this.margin;

			for(var i = 0; i < children.length; i++)
			{
				var child = children[i];
				child.x = x;
				x += child.width;
				x += margin;
				width += child.width;
				height = Math.max(height, child.height);
			}

			if(this.autoWidth)
			{
				this.width = width + ( margin * (this.children.length - 1));
			}
			if(this.autoHeight)
			{
				this.height = height;
			}

		}

		super.onResize(e);

	}
}

export = FlexXPack;