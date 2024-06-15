import fs from 'fs';
import minimist from 'minimist';
import { exit } from 'process';
import { Arguments } from '../class/Arguments.js';
import yaml from 'js-yaml';

export const readArguments = () => {
    
    let argumentList = new Arguments(false, false, null, false, false);

    const argv = minimist(process.argv.slice(2));

    console.log(argv)

    if(argv['structure-file'] && typeof argv['structure-file'] === 'string' && argv['structure-file'].trim() !== '') {

        // Get file extension
        const fileExtension = argv['structure-file'].split('.').pop();
        if (fileExtension == "yml" || fileExtension == "yaml") {
            argumentList.structureFile = yaml.load(fs.readFileSync("../" + argv['structure-file'], 'utf8'));
        } else if (fileExtension == "json") {
            argumentList.structureFile = argv['structure-file'];
            console.log("TODO")
            exit(1)
        } else {
            console.log('File provided is not a YAML or JSON file !');
            exit(1);
        }
    }

    if(argv['output-json']) argumentList.outputJson = true

    if(argv['verbose']) argumentList.verbose = true

    if(argv['help']) printHelp();

    if(argv['version']) printVersion();

    if(argv['to-zip']) argumentList.toZip = true

    if(argv['to-tar']) argumentList.toTar = true

    return argumentList;
}

const printHelp = () => {
    // --structure-file > Donne le nom d'un fichier YAML (ou JSON)
    // --output-json > Envoi le JSON généré à partir du YAML
    // --verbose > Affiche des informations supplémentaires
    // --help > Affiche l'aide
    // --version > Affiche la version
    // --to-zip > Crée une archive ZIP du site
    // --to-tar > Crée une archive TAR du site
    console.log("Help");
    exit(0);
}

const printVersion = () => {
    console.log("Version");
    exit(0);
}