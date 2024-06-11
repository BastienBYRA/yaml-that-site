import { src, dest, series, watch } from 'gulp';
import njk from 'gulp-nunjucks-render';
import beautify from 'gulp-beautify';
import template from 'gulp-template';
import data from 'gulp-data';

async function html() {
    return src('layouts/*.+(html|njk)')
        .pipe(data(() => ({
            links: [
                {url: "/test1", label: "bob1"},
                {url: "/test2", label: "bob2"},
                {url: "/test3", label: "bob3"}
            ]
        })))
        .pipe(template())
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

export const build = series(html);
export const defaultTask = series(html, watchFiles);