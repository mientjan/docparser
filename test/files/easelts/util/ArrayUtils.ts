import DisplayObject = require("../display/DisplayObject");
import Bounds = require("../geom/Bounds");
import Size = require("../geom/Size");
import Point = require("../geom/Point");

class ArrayUtils
{
	public static getMaxSize(arr:DisplayObject[]):Size
	{
		var size = new Size(0, 0);
		for(var i = 0; i < arr.length; i++)
		{
			size.width = Math.max(arr[i].width, size.width);
			size.height = Math.max(arr[i].height, size.height);
		}

		return size;
	}

	public static getSize(arr:DisplayObject[]):Size
	{
		var size = new Size(0, 0);
		for(var i = 0; i < arr.length; i++)
		{
			size.width += arr[i].width;
			size.height += arr[i].height;
		}

		return size;
	}
}

export = ArrayUtils;