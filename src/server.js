const express = require("express")      //pedindo o express no node_modules pelo require()
const server = express()        //express() faz a variável receber uma função e executar no server q é um objeto de servidor para usar várias coisas

// configurar pasta publica
server.use(express.static("public"))        //use() configuração do servidor //static() função q espera um argumento //com essa config o server.js acessa os arquivos da pasta public sem precisar excrever no endereço url o nome public/

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))      //urlencoded é uma função que vai habilitar a propriedade extended com true

// pegar o banco de dados
const db = require("./database/db.js")

// utilizando template engine
const nunjucks = require("nunjucks")        //pedindo uma dependência q o npm instalou(o nunjucks vindo do node_modules)
nunjucks.configure("src/views", {
    express: server,     //qual o servidor express(no caso, server)
    noCache: true       //nao utilizar cache(nao salvar dados html)
})      //fazer uma configuração e o primeiro argumento pede a pasta que estão os html's que vai ser usado e o segundo argumento é um objeto

// configurar caminhos da minha aplicação
// página inicial
// req: requisição(pedido)
// res: resposta
server.get("/", (req, res) => {        //(get configuração de rota) função q vai receber req e res e vai executar alguma coisa
    //res entende que tem que renderizar (passar pelo motor do nunjucks) o index.html
    return res.render("index.html", { title: "Um título"})        //pode colocar só o nome do arquivo pois o render do res já está responsável por entender que ja está configurado no nunjucks para pegar a pasta src e views através da ligação express: server
    //res.sendFile(__dirname + "/views/index.html")       dirname devolve o nome do diretório q está(ex.: server.js está no src)
})

// está chamando rotas, não mais arquivos
server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa url
    //console.log(req.query)

    return res.render("create-point.html")
    //res.sendFile("create-point.html")
})

server.post("/save-point", (req, res) => {
    //req.body: O corpo do nosso formulário
    // console.log(req.body)

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?)
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {     // depois de inserir dados
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)       // referenciando a resposta que o run() está trazendo

        return res.render("create-point.html", { saved: true })   //retornar só depois q fizer o cadastro
    }

    db.run(query, values, afterInsertData)      //vai chamar a função afterInsertData

    
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length       //contar o tamanho do array(quantidade de elementos)

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })    //se o nome for igual, como no exemplo 'total: total', pode ser usado só 'total'
        //res.sendFile("create-point.html") = return res.render("search-results.html")
    })

    
})

//ligar o servidor
server.listen(3000)     //funçao q vai ouvir a porta
