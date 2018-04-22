const express = require('express')
const path = require('path')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const server = express()

// Configuraciones
server.set('view engine', 'pug')
server.set('views', path.join(__dirname, 'views'))

server.use('/static', express.static(path.join(__dirname, 'public')))
server.use(cors())
// server.use(bodyParser.json())
// server.use(bodyParser.urlencoded({extends: true}))
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
            headers: {
                'Content-Type': 'application/json'
            }
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
            response.render('users', {
                message: 'Usuarios no encontrados'
            })
        })
})

server.get('/users/edit/:userId', function (request, response) {
    const userId = request.params.userId;
    fetch('http://localhost:3000/users/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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
        .catch(function (error) {
            response.render('user', {
                message: 'Usuario no encontrado'
            })
        })
})

const jsonParser = bodyParser.json();
const urlencoderParser = bodyParser.urlencoded({
    extended: false
})

server.get('/user/new', function (request, response) {
    response.render('edit', {
        user: {}
    })
})

server.post('/users/save', urlencoderParser, function (request, response) {
    const user = request.body;
    if (user.id === '' || user.id === null || user.id === undefined) {
      fetch('http://localhost:3000/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
      })
      .then(function (result) {            
        return result.json();
      })
      .then(function (user) {
        response.redirect('http://localhost:4000/users');
      })
      .catch(function (error) {
        response.end();
      })
    } else {
      fetch('http://localhost:3000/users/'+user.id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
      })
      .then(function (result) {        
        return result.json();
      })
      .then(function (user) {
        response.redirect('http://localhost:4000/users');
      })
      .catch(function (error) {
        response.end();
      })
    }
})

server.get('/users/delete/:userId', function (request, response) {
    const userId = request.params.userId
    fetch('http://localhost:3000/users/'+userId, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    .then(function (result) {
        return result.json()
    })
    .then(function (json) {
        response.redirect('http://localhost:4000/users');
    })
    .catch(function (error) {
        response.end();
    })
})

server.listen(4000, function () {
    console.log('Servidor ejecutandose en el puerto 4000');
})