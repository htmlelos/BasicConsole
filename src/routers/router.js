const fetch = require('node-fetch')
const middleware = require('../middlewares/middlewares')

const router = (server) => {
  server.get('/', (request, response) => {response.render('home', {title: 'Consola'})
  })

  server.get('/users', (request, response) => {
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
        .then(result => result.json())
        .then(json => response.render('users', {title: 'Usuarios', list: json.users}))
        .catch(error => response.render('users', {message: 'Usuarios no encontrados'})
        )
})

server.get('/users-edit/:userId', (request, response) => {
  const userId = request.params.userId;
  fetch(`http://localhost:3000/users/${userId}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
      })
      .then(result => result.json())
      .then(user => response.render('edit', {title: 'Editar',user: user}))
      .catch(error => response.render('user', {message: 'Usuario no encontrado'}))
})

server.get('/user-new', (request, response) => {
  response.render('edit', { user: {} })
})

server.post('/users-save', middleware.urlencoderParser, (request, response) => {
  const user = request.body;
  if (user.id === '' || user.id === null || user.id === undefined) {
    fetch('http://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
    .then(result => result.json())
    .then(user => response.redirect('http://localhost:4000/users'))
    .catch(error => response.end())
  } else {
    fetch('http://localhost:3000/users/'+user.id, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
    .then(result => result.json())
    .then(user => response.redirect('http://localhost:4000/users'))
    .catch(error => response.end())
  }
})

server.get('/users-delete/:userId', (request, response) => {
  const userId = request.params.userId
  fetch('http://localhost:3000/users/'+userId, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
  })
  .then(result => result.json())
  .then(json => response.redirect('http://localhost:4000/users'))
  .catch(error => response.end())
})

}

module.exports = router;