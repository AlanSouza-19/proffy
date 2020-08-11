const express = require('express')
const nunjucks = require('nunjucks')
const { pageLanding, pageStudy, pageGiveClasses, pageSaveClasses, pageSuccess} = require('./pages')

const server = express()

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// receber os dados do request.body
server.use(express.urlencoded({ extended: true }))

//configurar o nunjucks
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
})

// rotas da aplicação
server.get('/', pageLanding)
server.get('/study', pageStudy)
server.get('/give-classes', pageGiveClasses)
server.post('/save-classes', pageSaveClasses)
server.get('/success', pageSuccess)

server.listen(5500)