let listaDeNumeros = [];
let nMax = 30;
let nSecreto = numeroAleatorio();
let erro = "Erro! Preencha corretamente.";
let tentativas = 1;

msgInicial();

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag); 
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {                              
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2.0; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function msgInicial(){
    exibirTexto("h1", "Jogo do número secreto");
    exibirTexto("p", `Escolha um número entre 1 e ${nMax}`) ;
}

function verificarChute() {
    let chute = Number(document.querySelector("input").value);
    
    if (chute == nSecreto) {
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
        exibirTexto("h1", "Acertou!");
        exibirTexto("p", `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`);
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("bchute").setAttribute("disabled", true);
    } else {
        if (chute > nSecreto) {
            exibirTexto("p", `O número secreto é menor que ${chute}`);
        } else {
            exibirTexto("p", `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * nMax + 1);
    let quantidadeDeElementosNaLista = listaDeNumeros.length;

    if (quantidadeDeElementosNaLista === parseInt(nMax/2)) {
        listaDeNumeros = [];
    }

    if (listaDeNumeros.includes(numeroEscolhido)) {
        return numeroAleatorio();
    } else {
        listaDeNumeros.push(numeroEscolhido);    
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    nSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    msgInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
    document.getElementById("bchute").removeAttribute("disabled");
}