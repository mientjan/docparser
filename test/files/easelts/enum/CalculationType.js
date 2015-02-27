/**
 * @enum CalculationType
 */
var CalculationType;
(function (CalculationType) {
    CalculationType[CalculationType["UNKOWN"] = 0] = "UNKOWN";
    CalculationType[CalculationType["PROCENT"] = 1] = "PROCENT";
    CalculationType[CalculationType["STATIC"] = 2] = "STATIC";
    CalculationType[CalculationType["CALC"] = 3] = "CALC";
})(CalculationType || (CalculationType = {}));
module.exports = CalculationType;
