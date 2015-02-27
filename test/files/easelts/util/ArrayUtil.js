define(["require", "exports", "../geom/Size"], function (require, exports, Size) {
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        ArrayUtil.getMaxSize = function (arr) {
            var size = new Size(0, 0);
            for (var i = 0; i < arr.length; i++) {
                size.width = Math.max(arr[i].width, size.width);
                size.height = Math.max(arr[i].height, size.height);
            }
            return size;
        };
        ArrayUtil.getSize = function (arr) {
            var size = new Size(0, 0);
            for (var i = 0; i < arr.length; i++) {
                size.width += arr[i].width;
                size.height += arr[i].height;
            }
            return size;
        };
        return ArrayUtil;
    })();
    return ArrayUtil;
});
