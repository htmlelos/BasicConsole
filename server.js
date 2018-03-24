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
    response.render('home', {
        title: 'Consola'
    })
})

server.get('/users', function (request, response) {
    const body = {
        fields: '-_id name password email'
    }
    fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            console.log(result.users);
            response.render('users', {
                title: 'Usuarios',
                list: result.users
            })
        })
        .catch(function (error) {
            response.render('error')
        })
})

server.listen(4000, function () {
    console.log('Servidor ejecutandose en el puerto 4000');
})