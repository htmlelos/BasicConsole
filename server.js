const express = require('express')
const path = require('path')

const server = express()

// Configuraciones
server.set('view engine', 'pug')
server.set("views", path.join(__dirname, "views"))

server.use("/static", express.static(path.join(__dirname, "public")))
//Rutas
server.use('/', function(request, response) {
    response.render('home', { title: 'Titulo', message: 'Hola Mundo!'})
})

server.listen(4000, function() {
    console.log('Servidor ejecutandose en el puerto 4000');
})