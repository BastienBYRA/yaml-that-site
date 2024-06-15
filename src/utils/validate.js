export const validate = (variable) => {
    if (variable === null || variable === undefined || variable === '') {
        return false;
    }
    return true;
};