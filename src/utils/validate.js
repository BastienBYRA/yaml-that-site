import fs from 'fs';

/**
* Check if a string is valid (not null, not undefined, not empty)
* @param {String} variable
* @returns {Boolean}
*/
export const validate = (variable) => {
    if (variable === null || variable === undefined || variable === '') {
        return false;
    }
    return true;
};

/**
* Check if an array is valid (not null, not undefined, not empty, not empty array)
* @param {Array} variable
* @returns {Boolean}
*/
export const validateArray = (array) => {
    if (array === null || array === undefined || array === '' || array.length === 0) {
        return false;
    }
    return true;
};

/**
* Check if a file exists
* @param {String} filename
* @param {String} type   The type of file we check ; `css`, `js`, `img` or `content`)
* @returns {Boolean}
*/
export const validateFile = (filename, type) => {
    var folderToCheck = "/"
    if (type == "css") folderToCheck = "../_styles/"
    if (type == "js") folderToCheck = "../_scripts/"
    if (type == "img") folderToCheck = "../_images/"
    if (type == "content") folderToCheck = "../_contents/"

    if (fs.existsSync(folderToCheck + filename)) {
        return true;
    }
    return false;
}