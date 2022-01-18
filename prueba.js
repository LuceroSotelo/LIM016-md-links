const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { exit } = require('process');
const { JSDOM } = jsdom;

//0. Ingreso de la ruta
//let path01 = './README.md';
//Prueba con ruta absoluta
let path01 = '/Users/lucero sotelo/Documents/LUCERO/LABORATORIA/LIM016/PROYECTOS/LIM016-md-links/c_01';
//let path01 = './c_01/c_02/c_03/c_04/linksprueba.md'

//1. La ruta existe? sync //sacar el console log fuera de la funcion
function pathExist(thisPath) {
  if (fs.existsSync(thisPath) === true) {
    console.log(`1. The path '${thisPath}' exist`)
  } else {
    console.log(`1. The path '${thisPath}' does not exist`)
    
  }
}

pathExist(path01);

//2. Verificar si la ruta es absoluta o no sync

function pathIsAbsolute(thisPath) {
  if (path.isAbsolute(thisPath) === true) {
    console.log(`2. Is an absolute path`)
  } else {
    console.log(`2. Is not an absolute path`)
  }
}
pathIsAbsolute(path01);

//3. Devolver la ruta absoluta del archivo que se indica
function convertTopathAbsolute(thisPath) {
  if (path.isAbsolute(thisPath) === false) {
    console.log(`3. The absolute path is ${path.resolve(thisPath)}`)
  }
  else {
    console.log(`3. Is already an absolute path`)
  }
}
convertTopathAbsolute(path01)

//4. Verificar si la ruta es de un directorio o archivo
function pathExtension(thisPath){
    if (path.parse(thisPath).ext !== '') {
        const typeFile = path.parse(thisPath).ext;
        return (`4. Is not a directory. The file extension is: '${typeFile}' `)// retorna extensión del archivo
    } else {
        return (`4. The path is a directory`) // es un directorio
    }
}
console.log(pathExtension(path01)) 

//4.1. Si es un directorio listar contenido de directorio
const listFiles = function (thisPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(thisPath, 'utf-8', (err, data) => {      
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

listFiles(path01)
  .then(result => {
    console.log(`4.1. This is the file list: `, result)
  })
  .catch(error => {
    console.log(`4.1. Han error has ocurred`, error)
  })
/*
//4.2 Listar todos el contenido del directorio (inclusive los archivos contenidos en carpetas) RECURSIVIDAD

const traverseSync = dir => ({
   folder: dir,
   containedFiles: fs.readdirSync(dir).map(file0 => {
     const file = path.join(dir, file0);
     return fs.lstatSync(file).isDirectory()
       ? traverseSync(file)
       : { file };
   })
 });



console.log('OUTPUT TRAVERSESYNC:', JSON.stringify(traverseSync(path01).containedFiles)) 
*/

function foldersRecursion(dir) {
  let newArray = [];
  //console.log('folder:', dir);
  let files = fs.readdirSync(dir);
  //console.log(files);
  for(let x in files) {
    let next = path.join(dir, files[x]);
    if (fs.lstatSync(next).isDirectory()==true) {
      return foldersRecursion(next)      
    } else {
      newArray.push(next)
      //console.log('\t', 'file:', next);      
    }
  }
  return newArray
}

//foldersRecursion(path01)
console.log(foldersRecursion(path01))



//5. Luego de obtener todos los archivos, verificamos si tienen extensión .md o no - hacer for each a un array de rutas

function mdExtension(thisPath) {
  if (thisPath.endsWith('.md')) {
    console.log(`5. The file '${thisPath}' is a markdown file`)
  } else {
    console.log(`5. The file '${thisPath}' is not a markdown file`);
    exit()
  }
}

mdExtension(path01)

//5.1 No se encontraron archivos .md

//6. Crear un array con los archivos .md

//7. Leyendo el contenido de los archivos .md en html y crear un array con los links/ extraer contenido de 
//cada href con map a.href y convertirlo en string

const readAFile = function (thisPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(thisPath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(md.render(data))
      }
    })
  })
}

readAFile('./README.md')
  .then(result => {
    console.log(`7. This is the content of .md file in string: `, result)
  })
  .catch(error => {
    console.log(`7. Han error has ocurred`, error)
  })



/*
const readAFileLinks = function (thisPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(thisPath, 'utf-8', (err, data) => {
      const fileToHTML = md.render(data);
      const onlyLinks = new JSDOM(fileToHTML).window.document.querySelectorAll('a');
      let linksArray = [];
      onlyLinks.forEach( (e) => {        
        linksArray.push({
          href: e.toString(),
          text: e.textContent,
          file: thisPath
        })
      });
      if (err) {
        reject(err)
      } else {
        resolve(linksArray)
      }
    })
  })
}

readAFileLinks(path01)
  .then(result => {
    console.log(`8. This is the content of .md file in string: `, result)
  })
  .catch(error => {
    console.log(`8. Han error has ocurred`, error)
  })

*/



module.exports = {
 pathExist
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

