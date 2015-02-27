import Container = require('../Container');

/**
 *
 */
class FlexPack extends Container
{
	public axis:string = 'y';
	public margin:number = 0;

	public autoWidth:boolean = false;
	public autoHeight:boolean = false;

	constructor(width:any, height:any, x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(width, height, x, y, regX, regY);

	}


	public onResize(e)
	{
		//		super.onResize(e);

		var height = 0;
		var width = 0;
		if(this.children.length > 0)
		{

			switch(this.axis)
			{
				case 'y':
				{

					var children = this.children;
					var y = children[0].y;
					var margin = this.margin;
					for(var i = 0; i < children.length; i++)
					{
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

		super.onResize(e);

	}
}

export = FlexPack;