/**
 * Created by jay on 2017-01-11.
 */
'use strict';

const fs  = require('fs'),
    Xfdf = require('./xfdf'),
    path = require('path'),
    exec = require('child_process').exec;

exports.generatePdf = function(data, templatePath, outputFile, callback, extendArgs) {

    generatorXFdf(data,templatePath,outputFile,function (err) {
        if(err)
            throw err;
        let processArgs = [templatePath,'fontPath',path.dirname(__filename)+path.sep+'lib'+path.sep+'simfang.ttf','fill_form','-', 'output','-','flatten','<'+outputFile.substring(0,outputFile.lastIndexOf('.'))+'.xfdf'+'>', outputFile];
        if(typeof extendArgs === 'object') {
            for(let i in extendArgs) {
                processArgs.push(i);
                processArgs.push(extendArgs[i]);
            }
        }
        let cmd = 'java -jar "'+path.dirname(__filename)+path.sep+'lib'+path.sep+'fill_pdf_utf8.jar"',option = {
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


function generatorXFdf(data, templatePath,outputFile,callback) {
    let builder = new Xfdf({ pdf: templatePath});
    builder.fromJSON(data);
    builder.generateToFile(outputFile.substring(0,outputFile.lastIndexOf('.'))+'.xfdf',callback);
}


