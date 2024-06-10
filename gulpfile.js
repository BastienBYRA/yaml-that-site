const { src, dest, series, watch } = require('gulp')
const njk = require('gulp-nunjucks-render')
const beautify = require('gulp-beautify')

// async function clean() {
//     const del = await import('del');
//     return del.default(['dist'])
// }

function html() {
    return src('layouts/*.+(html|njk)')
        .pipe(
            njk({
                path: ['build'],
            })
        )
        .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
        .pipe(dest('dist'))
}

function watchFiles() {
    watch('src/html/**/*', html)
}

exports.build = series(html)
exports.default = series(html, watchFiles)