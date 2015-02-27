/*
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import m4 = require('./Matrix4');
import m3 = require('./Matrix3');
import MathUtil = require('../util/MathUtil');

// interface
import IVertex3 = require('../interface/IVector3');

/**
 * @module easelts
 */

/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author Mient-jan Stelling
 *
 * @class Vector3
 */
class Vector3 implements IVertex3
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

	/**
	 * Z position.
	 * @property z
	 * @type Number
	 **/

	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	constructor(public x:number, public y:number, public z:number)
	{
	}

	public set(x, y, z):Vector3
	{

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

	public setX(x):Vector3
	{

		this.x = x;

		return this;
	}

	public setY(y):Vector3
	{

		this.y = y;

		return this;
	}

	public setZ(z):Vector3
	{

		this.z = z;

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
			case 2:
				this.z = value;
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
			case 2:
				return this.z;
			default:
				throw new Error('index is out of range: ' + index);

		}

	}

	public copy(v):Vector3
	{

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	}

	public add(v, w):Vector3
	{

		if(w !== undefined)
		{

			console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
			return this.addVectors(v, w);

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	}

	public addScalar(s):Vector3
	{

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	}

	public addVectors(a, b):Vector3
	{

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	}

	public sub(v)
	{

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	}

	public subVectors(a, b):Vector3
	{

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	}

	public multiply(v)
	{

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	}

	public multiplyScalar(scalar):Vector3
	{

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	}

	public multiplyVectors(a, b):Vector3
	{

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	}

	//	private __quaternion0:Quaternion;
	//	public applyEuler ( euler ) {
	//
	//			if ( euler instanceof Euler === false ) {
	//
	//				console.error( 'THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.' );
	//
	//			}
	//
	//			if ( this.__quaternion0 === void 0 ) this.__quaternion0 = new THREE.Quaternion();
	//
	//			this.applyQuaternion( this.__quaternion0.setFromEuler( euler ) );
	//
	//			return this;
	//
	//		}

	//	private __quaternion1:Quaternion;
	//	public applyAxisAngle ( axis, angle ) {
	//
	//		if ( this.__quaternion1 === undefined ) this.__quaternion1 = new Quaternion();
	//
	//		this.applyQuaternion( this.__quaternion1.setFromAxisAngle( axis, angle ) );
	//
	//		return this;
	//
	//	}

	public applyMatrix3(m):Vector3
	{

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	}

	public applyMatrix4(m:m4.Matrix4):Vector3
	{

		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ];
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ];
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];

		return this;

	}

	public applyProjection(m:m4.Matrix4):Vector3
	{

		// input: THREE.Matrix4 projection matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;
		var d = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] ); // perspective divide

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * d;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * d;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * d;

		return this;

	}

	public applyQuaternion(q):Vector3
	{

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix = qw * x + qy * z - qz * y;
		var iy = qw * y + qz * x - qx * z;
		var iz = qw * z + qx * y - qy * x;
		var iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;

	}

	private __projectMatrix:m4.Matrix4 = null;

	public project(camera)
	{
		if(!this.__projectMatrix){
			this.__projectMatrix = new m4.Matrix4();
		}

		var matrix = this.__projectMatrix;
		matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
		return this.applyProjection(matrix);

	}

	private __unprojectMatrix:m4.Matrix4 = null;

	public unproject(camera)
	{
		if(!this.__unprojectMatrix){
			this.__unprojectMatrix = new m4.Matrix4();
		}
		var matrix = this.__unprojectMatrix;
		matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
		return this.applyProjection(matrix);
	}

	public transformDirection(m:m4.Matrix4):Vector3
	{

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		this.normalize();

		return this;

	}

	public divide(v):Vector3
	{

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	}

	public divideScalar(scalar):Vector3
	{

		if(scalar !== 0)
		{

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		}
		else
		{

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;

	}

	public min(v):Vector3
	{

		if(this.x > v.x)
		{

			this.x = v.x;

		}

		if(this.y > v.y)
		{

			this.y = v.y;

		}

		if(this.z > v.z)
		{

			this.z = v.z;

		}

		return this;

	}

	public max(v):Vector3
	{

		if(this.x < v.x)
		{

			this.x = v.x;

		}

		if(this.y < v.y)
		{

			this.y = v.y;

		}

		if(this.z < v.z)
		{

			this.z = v.z;

		}

		return this;

	}

	public clamp(min, max):Vector3
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

		if(this.z < min.z)
		{

			this.z = min.z;

		}
		else if(this.z > max.z)
		{

			this.z = max.z;

		}

		return this;

	}

	private __clampScalarMin:Vector3 = null;
	private __clampScalarMax:Vector3 = null;

	public clampScalar(minVal:number, maxVal:number)
	{
		if(!this.__clampScalarMin){
			this.__clampScalarMin = new Vector3(0, 0, 0);
		}

		if(!this.__clampScalarMax){
			this.__clampScalarMax = new Vector3(0, 0, 0);
		}

		var min = this.__clampScalarMin;
		var max = this.__clampScalarMax;

		min.set(minVal, minVal, minVal);
		max.set(maxVal, maxVal, maxVal);

		return this.clamp(min, max);
	}

	public floor():Vector3
	{

		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);

		return this;

	}

	public ceil():Vector3
	{

		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);

		return this;

	}

	public round():Vector3
	{

		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);

		return this;

	}

	public roundToZero():Vector3
	{

		this.x = ( this.x < 0 ) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = ( this.y < 0 ) ? Math.ceil(this.y) : Math.floor(this.y);
		this.z = ( this.z < 0 ) ? Math.ceil(this.z) : Math.floor(this.z);

		return this;

	}

	public negate():Vector3
	{

		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;

		return this;

	}

	public dot(v):number
	{

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	public lengthSq():number
	{

		return this.x * this.x + this.y * this.y + this.z * this.z;

	}

	public length():number
	{

		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

	}

	public lengthManhattan():number
	{

		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);

	}

	public normalize():Vector3
	{

		return this.divideScalar(this.length());

	}

	public setLength(l:number):Vector3
	{

		var oldLength = this.length();

		if(oldLength !== 0 && l !== oldLength)
		{

			this.multiplyScalar(l / oldLength);
		}

		return this;

	}

	public lerp(v:Vector3, alpha:number):Vector3
	{

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	}

	public cross(v:Vector3):Vector3
	{

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	}

	public crossVectors(a:Vector3, b:Vector3):Vector3
	{

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}

	private __projectOnVector_v1:Vector3 = null;
	private __projectOnVector_dot:Vector3 = null;

	public projectOnVector(vector:Vector3)
	{
		if(!this.__projectOnVector_v1){
			this.__projectOnVector_v1 = new Vector3(0, 0, 0);
		}

		if(!this.__projectOnVector_dot){
			this.__projectOnVector_dot = new Vector3(0, 0, 0);
		}

		var v1 = this.__projectOnVector_v1;

		v1.copy(vector).normalize();

		var dot = this.dot(v1);

		return this.copy(v1).multiplyScalar(dot);

	}

	private __projectOnPlane_v1:Vector3 = null;

	projectOnPlane(planeNormal:Vector3)
	{
		if(!this.__projectOnPlane_v1){
			this.__projectOnPlane_v1 = new Vector3(0, 0, 0);
		}
		var v1 = this.__projectOnPlane_v1;


		v1.copy(this).projectOnVector(planeNormal);

		return this.sub(v1);

	}


	/**
	 * reflect incident vector off plane orthogonal to normal
	 * normal is assumed to have unit length
	 *
	 * @param {Vector3} normal
	 * @returns {Vector3}
	 */
	private __reflect_v1:Vector3 = null;

	public reflect(normal:Vector3)
	{
		if(!this.__reflect_v1){
			this.__reflect_v1 = new Vector3(0, 0, 0);
		}
		var v1 = this.__reflect_v1;
		return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
	}


	public angleTo(v:Vector3):number
	{

		var theta = this.dot(v) / ( this.length() * v.length() );

		// clamp, to handle numerical problems

		return Math.acos(MathUtil.clamp(theta, -1, 1));

	}

	public distanceTo(v:Vector3):number
	{

		return Math.sqrt(this.distanceToSquared(v));

	}

	public distanceToSquared(v:Vector3):number
	{

		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	}

	//
	//	public setEulerFromRotationMatrix ( m:Vector3, order):Vector3 {
	//
	//		console.error( 'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.' );
	//
	//	}
	//
	//	public setEulerFromQuaternion ( q, order):Vector3 {
	//
	//		console.error( 'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.' );
	//
	//	}

	//	public getPositionFromMatrix ( m):Vector3 {
	//
	//		console.warn( 'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().' );
	//
	//		return this.setFromMatrixPosition( m );
	//
	//	}

	//	public getScaleFromMatrix ( m):Vector3 {
	//
	//		console.warn( 'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().' );
	//
	//		return this.setFromMatrixScale( m );
	//	}
	//
	//	public getColumnFromMatrix ( index, matrix):Vector3 {
	//
	//		console.warn( 'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().' );
	//
	//		return this.setFromMatrixColumn( index, matrix );
	//
	//	}

	public setFromMatrixPosition(m):Vector3
	{

		this.x = m.elements[ 12 ];
		this.y = m.elements[ 13 ];
		this.z = m.elements[ 14 ];

		return this;

	}

	public setFromMatrixScale(m):Vector3
	{

		var sx = this.set(m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ]).length();
		var sy = this.set(m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ]).length();
		var sz = this.set(m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ]).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
	}

	public setFromMatrixColumn(index, matrix):Vector3
	{

		var offset = index * 4;

		var me = matrix.elements;

		this.x = me[ offset ];
		this.y = me[ offset + 1 ];
		this.z = me[ offset + 2 ];

		return this;

	}

	public equals(v:Vector3):boolean
	{

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	}

	public fromArray(array:number[], offset:number = 0):Vector3
	{

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	}

	public toArray(array:number[] = [], offset:number = 0):number[]
	{

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	}

	public clone():Vector3
	{
		return new Vector3(this.x, this.y, this.z);
	}


	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	public toString():string
	{
		return "[Vector3 (x=" + this.x + " y=" + this.y + "  z=" + this.z + ")]";
	}
}

export = Vector3;