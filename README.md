# folder-upload

Simple library to zip up a folder and upload it to a server

## Installation

`npm i folder-upload`

## Usage

```
const upload = require('folder-upload');

upload({
	path: '/Users/x/path/to/upload/',
	url: 'https://server.com/upload/destionation/script'
}, (err, res) => {
	 if (err) {
		  console.log(err.message);
	 }

	 console.log(res.statusCode);
});
```

The file will be uploaded with the form field name `file`.
