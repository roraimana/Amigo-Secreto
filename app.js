//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
let listaDeAmigos = [];
let paresSorteados = {};

function adicionarAmigo() {
    let amigo = document.getElementById('amigo').value;
    console.log(amigo);

    if (amigo.trim() === '') {
        alert('Por favor, insira um nome válido.');
        return;
    }

    amigo = amigo.trim().toLowerCase();
    if (listaDeAmigos.includes(amigo)) {
        alert('Este nome já foi adicionado.');
        return;
    }

    listaDeAmigos.push(amigo);
    document.getElementById('amigo').value = '';

    // Limpar resultado anterior se houver
    if (Object.keys(paresSorteados).length > 0) {
        document.getElementById('resultado').innerHTML = '';
        paresSorteados = {};
    }

    exibirListaDeAmigos();
}

function exibirListaDeAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    for (let i = 0; i < listaDeAmigos.length; i++) {
        let li = document.createElement('li');
        li.textContent = listaDeAmigos[i];
        li.classList.add('name-list-item');

        let button = document.createElement('button');
        button.textContent = '×';
        button.classList.add('button-delete');
        button.onclick = (function(nomeAmigo) {
            return function() {
                excluirAmigo(nomeAmigo);
            };
        })(listaDeAmigos[i]);

        li.appendChild(button);
        lista.appendChild(li);

        setTimeout(() => {
            li.classList.add('is-visible');
        }, 10);
    }
}

function excluirAmigo(nome) {
    let index = listaDeAmigos.indexOf(nome);
    if (index > -1) {
        listaDeAmigos.splice(index, 1);
        
        // Limpar resultado anterior se houver
        if (Object.keys(paresSorteados).length > 0) {
            document.getElementById('resultado').innerHTML = '';
            paresSorteados = {};
        }
        
        exibirListaDeAmigos();
    }
}

function sortearAmigo() {
    if (listaDeAmigos.length < 2) {
        alert('É necessário ter pelo menos 2 amigos para fazer o sorteio!');
        return;
    }

    // Limpar sorteio anterior
    paresSorteados = {};
    
    // Criar uma cópia da lista para manipular
    let amigosSorteados = [...listaDeAmigos];
    let tentativas = 0;
    let maxTentativas = 100;
    
    do {
        paresSorteados = {};
        let amigosPossíveis = [...listaDeAmigos];
        let sorteioValido = true;
        
        for (let i = 0; i < listaDeAmigos.length; i++) {
            let amigoAtual = listaDeAmigos[i];
            
            // Filtrar para não sortear a própria pessoa
            let opcoes = amigosPossíveis.filter(amigo => amigo !== amigoAtual);
            
            if (opcoes.length === 0) {
                sorteioValido = false;
                break;
            }
            
            // Sortear um amigo aleatório das opções disponíveis
            let indiceAleatorio = Math.floor(Math.random() * opcoes.length);
            let amigoSorteado = opcoes[indiceAleatorio];
            
            paresSorteados[amigoAtual] = amigoSorteado;
            
            // Remover o amigo sorteado das opções
            amigosPossíveis = amigosPossíveis.filter(amigo => amigo !== amigoSorteado);
        }
        
        if (sorteioValido) {
            break;
        }
        
        tentativas++;
    } while (tentativas < maxTentativas);
    
    if (tentativas >= maxTentativas) {
        alert('Erro no sorteio. Tente novamente!');
        return;
    }
    
    exibirResultado();
}

function exibirResultado() {
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    // Criar título do resultado
    let titulo = document.createElement('li');
    titulo.textContent = '🎉 Resultado do Sorteio 🎉';
    titulo.style.fontSize = '24px';
    titulo.style.marginBottom = '15px';
    titulo.style.color = '#4B69FD';
    titulo.style.fontWeight = 'bold';
    resultado.appendChild(titulo);
    
    // Mostrar os pares sorteados
    for (let amigo in paresSorteados) {
        let li = document.createElement('li');
        li.textContent = `${capitalizeFirstLetter(amigo)} → ${capitalizeFirstLetter(paresSorteados[amigo])}`;
        li.style.margin = '8px 0';
        li.style.padding = '10px';
        li.style.backgroundColor = '#f0f8ff';
        li.style.borderRadius = '8px';
        li.style.border = '1px solid #4B69FD';
        resultado.appendChild(li);
    }
    
    // Adicionar botão de reiniciar
    let botaoReiniciar = document.createElement('button');
    botaoReiniciar.textContent = '🔄 Novo Sorteio';
    botaoReiniciar.onclick = reiniciar;
    botaoReiniciar.style.marginTop = '20px';
    botaoReiniciar.style.backgroundColor = '#fe652b';
    botaoReiniciar.style.color = 'white';
    botaoReiniciar.style.border = '2px solid #000';
    botaoReiniciar.style.borderRadius = '25px';
    botaoReiniciar.style.padding = '10px 20px';
    botaoReiniciar.style.cursor = 'pointer';
    resultado.appendChild(botaoReiniciar);
}

function reiniciar() {
    listaDeAmigos = [];
    paresSorteados = {};
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').value = '';
    document.getElementById('amigo').focus();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Adicionar evento para pressionar Enter no input
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('amigo').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarAmigo();
        }
    });
});