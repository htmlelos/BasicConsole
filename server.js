const express = require('express')
const path = require('path')
const cors = require('cors')
const fetch = require('node-fetch')

const server = express()

// Configuraciones
server.set('view engine', 'pug')
server.set('views', path.join(__dirname, 'views'))

server.use('/static', express.static(path.join(__dirname, 'public')))
server.use(cors())
//Rutas
server.get('/', function (request, response) {
    // console.log('INICIO');
    response.render('home', {
        title: 'Consola'
    })
})

server.get('/users', function (request, response) {
    const body = {
        fields: '_id name password email'
    }
    fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(function (result) {
            return result.json()
        })
        .then(function (json) {
            // console.log(json.users);
            response.render('users', {
                title: 'Usuarios',
                list: json.users
            })
        })
        .catch(function (error) {
            response.render('error')
        })
})

server.get('/users/:userId', function (request, response) {
    const body = {
        fields: '_id name password email'
    }
    const userId = request.params.userId;
    console.log('USER_ID', userId);
    fetch('http://localhost:3000/users/' + userId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(function (result) {
            console.log('RESPONSE', result);
            return result.json()
        })
    .then(function (json) {
            console.log('USER_JSON', json);
            response.render('edit', {
                title: 'Editar',
                user: json
            })
        })
})

server.listen(4000, function () {
    console.log('Servidor ejecutandose en el puerto 4000');
})