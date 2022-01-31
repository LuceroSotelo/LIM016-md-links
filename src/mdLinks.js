import * as api from './api.js';

const mdLinks = (path, options = { validate: false, stats: false }) => new Promise((resolve, reject) => {
    if (!path) reject('Input a path');
    const absolutePath = api.convertTopathAbsolute(path);
    if (!api.pathExist(absolutePath)) reject('Invalid path');
    const mdFiles = api.getMdArr(absolutePath);
    if (mdFiles.length === 0) reject('No md files found');
    const mdAllLinks = api.getArraysOfObjectsWithLinks(api.getMdArr(absolutePath));
    if (mdAllLinks.length === 0) reject('No md-links found');
    if (options.validate) api.statusHttp(mdAllLinks).then(linksStatus => resolve(linksStatus));
    else resolve(mdAllLinks);
});


const resultado = mdLinks('c_01', { validate: false })
resultado
    .then((resul) => console.log(resul))
    .catch((err) => console.log(err));


export {
    mdLinks
}




/*
let path02 = './c_01';

const mdLinks = (path, options = {}) => {
    return new Promise((resolve, reject) => {
        if (!api.pathExist(path)) {
            reject(`The path '${path}' does not exist`)
        }
        else if (!api.getMdArr(path).length > 0) {
            reject((`There are not markdown files in '${path}'`))
        }

        else if (!options.validate) {
            reject(api.getArraysOfObjectsWithLinks(api.getObjectsWithLinks(api.getMdArr(path))))
        }

        else {
            resolve (api.statusHttp(api.getArraysOfObjectsWithLinks(api.getMdArr(api.convertTopathAbsolute(path)))))
        }
    });
}


mdLinks(path02, { validate: true })
    .then(res => console.log('Promesa Resuelta: ', res))
    .catch(err => console.log(err));
*/




//process
//const argumentos = process.argv;


