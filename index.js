//Exportar funcion mdLinks   
//mdLinks(path, options)

module.exports = () => {
  // ...
};


//mdLinks(path01, options)
//import fetch from 'node-fetch';

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')( { 
  html : true , 
  linkify : true , 
  typographer : true,
} ) ;
const  jsdom  =  require ( "jsdom" ) ; 
const  {  JSDOM  }  =  jsdom ;
const MDextension = '.md';

//0. Ingreso de la ruta
let moduleToIdentify = './linksprueba.md';

//1. La ruta existe //Promesas
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

//7. Leyendo el contenido de los archivos .md y crear un array con los links
console.log(`7.1 This is the content of .md file convert to HTML:`)
fs.readFile(moduleToIdentify, function (err, data){
   if (err){
    console.log(err);
  }
  const result = md.render(data.toString());
  const dom = new JSDOM(result);
  let array1 = dom.window.document.querySelectorAll('a');
  console.log(Array.from(array1).toString()); 
})


//solicitud HTTP
fetch('https://www.xatakandroid.com/productividad-herramientas/como-controlar-tu-movil-desde-otro-movil-con-teamviewer#:~:text=Teamviewer%20es%20una%20de%20las,%2C%20Windows%20Phone%20y%20BlackBerry).')
.then(promesaFetch=>promesaFetch.json())
.then(contenido=>console.log(contenido));















//mockear


/*
//ruta absoluta del directorio actual 
console.log(__dirname);

//ruta abosluta del modulo actual
console.log(__filename);

//nombre del módulo actual
console.log(path.basename(__filename));
*/

