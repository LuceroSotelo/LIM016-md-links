import * as api from './index.js';

/*
module.exports = () => {
    mdLinks
};
*/

console.log(api.pathExist)

//mdLinks(path, options)


export const mdLinks = (path, options = {}) => {
    return new Promise((resolve, reject) => {
        if (!pathExist(thisPath)) {
            console.log('Dont exist')
            return
        }
        //console.log()
    });
}
