import { src, dest, series, watch } from 'gulp';
import njk from 'gulp-nunjucks-render';
import beautify from 'gulp-beautify';
import template from 'gulp-template';
import data from 'gulp-data';
// import json_website_content from './builder-data.json'
import yaml from 'js-yaml';
import fs from 'fs';
import minimist from 'minimist';

// Global variables
var outputJson = false;
var verbose = false;
var structureFile = "builder.yaml"

function cli() {
    // --structure-file > Donne le nom d'un fichier YAML (ou JSON)
    // --from-json > Lis directement un JSON au lieu d'un YAML
    // --output-json > Envoi le JSON généré à partir du YAML
    // --verbose > Affiche des informations supplémentaires
    // --help > Affiche l'aide
    // --version > Affiche la version
    // --to-zip > Crée une archive ZIP du site
    // --to-tar > Crée une archive TAR du site

    const argv = minimist(process.argv.slice(2));
    if(argv['structure-file'] && typeof argv['structure-file'] === 'string' && argv['structure-file'].trim() !== '') {
        structureFile = argv['structure-file'].toString();
    }

    if(argv['from-json']) {
        console.log('from-json argument provided');
    }

    if(argv['output-json']) {
        outputJson = true
    }

    if(argv['verbose']) {
        verbose = true
    }

    if(argv['help']) {
        printHelp();
    }

    if(argv['version']) {
        printVersion();
    }

    if(argv['to-zip']) {
        console.log('to-zip argument provided');
    }

    if(argv['to-tar']) {
        console.log('to-tar argument provided');
    }
}

function checkWebsiteDataIsCorrect() {

}

function yamlToJson() {
    // const websiteStructure = yaml.load(fs.readFileSync('./builder.yaml', 'utf8'));
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
checkWebsiteDataIsCorrect();