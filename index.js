const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
let filmes = [
    {
        titulo: "Vingadores: Ultimato",
        sinopse: "Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco."
    },
    {
        titulo: "Homem-Aranha: Um Novo Dia",
        sinopse: "Após o mundo ter esquecido seu nome, Peter Parker inicia um novo capítulo em sua vida, conciliando as aulas da faculdade, um trabalho de meio período e sua responsabilidade como o Homem-Aranha. Mas quando uma força misteriosa começa a desmantelar a cidade de dentro para fora, Peter se vê preso entre inimigos poderosos, legados antigos e aliados inesperados."
    },
]

//get http://localhost:3000
app.get('/hey', (req, res) => {
    res.send('hey')
})
app.get('/filmes', (req, res) => {
    res.json(filmes)
})
app.post('/filmes', (req, res) => {
    //obtem os dados digitados pelo cliente
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o objeto json
    const filme = {titulo: titulo, sinopse: sinopse}
    //acrescenta o filme novo à lista de filmes
    filmes.push(filme)
    //envia a base atualizada para o cliente como resposta
    res.json(filmes)
})

app.listen(3000, () => console.log ("server up & running"))