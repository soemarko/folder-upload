"use strict";
var FormData = require('form-data');
var fs = require('fs');
const archiver = require('archiver');


module.exports = function upload(params, callback) {
	return new Promise((resolve, reject) => {

		try { // validate path
			fs.lstatSync(params.path).isDirectory();
		} catch (error) {
			reject(error.message);
			return callback(error, null);
		}

		const filepath = __dirname + '/archived.zip';

		const output = fs.createWriteStream(filepath);
		var archive = archiver.create('zip', {});

		output.on('close', function() {
			console.log(archive.pointer() + ' total bytes');
			console.log('archiver has been finalized and the output file descriptor has closed.');

			var form = new FormData();
			form.append('submit', '1');
			form.append('file', fs.createReadStream(filepath));
	
			form.submit(params.url, function(err, res) {
				fs.unlinkSync(filepath); // remove archived file
	
				if(err != null) {
					reject(err.message);
					return callback(err, null);
				}
	
				resolve(res.message);
				return callback(null, res);
			});
		});

		archive.on('error', function(err) {
			throw err;
		});

		archive.pipe(output);
		archive.directory(params.path,'').finalize();

	});
}
