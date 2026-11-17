
const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function obterFilmes() {
    const filmesEndpoint = '/filmes'
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLCompleta)).data
    // console.log(filmes)
    let tabela = document.querySelector (".filmes")
    let corpoTabela = tabela.getElementsByTagName("tbody")[0]
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}
async function cadastrarFilme() {
    const filmesEndpoint = '/filmes'
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    if (titulo && sinopse) {
        tituloInput.value = ""
        sinopseInput.value = ""
        const filmes = (await axios.post(URLCompleta, {titulo, sinopse})).data
        //limpa tabela antiga
        let tabela = document.querySelector('.filmes')
        let corpoTabela = tabela.getElementsByTagName('tbody')[0]
        corpoTabela.innerHTML = ""
        for (let filme of filmes) {
            let linha = corpoTabela.insertRow(0)
            let celulaTitulo = linha.insertCell(0)
            let celulaSinopse = linha.insertCell(1)
            celulaTitulo.innerHTML = filme.titulo
            celulaSinopse.innerHTML = filme.sinopse
        }
    }
    else {
        exibirAlerta ('.alert-cadastro-filme', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

async function cadastrarUsuario () {
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastro) {
        try {
            const cadastroUsuarioEndpoint = '/signup'
            const URLCompleta = `${protocolo}${baseURL}${cadastroUsuarioEndpoint}`
            await axios.post (URLCompleta, 
                             {login: usuarioCadastro, password: passwordCadastro})
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            exibirAlerta ('.alert-modal-cadastro', "Usuário cadastrado com sucesso!", ['alert-success', 'show'], ['alert-danger', 'd-none'], 2000)
            esconderModal('#modalCadastro', 2000)
        }
        catch (e) {
            exibirAlerta ('.alert-modal-cadastro', "Usuário já cadastrado", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
            esconderModal ('#modalCadastro', 2000)
        }
    }
    else {
        exibirAlerta ('.alert-modal-cadastro', "Preencha todos os campos", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    if (usuarioLogin && passwordLogin) {
        try {
            const loginEndpoint = '/login'
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const resposta = await axios.post (URLCompleta,
                {login: usuarioLogin, password: passwordLogin})
            localStorage.setItem('token', resposta.data.token)
            usuarioLoginInput.value = ""
            passwordLoginInput.value = ""
            exibirAlerta ('.alert-modal-login', "Login realizado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            esconderModal('#modalLogin', 2000)
            prepararPagina()
        }
        catch (e) {
            exibirAlerta ('.alert-modal-login', "Problema no login", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
        }
    }
    else {
        exibirAlerta('.alert-modal-login', "Preencha todos os campos", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

function exibirAlerta (seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, timeout)
}
function esconderModal (seletor, timeout) {
     setTimeout (() => {
        let modal = bootstrap.Modal.getInstance(seletor)
        modal.hide()
    }, timeout)
}
function prepararPagina () {
    const token = localStorage.getItem('token')
    const loginLink = document.querySelector('#loginLink')
    const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
    const novoUsuarioLink = document.querySelector('#novoUsuarioLink')
    if (token) {
        loginLink.innerHTML = 'Logout'
        cadastrarFilmeButton.disabled = false
        novoUsuarioLink.classList.add('d-none')
    }
    else {
        loginLink.innerHTML = 'Login'
        cadastrarFilmeButton.disabled = true
        novoUsuarioLink.classList.remove('d-none')
    }
}
function tratarLoginLogout () {
    const token = localStorage.getItem('token')
    if (token) {
        fazerLogout()
    }
    else {
        const modalLogin = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modalLogin'))
        modalLogin.show()
    }
}
function fazerLogout() {
    localStorage.removeItem('token')
    prepararPagina()
    exibirAlerta ('.alert-cadastro-filme', 'Logout realizado com sucesso', ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
} 