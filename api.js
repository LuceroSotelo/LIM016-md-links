const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();
const jsdom = require('jsdom');
//const axios = require('axios');
const fetchUrl = require('fetch').fetchUrl;
const { exit } = require('process');
const dir = require('node-dir');
const { JSDOM } = jsdom;

//0. Ingreso de la ruta
//let path01 = './README.md';
let path01 = '/Users/lucero sotelo/Documents/LUCERO/LABORATORIA/LIM016/PROYECTOS/LIM016-md-links';
//let path01 = './c_01/c_02/c_03/c_04/linksprueba.md'


//1. La ruta existe?
const pathExist = (thisPath) => fs.existsSync(thisPath)
console.log('1. Does the path exist?', pathExist(path01));



//2. Verificar si la ruta es absoluta o no
const pathIsAbsolute = (thisPath) => path.isAbsolute(thisPath)
console.log('2. Is the path absolute?', pathIsAbsolute(path01));



//3. Devolver la ruta absoluta del archivo que se indica
function convertTopathAbsolute(thisPath) {
  if (path.isAbsolute(thisPath) === false) {
    console.log(`3. The absolute path is ${path.resolve(thisPath)}`)
  }
  else {
    console.log(`3. Is already an absolute path: `, path.resolve(thisPath))
  }
}
convertTopathAbsolute(path01)



//4. Verificar si la ruta es de un directorio o archivo(arrojar archivos md)
const pathIsDirectory = (thisPath) => fs.lstatSync(thisPath).isDirectory();
console.log('4. Is the path a directory?', pathIsDirectory(path01))


//Listar archivos del directorio
const listFiles = (thisPath) => fs.readdirSync(thisPath);


// Unir dos rutas fragmentadas: ruta del directorio + ruta de cada uno de los archivos
const joinPaths = (thisPath) => {
  return listFiles(thisPath).map((elemento) => path.join(thisPath, elemento));
};
//console.log(joinPaths(path01))


//Validar si el archivo tiene extensión md
const validateMdExtension = (thisPath) => path.extname(thisPath) === '.md'; // retorna true or false
console.log('5. The path is a markdown file?', validateMdExtension(path01));

//5. Array de mds

const filesFilteredByMd = (thisPath) => joinPaths(thisPath).filter(function (element) {
  if (element.endsWith('.md'))
    return element;
})
const MdArray = filesFilteredByMd(path01);//-----------------se pasa directamente la ruta---------------------
//console.log('6. Md extension files: ', MdArray)



//6. Leyendo el contenido de los archivos .md en html y crear un array de objetos con los detalles de los links
const getObjectsWithLinks = function (thisPath) {
  const readFile = fs.readFileSync(thisPath, 'utf-8');
  const fileToHTML = md.render(readFile);
  const extractedLinks = new JSDOM(fileToHTML).window.document.querySelectorAll('a');
  let linksArray = [];
  extractedLinks.forEach((e) => {
    linksArray.push({
      href: e.toString(),
      text: e.textContent,
      file: thisPath
    })
  });
  //console.log('92',readFile)  
  return linksArray;
}

//Uniendo los arrays de objetos en un solo array
const getArraysOfObjectsWithLinks = function (eachArr) {
  let getObjArray = [];
  eachArr.forEach((e) => {
    getObjArray.push(
      getObjectsWithLinks(e)
    )})
  return getObjArray.flat()
}
const arraysOfObjectsWithLinks = getArraysOfObjectsWithLinks(MdArray)
console.log('6. Found links: ', arraysOfObjectsWithLinks);

/*
// 7. Función que devuelve una promesa para obtener el status y las propiedades completas de los links en caso si sean validadas las options

const funcionObtenerStatusdeLinks = (arrayDeLinksyPropiedades) => {
  const arrayDeLinksValidados = arrayDeLinksyPropiedades.map((elemento) =>
    fetchUrl(elemento.href)
      .then((res) => {
          elemento.href,
          elemento.text, // jala el key "text" del objeto anterior
          elemento.file,
          elemento.status = res.status, // el método status pertenece a fetch y devuelve un number
          elemento.message = (res.status >= 200) && (res.status <= 399) ? 'OK' :'FAIL'; // Normalmente cuando el status de la peticion http da un numero con base 2 significa que la peticion ha tenido éxito
        return elemento;
      }).catch((error) => {
        return {
          href: elemento.href,
          text: elemento.text,
          file: elemento.file,
          status: 'Error ' + error,
          message: 'FAIL'
        };
      }));

  return Promise.all(arrayDeLinksValidados)
};
console.log(funcionObtenerStatusdeLinks(arraysOfObjectsWithLinks))
*/

module.exports = {
  pathExist,
  pathIsAbsolute,
  convertTopathAbsolute,
  //read_dir,
  //join_path,
  //get_mdfiles
}

//mockear


/*
//ruta absoluta del directorio actual 
console.log(__dirname);

//ruta abosluta del modulo actual
console.log(__filename);

//nombre del módulo actual
console.log(path.basename(__filename));
*/

