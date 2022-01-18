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










const pathIsAbsolute = (thisPath) => {
  return new Promise((resolve, reject) => {
      if (path.isAbsolute(thisPath) === true) {
        resolve('');
      } else {
        reject('');
      }
    });
  }

pathIsAbsolute(path01)
  .then(result => {
    console.log(`2. '${path01}' is an absolute path`, result)
  })
  .catch(error => {
    console.log(`2. '${path01}' is not an absolute path`, error)
  })


  let convertTopathAbsolute = new Promise(function (resolve, reject) {
    if (typeof path.resolve(path01) == 'string') {
      resolve(`3. The absolute path of '${path01}' 'is:' ${path.resolve(path01)}`)
    } else {
      reject(`3. Could not get absolute path`)
    }
  })
convertTopathAbsolute
  .then((string) => console.log(string))
  .catch((error) => console.log(error))






/*
let name = process.env.MY_NAME || 'without name';
console.log('Hi '+ name);

function hola(nombre) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log(`Hola ${nombre}`)
      resolve(nombre);
    },1000)
  })
}

function hablar(nombre) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log(`${nombre}: Blah blah blah`)
      resolve(nombre);
      reject('Hay un error');
    },1000)
  })
}

function adios(nombre) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log(`Adios ${nombre}`)
      resolve();
    },1000)
  })
}

console.log('Iniciando el proceso')
hola('Lu')
.then(hablar)
.then(hablar)
.then(hablar)
.then(adios)
.catch(error => {
  console.log('Hubo un error')
})
*/