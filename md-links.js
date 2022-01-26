module.exports = () => {
    mdLinks
};



const api = require('./index.js');

const md_links = (path, options = {}) => {
    return new Promise((resolve, reject) => {
        if (!api.pathExist(path)) {
            reject(`1. The path '${thisPath}' does not exist`)
        } else {
            if (!options.validate) {
                const valid_getproperties = api.get_mdfiles(path) !== 'Directorio vacío' ? api.get_properties(path) : 'Directorio vacío'
                resolve(valid_getproperties)
            } else {
                const valid_fetchstatus = api.get_mdfiles(path) !== 'Directorio vacío' ? api.fetch_status(path) : 'Directorio vacío'
                resolve(valid_fetchstatus)
            }
        }
    });
}


