/**
 * Created by jay on 2017-01-11.
 */
'use strict';

const fs  = require('fs'),
    Xfdf = require('xfdf'),
    exec = require('child_process').exec;

exports.generatePdf = function(data, templatePath, extendArgs, outputFile, callback) {

    generatorXFdf(data,templatePath,function (err) {
        if(err)
            throw err;
        let normalized = normalizeArgs(extendArgs, callback);
        extendArgs = normalized.args;
        callback   = normalized.callback;
        let processArgs = [templatePath, 'fill_form','./temp.xfdf', 'output', outputFile].concat(extendArgs);
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
    });
};


function generatorXFdf(data, templatePath,callback) {
    let builder = new Xfdf({ pdf: templatePath});
    builder.fromJSON(data);
    builder.generateToFile('./temp.xfdf',callback);
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

