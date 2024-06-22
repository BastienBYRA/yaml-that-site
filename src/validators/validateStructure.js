import { validate, validateArray, validateFile } from '../utils/validate.js';
import { logger } from '../utils/logger.js';

export const validateStructure = (structureFile) => {
    checkIfThereHeaderAndSidebar(structureFile);
    checkPageIsCorrectlyDefined(structureFile);
}

/**
* Check if the structure file has both a header and a sidebar defined
* @param {JSON} structureFile
*/
const checkIfThereHeaderAndSidebar = (structureFile) => {
    const layout = structureFile.layout;

    if(!validate(layout)) {
        logger.warn("The structure file do not have a layout defined");
        return;
    }
    
    if(validate(layout.header) && validate(layout.sidebar)) logger.error("The structure file must have a header OR a sidebar");
}

/**
* Check if the structureFile has a page correctly defined
* @param {JSON} structureFile
*/
const checkPageIsCorrectlyDefined = (structureFile) => {
    if(!validate(structureFile.pages)) logger.error("The structure file must have atleast one page defined in");

    // Check if the pages are correctly defined
    structureFile.pages.forEach(element => {
        if (!validate(element.path) || !validate(element.template)) logger.error("A page must have atleast a path and a template defined")

        const template = element.template;
        const path = element.path;
        
        // I pass {{path}} to function in case there is a problem, to indicate user which part of the YAML/JSON file need to be changed.
        if (validate(template.blank)) checkPageBlankArguments(path, template.blank)
        if (validate(template.cv)) checkPageCVArguments(path, template.cv)
        

    });
}

const checkPageBlankArguments = (path, template) => {
    checkPageBaseArguments(path, template)
}

const checkPageCVArguments = (path, template) => {

    if(!validate(template.image)) logger.error("The page using the path " + path + " doesn't have a image defined")
    if(!validateFile(template.image, "img")) logger.error("The image file " + template.image + " couldn't be locate in the _images folder")

    if(validate(template.social_networks)) {
        template.social_networks.forEach(element => {
            if(!validate(element.image)) logger.error("The page using the path " + path + " doesn't have an image defined in the social_networks bloc")
            if(!validateFile(element.image, "img")) logger.error("The image file " + element.image + " couldn't be locate in the _images folder")
            if(!validate(element.link)) logger.error("The page using the path " + path + " doesn't have a link defined in the social_networks bloc")
            if(!validate(template.title)) logger.error("The page using the path " + path + " doesn't have a title defined in the social_networks bloc")
        })
    }

    if(validate(template.content_bloc)) {
        template.content_bloc.forEach(element => {
            if(!validate(element.title)) logger.error("The page using the path " + path + " doesn't have a title defined in the content_bloc bloc")
            if(!validate(element.content) && !validate(template.content_file)) logger.error("The page using the path " + path + " doesn't have a content or content_file defined in the content_bloc bloc")
        })
    }
}

/**
* Check if the page has the required arguments
* @param {String} path
* @param {JSON} template
*/
const checkPageBaseArguments = (path, template) => {
    // Check if a title and a content is defined
    if(!validate(template.title)) logger.error("The page using the path " + path + " doesn't have a title defined")
    if(!validate(template.content) && !validate(template.content_file)) logger.error("The page using the path " + path + " doesn't have a content or content_file defined")

    // Check if the files are correctly defined
    if(validate(template.css_file) && !validateFile(template.css_file)) logger.error("The css file " + template.css_file + " couldn't be locate in the _styles folder")
    if(validate(template.javascript_file) && !validateFile(template.javascript_file)) logger.error("The js file " + template.javascript_file + " couldn't be locate in the _scripts folder")
    if(validate(template.content_file) && !validateFile(template.content_file)) logger.error("The content file " + template.content_file + " couldn't be locate in the _contents folder")
    
    return true;
}