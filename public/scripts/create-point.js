function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")        //uma promisses(promessa de fazer tal coisa)
    .then( (res) => { return res.json() } )     /**função anonima q retorna um valor */ //transforma em json
    .then( states => {
        for (const state of states) {     /**"para cada estado de estados..." */
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`      //innerHTML manda construir um codigo html
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city")       //ou pode ser só '...("[name=city]")'
    const stateInput = document.querySelector("input[name=state")

    const ufValue = event.target.value      //event traz muitas informações, uma delas é o target(onde o evento foi executado q no caso foi o select uf) e pode pegar o valor value 
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text       //dentro desses options tem q saber qual está selecionado para pegar o texto dele e mandar para o value do stateInput

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"      //caso for trocar de estado mostrar novamente a msg de selecionar entado senao o valor da cidade continuaria aparecendo do estado anterior escolhido
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json() } )     /**função anonima q retorna um valor */ //transforma em json
    .then( cities => {
        
        for ( city of cities ) {     /**"para cada cidade de cidades..." */
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`      
        }

        citySelect.disabled = false     /**o disabled do select cidade some */
    } )
}

document
    .querySelector("select[name=uf")        /*procurar o select que tem o name uf*/
    .addEventListener("change", getCities)       //getCities = getCities(event) por conta de estar passando a função por referência //"ouvidor de eventos" quando o q está dentro do querySelector mudar, ele manda um aviso

// Itens de coleta
//pegar todos os lis
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

//let é uma variável, pode mudar de valor depois, const nao pode
let selectedItems = []      //salvar os itens(valores) selecionados

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma classe com javascript. add() adiciona uma classe, remove() remove e toggle() adiciona ou remove(quando já existe)
    itemLi.classList.toggle("selected")     //com classList no elemento podemos adicionar algumas funcionalidades

    const itemId = itemLi.dataset.id      //pega só o valor do id do dataset(atributo html)
    
    
    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados
        /**const alreadySelected = selectedItems.findIndex(function(item) { //"function(item) {" é uma função anonima, se for utilizada pode ser trocada por uma arrow funtion "(item) => {" */
    const alreadySelected = selectedItems.findIndex( item => {        //findIndex vai procurar os index no selectedItems e vai fazer uma função a cada index pegando o valor e jogando em item
        const itemFound = item == itemId       //verificar se item é igual ao itemId e salvar em itemFound se for true
        return itemFound
    })

    //se já estiver selecionado
    if( alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {       //filter busca os itens(valores)
            const itemIsDifferent = item != itemId  //false
            return itemIsDifferent      //se o(s) item(ns) for(em) diferente(s) vai ser salvo no novo array(filteredItems)
        })
        selectedItems = filteredItems       //selectedItems recebe o valor
    } else {
        //se nao tiver selecionado, adicionar a seleção
        selectedItems.push(itemId)        //push() coloca um valor dentro do array
    } 

    //atualizar o campo escondido com os itens selecionados    
    collectedItems.value = selectedItems//.join(' ')
    
}
