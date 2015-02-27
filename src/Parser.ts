///<reference path="definitions.d.ts"/>

import glob = require('glob');
import fs = require('fs');
import Block = require('./Block');
import commentParser = require("comment-parser");

class Parser
{
	constructor(globFilepath:string)
	{
		var files = glob(globFilepath, (err, files) =>
		{
			var filePath = files[0];
			var fileData = fs.readFileSync(filePath, 'utf-8');
			var data = commentParser(fileData);

			var blocks = [];
			for(var i = 0; i < data.length; i++)
			{
				var block = new Block(data[i]);
				blocks.push(block);
			}


		});

		//console.log(files);

	}
}

export = Parser;