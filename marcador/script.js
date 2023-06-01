let lista = JSON.parse(localStorage.getItem('lista-jogadores')) || []
let idEditando = ''
const modal = document.querySelector('.modal')
const modalPontos = document.querySelector('.modal-pontos')
const nome = document.querySelector('#nome-jogador')
const adicionar = document.querySelector('#adicionar-jogador')
const salvar = document.querySelector('#salvar')
const containerJogadores = document.querySelector('.jogadores')
const botaoConfiguracoes = document.querySelector('.configuracoes')
const jogadoresJogo = document.querySelector('.jogadores-jogo')
const salvarPontos = document.querySelector('#salvar-pontos')
const pontos = document.querySelector('#pontos')
const somar = document.querySelector('#somar')
const subtrair = document.querySelector('#subtrair')
const resetar = document.querySelector('#resetar')
const semPlayers = document.querySelector('.sem-jogadores')

const criarContainer = (classe = '') => {
  const div = document.createElement('div')
  div.className = classe
  return div
}

const criarJogo = () => {
  jogadoresJogo.innerHTML = ''
  if (lista.length > 0) {
    resetar.classList.remove('d-none')
    semPlayers.classList.add('d-none')
    lista.forEach((jogador, index) => {
      const player = criarJogador(jogador.nome, `${jogador.pontos == 0 ? 'eliminado' : ''}`)
      const pontos = criarJogador(jogador.pontos, `${jogador.pontos == 0 ? 'eliminado' : ' '}`)
      const container = criarContainer(`${jogador.nome} container-jogador-pontos ${jogador.pontos == 0 ? 'borda-eliminado' : ''}`)
      container.appendChild(player)
      container.appendChild(pontos)
      jogadoresJogo.appendChild(container)
    })
  } else {
    semPlayers.classList.remove('d-none')
    resetar.classList.add('d-none')
  }
}

const listarPlayers = () => {
  containerJogadores.innerHTML = ''
  lista.forEach((jogador) => {
    const container = criarContainer('container-jogador-modal')
    const player = criarJogador(jogador.nome)
    const x = criarJogador('X')
    x.classList.add('remover-jogador')
    container.appendChild(player)
    container.appendChild(x)
    containerJogadores.appendChild(container)
  })
}

const criarJogador = (nome, classe) => {
  const span = document.createElement('span')
  span.className = classe
  span.id = nome
  span.innerHTML = nome
  return span
}

const removerJogador = (nome) => {
  const novaLista = lista.filter((jogador) => nome != jogador.nome)
  lista = novaLista
  criarJogo()
  listarPlayers()
}

const abrirFecharModal = (abrir) => {
  if (abrir) {
    modal.classList.remove('d-none')
  } else {
    modal.classList.add('d-none')
  }
}

const abrirFecharModalPontos = (abrir, id) => {
  if (abrir) {
    modalPontos.classList.remove('d-none')
    pontos.innerHTML = document.querySelector(`#${id}`).parentNode.lastChild.innerText
    idEditando = id
  } else {
    modalPontos.classList.add('d-none')
    id = ''
  }
}

const somarPonto = () => {
  const soma = Number(pontos.innerHTML) + 1
  pontos.innerHTML = soma
}

const subtrairPonto = () => {
  if (Number(pontos.innerHTML) > 0) {
    const subtracao = Number(pontos.innerHTML) - 1
    pontos.innerHTML = subtracao
  }
}

adicionar.addEventListener('click', () => {
  if (nome.value.length > 0) {
    lista.push({ nome: nome.value, pontos: 10 })
    listarPlayers()
  }

  nome.value = ''
})

salvar.addEventListener('click', () => {
  localStorage.setItem('lista-jogadores', JSON.stringify(lista))
  criarJogo()
  abrirFecharModal(false)
})

salvarPontos.addEventListener('click', () => {
  lista = lista.reduce((acc, jogador) => {
    if (jogador.nome === idEditando) {
      acc = [...acc, { nome: jogador.nome, pontos: pontos.innerHTML }]
      return acc
    } else {
      acc = [...acc, jogador]
      return acc
    }
  }, [])

  localStorage.setItem('lista-jogadores', JSON.stringify(lista))
  criarJogo()
  abrirFecharModalPontos(false)
})

botaoConfiguracoes.addEventListener('click', () => {
  abrirFecharModal(true)
})

document.addEventListener('click', ({ target }) => {
  if (target.classList[1] === 'remover-jogador') {
    console.log(target.parentNode.firstChild.id);
    removerJogador(target.parentNode.firstChild.id)
  }
})

document.addEventListener('click', ({ target }) => {
  if (target.classList[1] === 'container-jogador-pontos') {
    abrirFecharModalPontos(true, target.classList[0])
  }
})

somar.addEventListener('click', () => somarPonto())

subtrair.addEventListener('click', () => subtrairPonto())

resetar.addEventListener('click', () => {
  lista = lista.reduce((acc, jogador) => {
    acc = [...acc, { nome: jogador.nome, pontos: '10' }]
    return acc
  }, [])

  localStorage.setItem('lista-jogadores', JSON.stringify(lista))
  criarJogo()
  abrirFecharModalPontos(false)
})

listarPlayers()
criarJogo()