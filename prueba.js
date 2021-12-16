const md = require('markdown-it')( { 
    html : true , 
    linkify : true , 
    typographer : true,
    Breaks : false 
  } ) ;


const result = md.render('[Markdown](https://es.wikipedia.org/wiki/Markdown)\n[Google](https://www.google.com/)\n[No es válido](htps://www.google.com/)\nlucero.eds@gmail.com');

console.log(result);

/