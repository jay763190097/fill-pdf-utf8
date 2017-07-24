# fill-pdf-utf8
[![Build Status](https://travis-ci.org/dommmel/fill-pdf.svg?branch=master)](https://travis-ci.org/dommmel/fill-pdf)

A node module to fill out PDF forms (utf8 compatible),It can support Windows、Linux、Mac platforms.

The previous version uses pdftk,but this version uses iText,so the Java environment is required, you need to download [jdk](http://www.oracle.com/technetwork/java/archive-139210.html) and install it in your computer.

## Dependencies
You need to have the ```java``` binary in your PATH.

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