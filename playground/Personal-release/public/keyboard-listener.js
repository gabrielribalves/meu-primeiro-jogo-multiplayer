export default function criarKeyboardListener(document){
  const state = {
    observers: [],
    jogadorId: null
  }

  function registerJogadorId(jogadorId) {
    state.jogadorId = jogadorId
  }

  function subscribe(observerFunction){
    state.observers.push(observerFunction)
  }

  function notifyAll(comando){
    for (const observerFunction of state.observers){
      observerFunction(comando)
    }
  }

  document.addEventListener('keydown', handleKeydown)

  function handleKeydown(event){
    const teclaPressionada = event.key

    const comando = {
      type: 'move-player',
      jogadorId: state.jogadorId,
      teclaPressionada
    }

    notifyAll(comando);
  }

  return {
    subscribe,
    registerJogadorId
  }
}