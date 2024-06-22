import { src, dest, series, watch } from 'gulp';
import njk from 'gulp-nunjucks-render';
import beautify from 'gulp-beautify';
import template from 'gulp-template';
import data from 'gulp-data';

export const populatePage = (structureFile) => {

    // if(structureFile.layout) {
    //     structureFile.layout.forEach(element => {
    //         if(element.header) populateBlank(element)
    //         else if(element.sidebar) populateCV(element)
    //     });
    // }

    if(structureFile.pages) {
        structureFile.pages.forEach(element => {
            if(element.template.blank) populateBlank(element)
            else if(element.template.cv) populateCV(element)
        });
    }
}

const populateHeader = (header) => {
    convertToHTML('../layouts/header.njk', header)
}
// const populateSidebar = (sidebar) => {}
// const populateFooter = (footer) => {}

const populateBlank = (page) => {
    convertToHTML('../templates/blank/blank.njk', page)
}

const populateCV = (page) => {
    convertToHTML('../templates/CV/cv.njk', page)
}

// const markdownToHTML = (data) => {
//     //TODO
//     return data;
// }
// const textToHTML = (data) => {
//     return "<p>" + data + "</p>";
// }


async function convertToHTML(path, content) {
    console.log(path)
    console.log(content)
    console.log(content.template.cv.title)
    // return src('layouts/*.+(html|njk)')
    return src(path)
        // .pipe(data(() => ({
        //     content
        // })))
        .pipe(data(() => (
            content
        )))
        .pipe(template())
        .pipe(
            njk({
                path: ['build'],
            })
        )
        .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
        .pipe(dest('build'))
}

// function watchFiles() {
//     watch('src/html/**/*', html)
// }

// export const build = series(html);
// export const defaultTask = series(html, watchFiles);