import parser = require("comment-parser");
var util = require('util');


class Block {

	private data:any;

	constructor(data:any){

		this.data = data;
		console.log(util.inspect(data, {showHidden: false, depth: null}));
		//console.log(result);
	}

	public getTags(){

	}
}

export = Block;