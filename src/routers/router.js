const fetch = require('node-fetch')
const middleware = require('../middlewares/middlewares')

const router = (server) => {

  server.get('/', (request, response) => {response.render('home', {title: 'Consola'})
  })

  server.get('/users', async (request, response) => {
    const body = { fields: '_id name password email' }
    try {
      const options = { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }}
      const result = await fetch('http://localhost:3000/users', options)
      const json = await result.json();
      response.render('users', {title: 'Usuarios', list: json.users})
    } catch (error) {
      response.render('users', {message: 'Usuarios no encontrados'})
    }
  })

  server.get('/users-edit/:userId', async (request, response) => {
    const userId = request.params.userId;
    try {
      const options = { method: 'GET', headers: {'Content-Type': 'application/json'}}
      const result = await fetch(`http://localhost:3000/user/${userId}`, options)
      const user = await result.json()
      response.render('edit', {title: 'Editar', user})
    } catch (error) {
      response.render('user', {message: 'Usuario no encontrado'})
    }
  })

  server.get('/user-new', (request, response) => {
    response.render('edit', { user: {} })
  })

  server.post('/users-save', middleware.urlencoderParser, async (request, response) => {
    const user = request.body;
    if (user.id === '' || user.id === null || user.id === undefined) {
      try {
        const options = { method: 'POST', body: JSON.stringify(user), headers: {'Content-Type': 'application/json'}}
        const result = await fetch('http://localhost:3000/user', options)
        const newUser = await result.json()
        response.redirect('http://localhost:4000/users')
      } catch (error) {
        response.end()
      }
    } else {
      try {
        const options = { method: 'PUT', body: JSON.stringify(user), headers: {'Content-Type': 'application/json'}}
        const result = await fetch('http://localhost:3000/user/'+user.id, options)
        const newUser = await result.json()
        response.redirect('http://localhost:4000/users')
      } catch (error) {
        response.end()
      }
    }
  })

  server.get('/users-delete/:userId', async (request, response) => {
    const userId = request.params.userId
    try {
      const options = { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
      const result = await fetch('http://localhost:3000/user/'+userId, options)
      const newUser = await result.json()
      response.redirect('http://localhost:4000/users')
    } catch (error) {
      response.end()
    }
  })
}

module.exports = router;