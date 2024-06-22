import { readArguments } from './utils/cli.js';
import { validateStructure } from './validators/validateStructure.js';
import { populatePage } from './utils/converter.js';


function main() {
    const argumentList = readArguments();
    validateStructure(argumentList.structureFile);
    populatePage(argumentList.structureFile)
}

main();