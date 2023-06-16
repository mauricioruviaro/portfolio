let lista = JSON.parse(localStorage.getItem('lista-jogadores')) || []
let idEditando = ''
const modal = document.querySelector('.modal')
const nome = document.querySelector('#nome-jogador')
const adicionar = document.querySelector('#adicionar-jogador')
const salvar = document.querySelector('#salvar')
const containerJogadores = document.querySelector('.jogadores')
const botaoConfiguracoes = document.querySelector('.configuracoes')
const jogadoresJogo = document.querySelector('.jogadores-jogo')
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
    lista.forEach((jogador) => {
      const player = criarJogador(jogador.nome, `${jogador.pontos == 0 ? 'eliminado' : ''}`)
      const pontos = criarJogador(jogador.pontos, `${jogador.pontos == 0 ? 'eliminado' : ' '} pontos`)
      const container = criarContainer(`${jogador.nome} container-jogador-pontos ${jogador.pontos == 0 ? 'borda-eliminado' : ''}`)
      const menos = document.createElement('button')
      const mais = document.createElement('button')
      mais.innerHTML = '+'
      mais.classList = 'somar'
      menos.innerHTML = '-'
      menos.classList = 'subtrair'
      const containerNumeros = criarContainer('container-pontos')
      containerNumeros.appendChild(menos)
      containerNumeros.appendChild(pontos)
      containerNumeros.appendChild(mais)
      container.appendChild(player)
      container.appendChild(containerNumeros)
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

const somarPonto = (nome) => {
  const novaLista = lista.reduce((acc, jogador) => {
    if (jogador.nome === nome) {
      acc = [...acc, { ...jogador, pontos: Number(jogador.pontos) + 1 }]
    } else {
      acc = [...acc, jogador]
    }
    return acc
  }, [])

  lista = novaLista
  localStorage.setItem('lista-jogadores', JSON.stringify(lista))
  criarJogo()
}

const subtrairPonto = (nome) => {
  const novaLista = lista.reduce((acc, jogador) => {
    if (jogador.nome === nome) {
      console.log(jogador);
      if (Number(jogador.pontos) > 0) {
        acc = [...acc, { ...jogador, pontos: Number(jogador.pontos) - 1 }]
      } else {
        acc = [...acc, jogador]
      }
    } else {
      acc = [...acc, jogador]
    }
    return acc
  }, [])

  lista = novaLista
  localStorage.setItem('lista-jogadores', JSON.stringify(lista))
  criarJogo()
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

botaoConfiguracoes.addEventListener('click', () => {
  abrirFecharModal(true)
})

document.addEventListener('click', ({ target }) => {
  if (target.classList[1] === 'remover-jogador') {
    removerJogador(target.parentNode.firstChild.id)
  }
})

document.addEventListener('click', ({ target }) => {
  if (target.className === 'somar') {
    const jogador = target.parentNode.parentNode.classList[0]
    somarPonto(jogador)
  }

  if (target.className === 'subtrair') {
    const jogador = target.parentNode.parentNode.classList[0]
    subtrairPonto(jogador)
  }
})

resetar.addEventListener('click', () => {
  lista = lista.reduce((acc, jogador) => {
    acc = [...acc, { nome: jogador.nome, pontos: '10' }]
    return acc
  }, [])

  localStorage.setItem('lista-jogadores', JSON.stringify(lista))
  criarJogo()
})

listarPlayers()
criarJogo()