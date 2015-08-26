 'use strict';
 var gutil = require('gulp-util');
 var through = require('through2');
 var fs = require('fs');
 var path = require('path');

 function handlerInsert(html, options){
     var headerHtml = fs.readFileSync(path.join(__dirname, 'head.html'));
     var footerHtml = fs.readFileSync(path.join(__dirname, 'foot.html'));
     if(options.iconfont){
         headerHtml += '\r\n<link rel="stylesheet" href="/cdn/css/iconfont/'+options.iconfont+'/iconfont.css">';
         headerHtml += '\r\n<link rel="stylesheet" href="/cdn/libs/common/'+options.iconfont+'/style.min.css">'
     }
     html = html.replace('<!-- qshHeader -->', headerHtml);
     html = html.replace('<!-- qshFooter -->', footerHtml);
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
