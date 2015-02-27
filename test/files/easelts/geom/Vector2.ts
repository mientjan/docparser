/*
 * The MIT License
 *
 * Copyright &copy; 2010-2014 three.js authors
 * Copyright &copy; 2014-2015 easelts
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import IVertex2 = require('./../interface/IVector2');
import NumberUtil = require('./../util/NumberUtil');

/**
 * @module easelts
 */

/**
 * @class Vector2
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author Mient-jan Stelling
 */
class Vector2 implements IVertex2
{
	/**
	 * X position.
	 * @property x
	 * @type Number
	 **/

	/**
	 * Y position.
	 * @property y
	 * @type Number
	 **/

	constructor(public x:number, public y:number)
	{
	}

	public pair():number
	{
		var value = this.x << 16 & 0xffff0000 | this.y & 0x0000ffff;

		if(Number.MAX_VALUE < value)
		{
			throw 'pair created greater than allowed max uint value';
		}

		return value;
	}

	public depair(p:number):Vector2
	{
		return new Vector2(p >> 16 & 0xFFFF, p & 0xFFFF);
	}

	public set(x:number, y:number)
	{

		this.x = x;
		this.y = y;

		return this;
	}

	public setX(x:number):Vector2
	{
		this.x = x;
		return this;
	}

	public setY(y:number):Vector2
	{
		this.y = y;
		return this;
	}

	public setComponent(index:number, value:number):void
	{
		switch(index)
		{
			case 0:
				this.x = value;
				break;
			case 1:
				this.y = value;
				break;
			default:
				throw new Error('index is out of range: ' + index);

		}
	}

	public getComponent(index:number):number
	{
		switch(index)
		{
			case 0:
				return this.x;
			case 1:
				return this.y;
			default:
				throw new Error('index is out of range: ' + index);

		}
	}

	public copy(v:Vector2):Vector2
	{

		this.x = v.x;
		this.y = v.y;

		return this;

	}

	public add(v:Vector2):Vector2
	{

		this.x += v.x;
		this.y += v.y;

		return this;

	}

	public addVectors(a:Vector2, b:Vector2):Vector2
	{
		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;
	}

	public addScalar(s:number):Vector2
	{

		this.x += s;
		this.y += s;

		return this;

	}

	public sub(v:Vector2)
	{
		this.x -= v.x;
		this.y -= v.y;

		return this;

	}

	public subVectors(a:Vector2, b:Vector2)
	{

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	}

	public multiply(v:Vector2)
	{

		this.x *= v.x;
		this.y *= v.y;

		return this;

	}

	public multiplyScalar(s:number)
	{

		this.x *= s;
		this.y *= s;

		return this;

	}

	public divide(v:Vector2)
	{

		this.x /= v.x;
		this.y /= v.y;

		return this;

	}

	public divideScalar(scalar:number)
	{

		if(scalar !== 0)
		{

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;

		}
		else
		{

			this.x = 0;
			this.y = 0;

		}

		return this;
	}

	public    min(v:Vector2)
	{

		if(this.x > v.x)
		{

			this.x = v.x;

		}

		if(this.y > v.y)
		{

			this.y = v.y;

		}

		return this;

	}

	public max(v:Vector2)
	{

		if(this.x < v.x)
		{

			this.x = v.x;

		}

		if(this.y < v.y)
		{

			this.y = v.y;

		}

		return this;

	}

	public clamp(min:Vector2, max:Vector2)
	{

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if(this.x < min.x)
		{

			this.x = min.x;

		}
		else if(this.x > max.x)
		{

			this.x = max.x;

		}

		if(this.y < min.y)
		{

			this.y = min.y;

		}
		else if(this.y > max.y)
		{

			this.y = max.y;

		}

		return this;
	}

	private __min:Vector2;
	private __max:Vector2;

	public clampScalar(minVal:number, maxVal:number)
	{

		if(this.__min === void 0)
		{

			this.__min = new Vector2(0, 0);
			this.__max = new Vector2(0, 0);

		}

		this.__min.set(minVal, minVal);
		this.__max.set(maxVal, maxVal);

		return this.clamp(this.__min, this.__max);

	}

	public floor():Vector2
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);

		return this;
	}

	public ceil():Vector2
	{

		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);

		return this;

	}

	public round():Vector2
	{

		this.x = Math.round(this.x);
		this.y = Math.round(this.y);

		return this;

	}

	public roundToZero():Vector2
	{

		this.x = ( this.x < 0 ) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = ( this.y < 0 ) ? Math.ceil(this.y) : Math.floor(this.y);

		return this;

	}

	public negate():Vector2
	{

		this.x = -this.x;
		this.y = -this.y;

		return this;

	}

	public dot(v):number
	{

		return this.x * v.x + this.y * v.y;

	}

	public lengthSq():number
	{

		return this.x * this.x + this.y * this.y;

	}

	public length():number
	{

		return Math.sqrt(this.x * this.x + this.y * this.y);

	}

	public normalize():Vector2
	{

		return this.divideScalar(this.length());

	}

	public distanceTo(v:Vector2):number
	{

		return Math.sqrt(this.distanceToSquared(v));

	}

	public distanceToSquared(v:Vector2):number
	{

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	}

	public setLength(l):Vector2
	{

		var oldLength = this.length();

		if(oldLength !== 0 && l !== oldLength)
		{

			this.multiplyScalar(l / oldLength);
		}

		return this;

	}

	public lerp(v:Vector2, alpha:number):Vector2
	{

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	}

	public equals(v:Vector2):boolean
	{

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	}

	public fromArray(array:number[], offset:number):Vector2
	{

		if(offset === undefined)
		{
			offset = 0;
		}

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;
	}

	public toArray(array:number[], offset:number):number[]
	{

		if(array === undefined)
		{
			array = [];
		}
		if(offset === undefined)
		{
			offset = 0;
		}

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;

	}

	public clone():Vector2
	{

		return new Vector2(this.x, this.y);

	}

}

export = Vector2;