define(["require", "exports"], function(require, exports)
{
	/**
	 * @author Mient-jan Stelling <mientjan.stelling@gmail.com>
	 * @enum QualityType
	 */
	var BitmapDrawMode;
	(function(BitmapDrawMode)
	{
		BitmapDrawMode[BitmapDrawMode["NORMAL"] = 0] = "NORMAL";
		BitmapDrawMode[BitmapDrawMode["CLIP"] = 1] = "CLIP";
	})(BitmapDrawMode || (BitmapDrawMode = {}));
	return BitmapDrawMode;
});
