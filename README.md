# fill-pdf-utf8
[![Build Status](https://travis-ci.org/dommmel/fill-pdf.svg?branch=master)](https://travis-ci.org/dommmel/fill-pdf)

A node module to fill out PDF forms (utf8 compatible),It can support Windows、Linux、Mac platforms.

This includes three branches.There are the ways of fill pdf form by fdf file and by xfdf file ,or use itextpdf.jar to fill pdf
form.

It uses [pdftk](http://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/) to fill out PDF forms.

## Dependencies
You need to have the ```pdftk``` binary in your PATH.

# Install

    npm install fill-pdf-utf8

#Usage
    
```javascript
var fill_pdf = require('fill-pdf-utf8');

fill_pdf.generatePdf({fields:{name:'张三',age:12}},'test.pdf','need_appearances','result.pdf',function (error, stdout, stderr) {
	if(error){
		throw error;
	}
	console.log(stdout);
})

```