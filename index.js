//Exportar funcion mdLinks   
//mdLinks(path, options)
module.exports = () => {
  // ...
};

const fs = require('fs');
let path = require('path');

const MDextension = '.md';

//0. Ingreso de la ruta
let moduleToIdentify = './README.md';

//1. La ruta existe
const routeExists = fs.existsSync(moduleToIdentify);
console.log(`1. The route '${moduleToIdentify}' ${routeExists ? '' : 'not'} exist`);
//console.log(typeof routeExists);

//2. Verificar si la ruta es absoluta o no
const routeIsAbsolute = path.isAbsolute(moduleToIdentify);
console.log(`2. The route '${moduleToIdentify}' ${routeIsAbsolute ? 'is' : 'is not'} an absolute route`);

//3. Devolver la ruta absoluta del archivo que se indica
const routeAbsolute =  path.resolve(moduleToIdentify);
console.log (`3. The absolute route of '${moduleToIdentify}' 'is:' ${routeAbsolute}`);

//4. Verificar si la ruta es de un directorio o archivo
const routeIsADirectory = fs.statSync(moduleToIdentify).isDirectory();
console.log(`4. The route '${moduleToIdentify}' ${routeIsADirectory ? 'is' : 'is not'} a directory`);
//4.1 Recursividad si la ruta es un directorio

//5. Luego de obtener todos los archivos, verificamos si tienen extensión .md o no
console.log(`5. The file '${moduleToIdentify}' ${moduleToIdentify.endsWith(MDextension) ? 'is' : 'is not'} a markdown file`);
//5.1 No se encontraron archivos .md

//6. Crear un array con los archivos .md

//7. Leer los archivos .md para identificar los links
//7.1 Leyendo el contenido de los archivos .md
console.log(`This is the content of .md file:`)
fs.readFile(moduleToIdentify, function (err, data){
  let MDstring = data.toString();
   if (err){
    console.log(err);
  }
  console.log(MDstring);
  //verificando si el archivo .md contiene links
  //console.log(MDstring.includes('http'));
})


//mockear


/*
//ruta absoluta del directorio actual 
console.log(__dirname);

//ruta abosluta del modulo actual
console.log(__filename);

//nombre del módulo actual
console.log(path.basename(__filename));
*/

