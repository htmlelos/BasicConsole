const express = require('express')
const path = require('path')
const fetch = require('node-fetch')

const server = express()

// Configuraciones
server.set('view engine', 'pug')
server.set("views", path.join(__dirname, "views"))

server.use('/static', express.static(path.join(__dirname, "public")))
//Rutas
server.get('/', function (request, response) {
    // console.log('INICIO');
    response.render('home', { title: 'Titulo', message: 'Hola Mundo!' })
})

server.get('/users', function (request, response) {
    console.log('UI_USER');

    fetch('http://localhost:3000/users', { method: 'GET', headers: {} })
        .then(function(response) {return response.json()})
        .then(function(result){
            console.log(result.users);
            response.render('users', {users: result.users})
        })
        .catch(function(error){
            response.render('error')
        })
})

server.listen(4000, function () {
    console.log('Servidor ejecutandose en el puerto 4000');
})