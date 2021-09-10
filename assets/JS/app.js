
let deck = [];
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K'];

let puntosJugador = 0
let puntosComputadora = 0

//referecnias del html
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const btnNuevo = document.querySelector('#btnNuevo')
const puntosHTML = document.querySelectorAll('small')
const divJugadorCartas = document.querySelector('#jugador-cartas')
const divCartasCompu = document.querySelector('#computadora-cartas')

const crearDeck = () => {
  for(let i = 2; i<=10; i++ ){
    for(let tipo of tipos){
       deck.push(i+ tipo)
    }
  }
  for(tipo of tipos){
    for(let esp of especiales){

      deck.push(esp + tipo)
    }
  }

  deck = _.shuffle(deck)
  console.log(deck);
  return deck
}
crearDeck();

const pedirCarta = () => {

  if(deck.length===0){
    throw 'no hay cartas en el deck';
  }
  const carta = deck.pop();


  return carta
}
pedirCarta()

const valorCarta = (carta) => {
  const valor = carta.substring(0,carta.length-1);
  return(isNaN(valor)) ?
         (valor === 'A') ?11 :10
         : valor*1
}
const valor = valorCarta(pedirCarta())

//turno de la computadora
const turnoComputadora = (puntosMinimos ) => {
  do{
     const carta = pedirCarta()
     puntosComputadora = puntosComputadora + valorCarta(carta)

     puntosHTML[1].innerText = puntosComputadora;

     const imgCarta = document.createElement('img')
     imgCarta.src = `/assets/cartas/cartas/${carta}.png`
     imgCarta.classList.add('carta')

     divCartasCompu.appendChild(imgCarta)

  } while((puntosComputadora<puntosMinimos) && (puntosMinimos <= 21))

  setTimeout(() => {
    if(puntosComputadora===puntosMinimos){
      alert('nadie gana')
    } else if(puntosJugador > 21){
     alert('la computadora gana!!')
    } else if(puntosComputadora>21){
      alert('ganaste!!! :)')
    } else{
      alert('la computadora gana!!')

    }
  }, 1000);

}



//eventos
btnPedir.addEventListener('click', ()=>{
  const carta = pedirCarta()
  puntosJugador = puntosJugador + valorCarta(carta)

  puntosHTML[0].innerText=puntosJugador;

  const imgCarta = document.createElement('img')
  imgCarta.src = `/assets/cartas/cartas/${carta}.png`
  imgCarta.classList.add('carta')

  divJugadorCartas.appendChild(imgCarta)

  if(puntosJugador>21){
    console.warn('perdiste');
    btnPedir.disabled='true'
    turnoComputadora(puntosJugador)
  } else if(puntosJugador===21){
    console.log('felicidades!! tienes 21');
    btnPedir.disabled = 'true';
    turnoComputadora(puntosJugador)
  }

})
btnDetener.addEventListener('click', () =>{
  btnPedir.disabled = 'true'
  btnDetener.disabled = 'true'
  turnoComputadora(puntosJugador)
})

btnNuevo.addEventListener('click', resetear)

function resetear(){
  deck = []
  crearDeck()
  console.log(deck);
  puntosComputadora = 0
  puntosJugador = 0
  btnPedir.disabled = false
  btnDetener.disabled = false
  puntosHTML.forEach( punto => punto.innerText = '0')
  limpiarHTML(divJugadorCartas)
  limpiarHTML(divCartasCompu)

}
function limpiarHTML(div){
  while(div.firstChild){
    div.removeChild(div.firstChild)
  }

}