import { src, dest, series, watch } from 'gulp';
import njk from 'gulp-nunjucks-render';
import beautify from 'gulp-beautify';
import template from 'gulp-template';
import data from 'gulp-data';
// import json_website_content from './builder-data.json'
import yaml from 'js-yaml';
import { readArguments } from './utils/cli.js';
import { Arguments } from './class/Arguments.js';


function main() {
    const argumentList = readArguments();
    
    //Function to check if the structureFile variable in the argumentList has the correct value in it
}

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
        .pipe(dest('build'))
}

function watchFiles() {
    watch('src/html/**/*', html)
}



// export const build = series(html);
// export const defaultTask = series(html, watchFiles);
main();