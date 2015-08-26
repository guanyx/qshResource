 'use strict';
 var gutil = require('gulp-util');
 var through = require('through2');
 var fs = require('fs');
 var path = require('path');

 function handlerInsert(html, options){
     var headerHtml = fs.readFileSync(path.join(__dirname, 'head.html'));
     var footerHtml = fs.readFileSync(path.join(__dirname, 'foot.html'));
     if(options.iconfont){
         headerHtml += '\r\n<link rel="stylesheet" href="{{domain}}cdn/css/iconfont/'+options.iconfont+'/iconfont.css">';
         headerHtml += '\r\n<link rel="stylesheet" href="{{domain}}cdn/libs/common/'+options.iconfont+'/style.min.css">'
     }
     var temp_obj = {
         domain: options.domain || '/'
     };
     footerHtml += '';
     headerHtml = compileTpl(headerHtml, temp_obj);
     footerHtml = compileTpl(footerHtml, temp_obj);
     html = html.replace('<!-- qshHeader -->', headerHtml);
     html = html.replace('<!-- qshFooter -->', footerHtml);
     return html;
 }

 function compileTpl(str, obj){
     var reg = /{{(.*?)}}/g;
     var result;
     console.log(str);
     while(result = reg.exec(str)){
         var value = typeof obj[result[1]] === 'undefined' ? '' : obj[result[1]];
         str = str.replace(result[0], value);
         reg.lastIndex -= result[0].length;
     }
     return str;
 }

 module.exports = function(options){
    return through.obj(function(html, enc, cb){
        var content = handlerInsert(html.contents.toString(), options || {});
        html.contents = new Buffer(content);
        this.push(html);
        cb();
    });
 };
