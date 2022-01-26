import fs from 'fs';
import path from 'path';
import { Remarkable } from "remarkable";
//import { exit } from 'process';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
let remarkable = new Remarkable();

//0. Ingreso de la ruta
//let path01 = './README.md';
//let path01 = '/Users/lucero sotelo/Documents/LUCERO/LABORATORIA/LIM016/PROYECTOS/LIM016-md-links';
let path01 = '/Users/lucero sotelo/Documents/LUCERO/LABORATORIA/LIM016/PROYECTOS/LIM016-md-links/c_01';
//let path01 = './c_01/c_02/c_03/c_04/linksprueba.md'


//1. La ruta existe?
const pathExist = (route) => fs.existsSync(route)
//console.log('1. Does the path exist?', pathExist(path01));


//2. Verificar si la ruta es absoluta o no
const pathIsAbsolute = (route) => path.isAbsolute(route)
//console.log('2. Is the path absolute?', pathIsAbsolute(path01));


//3. Devolver la ruta absoluta del archivo que se indica
const convertTopathAbsolute = (route) => {
  if (path.isAbsolute(route)) {
    return route
  }
  return path.resolve(route)
}
//console.log('3. The absolute path is', convertTopathAbsolute(path01));


//4. Verificar si la ruta es de un directorio SI USO----------
const pathIsDirectory = (route) => {return fs.lstatSync(route).isDirectory()} 
//console.log('4. Is the path a directory?', pathIsDirectory(path01))


//5. Recursividad para obtener un array de todos los archivos .md del directorio
const getMdArr = (route) => {
  let arrFilesMd = [];
  if (pathIsDirectory(route)) {
    const listFiles = fs.readdirSync(route); //Listar archivos del directorio
    listFiles.forEach((file) => {
      const routeFiles = path.join(route, file); // Unir dos rutas fragmentadas: ruta del directorio + ruta de cada uno de los archivos
      if (pathIsDirectory(routeFiles)) {
        arrFilesMd = arrFilesMd.concat(getMdArr(routeFiles))
      }
      if (path.extname(routeFiles) === ".md") {
        arrFilesMd.push(routeFiles);
      }
    })
  } else {
    arrFilesMd.push(route)
  }
  return arrFilesMd
}


//6. Leyendo el contenido de los archivos .md en html y crear un array de objetos con los detalles de los links
const getObjectsWithLinks = function (route) {
  const readFile = fs.readFileSync(route, 'utf-8');
  const fileToHTML = remarkable.render(readFile);
  const extractedLinks = new JSDOM(fileToHTML).window.document.querySelectorAll('a');
  let linksArray = [];
  extractedLinks.forEach((e) => {
    linksArray.push({
      href: e.toString(),
      text: e.textContent.substring(0, 50),
      file: route
    })
  });
  return linksArray;
}

//Uniendo los arrays de objetos en un solo array
const getArraysOfObjectsWithLinks = function (eachArr) {
  let getObjArray = [];
  eachArr.forEach((e) => {
    getObjArray.push(
      getObjectsWithLinks(e)
    )
  })
  return getObjArray.flat()
}


//7. Petición HTTP para verificar status
const statusHttp = (linksArr) => {
  //console.log('34',linksArr);
  let length = linksArr.length;
  for (let i = 0; i < length; i++) {
    fetch(linksArr[i].href)
      .then(response => {
        return console.log({
          href: linksArr[i].href,
          text: linksArr[i].text.substring(0, 50),
          file: linksArr[i].file,
          status: response.status,
          ok: (response.status >= 200) && (response.status < 300) ? 'ok' : 'fail'
        })
      })
      .catch(err => {
        return {
          href: linksArr[i].href,
          text: linksArr[i].text.substring(0, 50),
          file: linksArr[i].file,
          status: err.status,
          ok: 'fail'
        }
      });
  }
  return Promise.all(linksArr)
}

statusHttp(getArraysOfObjectsWithLinks(getMdArr(convertTopathAbsolute(path01))));


export {
  pathExist,
  pathIsAbsolute,
  convertTopathAbsolute,
  pathIsDirectory,
  statusHttp
} 

