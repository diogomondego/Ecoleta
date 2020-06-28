const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")      /*vai procurar o botao(pesquisar pontos de coleta), ao clicar nele vai remover a classe hide do modal*/
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})