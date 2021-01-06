import express from 'express';
import http from 'http'
import criarGame from './public/game.js'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server);

app.use(express.static('public'))
// 14/01 08h 112,00
// 15/01 16h 91,11

const game = criarGame()

game.subscribe((comando) => {
  console.log(`> Emitting ${comando.type}`)
  sockets.emit(comando.type, comando)
})

sockets.on('connection', (socket) =>{
  const jogadorId = socket.id
  console.log(`> Player connected: ${jogadorId}`);

  game.addJogador({jogadorId: jogadorId})

  socket.emit('setup', game.state)

  socket.on('disconnect', () =>{
    game.removeJogador({jogadorId: jogadorId})
    console.log(`> Player disconnected: ${jogadorId}`)
  })

  socket.on('move-player', (comando) =>{
    comando.jogadorId = jogadorId
    comando.type = 'move-player'

    game.moverJogador(comando)
  })
})

server.listen(3000, () =>{
  console.log('> Server listening on port 3000');
})