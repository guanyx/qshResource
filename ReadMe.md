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
        .pipe(qsh())
        .pipe(gulp.dest('./dist'));
})
```