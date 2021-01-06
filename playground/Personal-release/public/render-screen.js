export default function renderTela(canvasTela, game, requestAnimationFrame, currentPlayerId){
  const context = canvasTela.getContext('2d')
  context.fillStyle = 'white'
  context.clearRect(0, 0,10,10)

  for (const jogadorId in game.state.jogadores){
    const jogador = game.state.jogadores[jogadorId]
    context.fillStyle = 'black'
    context.fillRect(jogador.x, jogador.y, 1, 1)
  }

  for(const frutaId in game.state.frutas){
    const fruta = game.state.frutas[frutaId]
    context.fillStyle = 'green'
    context.fillRect(fruta.x, fruta.y, 1, 1)
  }

  const currentPlayer = game.state.jogadores[currentPlayerId]

  if(currentPlayer){
    context.fillStyle = '#F0D04F'
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
  }

  requestAnimationFrame(() =>{
    renderTela(canvasTela, game, requestAnimationFrame, currentPlayerId)
  })
}