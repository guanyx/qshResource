#说明

该工具仅适用于企商汇内部项目

##用法

```
npm install qsh-resource --save-dev
```

```html
<head>
    <!-- qshHeader -->
    other content
    <title>Page</title>
</head>
<body>
<!-- qshFooter -->
other script
</body>
```

```js
var qsh = require('qsh-resource');
gulp.task('qsh', function(){
    return gulp.src('./*.html')
        .pipe(qsh({
            iconfont: 'qsh'
        }))
        .pipe(gulp.dest('./dist'));
})
```

##Options

*iconfont*为项目的iconfont图标。当前加入的有通常为Iconfont站点中的项目名