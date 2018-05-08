const express = require('express')
const settings = require('./src/middlewares/settings')
const router = require('./src/routers/router')

const server = express()

// Configuraciones
settings(server, express)
//Rutas
router(server)

server.listen(4000, function () {
    console.log('Servidor ejecutandose en el puerto 4000');
})