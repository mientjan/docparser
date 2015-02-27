import MeasurementUnitType = require('../enum/MeasurementUnitType');

class FluidMeasurementsUnit
{
	constructor(public value:number, public unit:MeasurementUnitType)
	{
	}
}

export = FluidMeasurementsUnit;