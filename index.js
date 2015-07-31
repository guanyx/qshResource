 'use strict';
 var gutil = require('gulp-util');
 var through = require('through2');
 var fs = require('fs');
 var path = require('path');

 function handlerInsert(html, options){
     html = html.replace('<!-- qshHeader -->', fs.readFileSync(path.join(__dirname, 'head.html')));
     html = html.replace('<!-- qshFooter -->', fs.readFileSync(path.join(__dirname, 'foot.html')));
     return html;
 }

 module.exports = function(options){
    return through.obj(function(html, enc, cb){
        var content = handlerInsert(html.contents.toString(), options || {});
        html.contents = new Buffer(content);
        this.push(html);
        cb();
    });
 };
