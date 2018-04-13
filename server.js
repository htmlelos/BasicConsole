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
            response.render('users', {
                title: 'Usuarios',
                list: json.users
            })
        })
        .catch(function (error) {
            response.render('users', {message:'Usuarios no encontrados'})
        })
})

server.get('/users/:userId', function (request, response) {
    const userId = request.params.userId;
    fetch('http://localhost:3000/users/' + userId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(function (result) {
            return result.json()
        })
    .then(function (user) {
            response.render('edit', {
                title: 'Editar',
                user: user
            })
        })
    .catch(function(error) {
        response.render('user', {message:'Usuario no encontrado'})
    })
})

// server.post('/users', function (request, response) {
//     const body = {
//         fields: ''
//     }
// })

server.listen(4000, function () {
    console.log('Servidor ejecutandose en el puerto 4000');
})