export default function criarJogo(){
  const state = {
    jogadores: {}, 
    frutas: {},
    tela: {
      width: 10,
      height: 10
    }
  }

  const observers = []
  
  function subscribe(observerFunction){
    observers.push(observerFunction)
  }

  function notifyAll(comando){
    for (const observerFunction of observers){
      observerFunction(comando)
    }
  }  
  
  function setState(newState){
    Object.assign(state, newState)
  }

  function addJogador(comando){
    const jogadorId = comando.jogadorId
    const jogadorX = 'jogadorX' in comando ? comando.jogadorX : Math.floor(Math.random() * state.tela.width)
    const jogadorY = 'jogadorY' in comando ? comando.jogadorY : Math.floor(Math.random() * state.tela.height)

    state.jogadores[jogadorId] = {
      x: jogadorX,
      y: jogadorY
    }

    notifyAll({
      type: 'add-jogador',
      jogadorId: jogadorId,
      jogadorX: jogadorX,
      jogadorY: jogadorY
    })

  }
  function removeJogador(comando){
    const jogadorId = comando.jogadorId

    delete state.jogadores[jogadorId]

    notifyAll({
      type: 'remove-jogador',
      jogadorId: jogadorId
    })
  }

  function addFruta(comando){
    const frutaId = comando.frutaId
    const frutaX = comando.frutaX
    const frutaY = comando.frutaY

    state.frutas[frutaId] = {
      x: frutaX,
      y: frutaY
    }

  }
  function removeFruta(comando){
    const frutaId = comando.frutaId

    delete state.frutas[frutaId]
  }

  function moverJogador(comando){
    notifyAll(comando)
    
    const aceitarMovimentos = {
      ArrowUp(jogador){
        if(jogador.y - 1 >= 0){
          jogador.y -= 1;
        }
      },
      ArrowRight(jogador){
        if(jogador.x + 1 < state.tela.width){
          jogador.x += 1;
        }
      },
      ArrowDown(jogador){
        if(jogador.y + 1 < state.tela.height){
          jogador.y += 1;
        }          
      },
      ArrowLeft(jogador){
        if(jogador.x - 1 >= 0){
          jogador.x -= 1;
        }          
      },
    }

    const teclaPressionada = comando.teclaPressionada
    const jogadorId = comando.jogadorId
    const jogador = state.jogadores[jogadorId]
    const moverFunction = aceitarMovimentos[teclaPressionada]

    if(jogador && moverFunction){
      moverFunction(jogador)
      checkColisaoFruta(jogadorId)
    }
  }

  function checkColisaoFruta(jogadorId){
    const jogador = state.jogadores[jogadorId]

    for(const frutaId in state.frutas){
      const fruta = state.frutas[frutaId]
      console.log(`Checking ${jogadorId} and ${frutaId}`)

      if(jogador.x === fruta.x && jogador.y === fruta.y){
        console.log(`COLLISION between ${jogadorId} and ${frutaId}`);
        removeFruta({frutaId: frutaId})
      }
    }
  }
  return {
    addJogador,
    removeJogador, 
    addFruta,
    removeFruta,
    moverJogador,
    state,
    setState,
    subscribe
  }
}