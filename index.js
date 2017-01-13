/**
 * Created by jay on 2017-01-11.
 */
'use strict';

const fs  = require('fs'),
    Iconv = require('iconv').Iconv,
    iconv = new Iconv('UTF-8', 'UTF-16'),
    path  = require('path'),
    exec = require('child_process').exec;

exports.generatePdf = function(data, templatePath, extendArgs, outputFile, callback) {

    generatorFdf(data,'./data.fdf');
    let normalized = normalizeArgs(extendArgs, callback);
    extendArgs = normalized.args;
    callback   = normalized.callback;
    let processArgs = [templatePath, 'fill_form','./data.fdf', 'output', outputFile].concat(extendArgs);
    let cmd = 'pdftk',option = {
        encoding: 'utf8',
        timeout: 100000,
        maxBuffer: 200*1024,
        killSignal: 'SIGTERM',
        cwd: null,
        env: null
    };
    for(let i = 0;i<processArgs.length;i++){
        cmd += ' '+processArgs[i];
    }
    exec(cmd,option,function (error, stdout, stderr) {
        if(typeof(callback) === "function"){
            callback(error, stdout, stderr);
        }
    });
};

function generatorFdf(data, fileName) {

    let header, body, footer, dataKeys;

    header = new Buffer('%FDF-1.2\n\u00e2\u00e3\u00cf\u00d3\n1 0 obj \n<<\n/FDF \n<<\n/Fields [\n');
    footer = new Buffer(']\n>>\n>>\nendobj \ntrailer\n\n<<\n/Root 1 0 R\n>>\n%%EOF\n');

    dataKeys = Object.keys(data);
    body = new Buffer([]);
    for(let i=0; i<dataKeys.length; i++) {
        let name = dataKeys[i];
        let value = data[name];
        body = Buffer.concat([ body, new Buffer("<<\n") ]);
        body = Buffer.concat([ body, new Buffer("/T (") ]);
        body = Buffer.concat([ body, iconv.convert(name.toString()) ]);
        body = Buffer.concat([ body, new Buffer(")\n") ]);
        body = Buffer.concat([ body, new Buffer("/V (") ]);
        body = Buffer.concat([ body, iconv.convert(value.toString()) ]);
        body = Buffer.concat([ body, new Buffer(")\n") ]);
        body = Buffer.concat([ body, new Buffer(">>\n") ]);
    }
    fs.writeFileSync(fileName, Buffer.concat([ header, body, footer ]));
}


function normalizeArgs(extendArgs, callback) {
    if (typeof extendArgs === 'function') {
        callback = extendArgs;
        extendArgs = [];
    }else if (!(extendArgs instanceof Array)) {
        let param = extendArgs;
        extendArgs = [];
        extendArgs.push(param);
    }
    return { args: extendArgs, callback: callback };
}


function isAbsolute(Path) {
    return (path.isAbsolute && path.isAbsolute(Path)) ||
        (path.normalize(Path + '/') === path.normalize(path.resolve(Path) + '/'));
}
