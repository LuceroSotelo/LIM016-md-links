const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { exit } = require('process');
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



//4. Verificar si la ruta es de un directorio o archivo(devuleve la extensión)
function pathExtension(thisPath) {
  if (fs.lstatSync(thisPath).isDirectory() !== true) {
    const typeFile = path.parse(thisPath).ext;
    return (`4. Is not a directory. The file extension is: '${typeFile}'`)// retorna extensión del archivo
  } else {
    return (console.log('4. The path is a directory:'), fs.lstatSync(thisPath).isDirectory()) // es un directorio
  }
}
console.log(pathExtension(path01))



//5. Devuelve el contenido del directorio
const read_dir = (route) => fs.readdirSync(route, 'utf-8')
console.log('5. This is the contents of the directory', read_dir(path01))



// Une dos pedazos de ruta
const join_path = (dir, base) => path.join(dir, base)
console.log('6. This is',join_path(path01))



//Función recursiva para obtener array de archivos md
const get_mdfiles = (path) => {
  let md_files = [];
  if (pathExist(path)) {
      const path_absolute = convertTopathAbsolute(path)
      const type_file = pathExtension(path_absolute) // file or directory
      if (type_file) { // Obs: Puede ser md, txt, jpeg, png, etc.
          if (type_file === '.md') {
              md_files = md_files.concat(path_absolute)
              return md_files
          } else {
              return 'Solo se revisan archivos markdown'
          }
      } else { // Obs: Puede contener files o subdirectorios
          const content_dir = read_dir(path_absolute)
          content_dir.forEach((file) => {
              const union_path = join_path(path_absolute, file)
              const recursive_function = get_mdfiles(union_path)
              md_files = md_files.concat(recursive_function)
          })
          return md_files.length !== 0 ? md_files : 'Directorio vacío'
      }
  } else {
      return 'Ruta inexistente'
  }
}

return(get_mdfiles(path01));


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

readAFile(path01)
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
  pathExist,
  pathIsAbsolute,
  convertTopathAbsolute,
  pathExtension,
  read_dir,
  join_path,
  get_mdfiles
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

