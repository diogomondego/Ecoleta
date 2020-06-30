const express = require("express")      //pedindo o express no node_modules pelo require()
const server = express()        //express() faz a variável receber uma função e executar no server q é um objeto de servidor para usar várias coisas

// configurar pasta publica
server.use(express.static("public"))        //use() configuração do servidor //static() função q espera um argumento //com essa config o server.js acessa os arquivos da pasta public sem precisar excrever no endereço url o nome public/

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
    return res.render("create-point.html")
    //res.sendFile("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
    //res.sendFile("create-point.html")
})

//ligar o servidor
server.listen(3000)     //funçao q vai ouvir a porta
