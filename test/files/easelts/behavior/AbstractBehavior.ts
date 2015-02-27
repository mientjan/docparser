import DisplayObject = require('../display/DisplayObject');

// /**
// * AbstractBehaviour
// *
// * @namespace easelts.behavior
// * @method AbstractBehavior
// * @author Mient-jan Stelling <mientjan.stelling@gmail.com>
 // */
class AbstractBehaviour
{
	/**
	 * @property owner
	 */
	public owner:DisplayObject = null;

	/**
	 * @method initialize
	 * @param DisplayObject owner
	 */
	public initialize(owner:DisplayObject):any
	{
		if(this.owner)
		{
			throw new Error('behavior already has a owner')
		}

		this.owner = owner;
	}

	public destruct():any
	{
		this.owner = null;
	}
}

export  = AbstractBehaviour;