const populatePage = (data) => {
    
}

const populateHeader = (header) => {
    html('../layouts/header.njk', header)
}
const populateSidebar = (sidebar) => {}
const populateFooter = (footer) => {}
const populateHomepage1 = (homepage1) => {}
const populateHomepage2 = (homepage2) => {}
const populateAbout = (about) => {}

const markdownToHTML = (data) => {
    //TODO
    return data;
}

const textToHTML = (data) => {
    return "<p>" + data + "</p>";
}


async function html(path, data) {
    // return src('layouts/*.+(html|njk)')
    return src(path)
        .pipe(data(() => ({
            data
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

// function watchFiles() {
//     watch('src/html/**/*', html)
// }

// export const build = series(html);
// export const defaultTask = series(html, watchFiles);