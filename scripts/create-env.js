const fs = require('fs')//fileSystem

fs.writeFileSync('./.env',`API=${process.env.API}\n`)//crear una variable en el nivel del servidor
//se debe asignar en el servidor y agregar la variable de entorno