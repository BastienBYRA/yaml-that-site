import { exit } from 'process';
import { validate } from '../utils/validate.js';

export const validateStructure = (structureFile) => {

    checkIfThereHeaderAndSidebar(structureFile);
    checkPageIsCorrectlyDefined(structureFile);

}

const checkIfThereHeaderAndSidebar = (structureFile) => {
    // Check if the structureFile has a header and sidebar
    const layout = structureFile.layout;

    if(!validate(layout)) {
        console.log("INFO; The structure file do not have a layout defined");
        return;
    }

    if(validate(layout.header) && validate(layout.sidebar)) {
        console.log("The structure file must have a header OR a sidebar");
        exit(1);
    }
}

const checkPageIsCorrectlyDefined = (structureFile) => {
    // Check if the structureFile has a page correctly defined
    if(!validate(structureFile.pages)) {
        console.log("The structure file must have a pages");
        exit(1);
    }

    // Check if the structureFile has a page correctly defined
    structureFile.pages.forEach(element => {

        if (!validate(element.title) || !validate(element.path) || !validate(element.template)) {
            console.log("A page must have a title, a path and a template defined");
            exit(1);
        }

        const template = element.template;
        // checkPageBaseArguments(template);
        console.log(template);

        if (validate(template.homepage1)) checkPageHomepage1Arguments(template.homepage1)



    });
}

const checkPageHomepage1Arguments = (template) => {

    

    checkPageBaseArguments(template)
}

const checkPageHomepage2Arguments = (template) => {
    checkPageBaseArguments(template)
}


const checkPageBaseArguments = (template) => {

}