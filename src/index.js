import { src, dest, series, watch } from 'gulp';
import njk from 'gulp-nunjucks-render';
import beautify from 'gulp-beautify';
import template from 'gulp-template';
import data from 'gulp-data';
import { readArguments } from './utils/cli.js';
import { validateStructure } from './validators/validateStructure.js';


function main() {
    const argumentList = readArguments();
    validateStructure(argumentList.structureFile);
}

main();