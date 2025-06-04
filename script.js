let grafo = [];
let vertices = [];
let adjMatrixString = "Nenhum grafo inserido ou grafo inválido."; // String para armazenar a matriz formatada

// Função para ler o grafo do textarea
function lerGrafo() {
    const input = document.getElementById('grafo-input').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    const matrizAdjDiv = document.getElementById('matriz-adj');

    vertices = []; // Limpa vértices anteriores
    grafo = [];    // Limpa grafo anterior
    
    if (!input) {
        adjMatrixString = 'Nenhum grafo inserido.';
        matrizAdjDiv.textContent = adjMatrixString;
        resultadoDiv.textContent = ''; // Limpa resultados anteriores
        return false; // Indica que o grafo não pôde ser lido
    }

    const linhas = input.split('\n').filter(linha => linha.trim() !== '');
    let tempIndices = {};
    const todosOsNos = new Set();

    // Primeira passada: coletar todos os vértices únicos
    linhas.forEach(linha => {
        const nos = linha.split(' ').map(n => n.trim()).filter(n => n !== '');
        if (nos.length > 0) {
            nos.forEach(no => todosOsNos.add(no));
        }
    });

    vertices = Array.from(todosOsNos).sort(); // Ordena para consistência
    vertices.forEach((vertice, index) => {
        tempIndices[vertice] = index;
    });

    if (vertices.length === 0) {
        adjMatrixString = 'Formato de grafo inválido ou vazio.';
        matrizAdjDiv.textContent = adjMatrixString;
        resultadoDiv.textContent = '';
        return false;
    }

    grafo = Array(vertices.length).fill(null).map(() => Array(vertices.length).fill(0));

    // Segunda passada: popular a matriz de adjacência
    linhas.forEach(linha => {
        const nos = linha.split(' ').map(n => n.trim()).filter(n => n !== '');
        if (nos.length > 0) {
            const verticePrincipal = nos[0];
            const vIndex = tempIndices[verticePrincipal];

            if (vIndex === undefined) return; // Deveria ser raro com a coleta acima

            for (let i = 1; i < nos.length; i++) {
                const vizinho = nos[i];
                const vizinhoIndex = tempIndices[vizinho];
                if (vizinhoIndex !== undefined) {
                    grafo[vIndex][vizinhoIndex] = 1;
                    // Se o grafo for não-direcionado e a entrada é apenas A -> B,
                    // você pode adicionar a linha abaixo para garantir B -> A.
                    // grafo[vizinhoIndex][vIndex] = 1; 
                    // No entanto, é mais comum que a entrada já represente isso.
                }
            }
        }
    });
    apresentarGrafo();
    return true; // Indica que o grafo foi lido com sucesso
}

// Função para apresentar a matriz de adjacência no front-end
function apresentarGrafo() {
    const matrizAdjDiv = document.getElementById('matriz-adj');
    if (vertices.length === 0 || grafo.length === 0) {
        adjMatrixString = 'Nenhum grafo para apresentar ou grafo vazio.';
        matrizAdjDiv.textContent = adjMatrixString;
        return;
    }

    let output = "    " + vertices.join("  ") + "\n"; // Mais espaço para melhor visualização
    output += "   " + vertices.map(v => "--").join("-") + "-\n"; // Linha separadora
    for (let i = 0; i < grafo.length; i++) {
        output += vertices[i] + " | " + grafo[i].join("  ") + "\n"; // Mais espaço
    }
    adjMatrixString = output; // Salva a string da matriz
    matrizAdjDiv.textContent = adjMatrixString;
}

// DFS (Busca em Profundidade)
function dfs(grafoAtual, inicioLabel) {
    const inicioIndex = vertices.indexOf(inicioLabel);
    if (inicioIndex === -1) {
        return { visitados: [], pais: {}, error: `Nó inicial "${inicioLabel}" não encontrado no grafo.` };
    }

    let visitado = Array(vertices.length).fill(false);
    let pilha = [inicioIndex]; // Usar índices na pilha
    let resultadoVisita = [];
    let pais = {};
    // pais[inicioLabel] = null; // O nó inicial não tem pai na árvore DFS

    while (pilha.length > 0) {
        let vIndex = pilha.pop(); // Índice do vértice atual

        if (!visitado[vIndex]) {
            visitado[vIndex] = true;
            let verticeLabel = vertices[vIndex];
            resultadoVisita.push(verticeLabel);

            // Adiciona vizinhos à pilha (em ordem reversa para processar em "ordem alfabética" se os vértices são letras e ordenados)
            for (let i = grafoAtual[vIndex].length - 1; i >= 0; i--) {
                if (grafoAtual[vIndex][i] === 1 && !visitado[i]) {
                    pilha.push(i);
                    pais[vertices[i]] = verticeLabel; // Define o pai do vizinho
                }
            }
        }
    }
    return { visitados: resultadoVisita, pais: pais, error: null };
}

// BFS (Busca em Largura)
function bfs(grafoAtual, inicioLabel) {
    const inicioIndex = vertices.indexOf(inicioLabel);
    if (inicioIndex === -1) {
        return { visitados: [], pais: {}, distancias: {}, error: `Nó inicial "${inicioLabel}" não encontrado no grafo.` };
    }

    let visitado = Array(vertices.length).fill(false);
    let fila = [inicioIndex]; // Usar índices na fila
    let resultadoVisita = [];
    let pais = {};
    let distancias = {};

    visitado[inicioIndex] = true;
    distancias[inicioLabel] = 0;
    // pais[inicioLabel] = null; // O nó inicial não tem pai na árvore BFS
    resultadoVisita.push(inicioLabel);

    let head = 0;
    while (head < fila.length) { // Usando head para simular queue sem shift (mais eficiente para arrays grandes)
        let vIndex = fila[head++]; // Índice do vértice atual
        let verticeAtualLabel = vertices[vIndex];

        for (let i = 0; i < grafoAtual[vIndex].length; i++) {
            if (grafoAtual[vIndex][i] === 1 && !visitado[i]) {
                visitado[i] = true;
                let vizinhoLabel = vertices[i];
                fila.push(i);
                resultadoVisita.push(vizinhoLabel);
                pais[vizinhoLabel] = verticeAtualLabel;
                distancias[vizinhoLabel] = distancias[verticeAtualLabel] + 1;
            }
        }
    }
    return { visitados: resultadoVisita, pais: pais, distancias: distancias, error: null };
}

// Executa o DFS
function executarDFS() {
    const resultadoDiv = document.getElementById('resultado');
    if (!lerGrafo() || vertices.length === 0) {
        resultadoDiv.innerText = 'Por favor, insira um grafo válido primeiro.';
        return;
    }

    let inicio = prompt("Digite o nó inicial para DFS (Ex: A):");
    if (!inicio) {
        resultadoDiv.innerText = 'Execução do DFS cancelada pelo usuário.';
        return;
    }
    inicio = inicio.trim();

    let resultadoDFS = dfs(grafo, inicio);
    let output = ""; // Não precisa mostrar a matriz aqui de novo, já está visível

    if (resultadoDFS.error) {
        output += `Erro no DFS: ${resultadoDFS.error}`;
    } else {
        output += `Resultado DFS a partir de "${inicio}":\n`;
        output += `Ordem de visita: ${resultadoDFS.visitados.join(' -> ')}\n\n`;
        output += "Estrutura da árvore DFS (nó: pai):\n";
        if (Object.keys(resultadoDFS.pais).length === 0 && resultadoDFS.visitados.length > 0) {
            output += `  ${resultadoDFS.visitados[0]}: (raiz, sem outros nós alcançados ou grafo de um nó)\n`;
        } else if (Object.keys(resultadoDFS.pais).length === 0 && resultadoDFS.visitados.length === 0 && vertices.includes(inicio)) {
             output += `  ${inicio}: (raiz, não conectado a outros nós ou único nó no componente)\n`;
        } else {
             resultadoDFS.visitados.forEach(node => {
                if (node === inicio) {
                    output += `  ${node}: (raiz da busca)\n`;
                } else if (resultadoDFS.pais[node]) {
                    output += `  ${node}: ${resultadoDFS.pais[node]}\n`;
                }
                // Nós não alcançados não terão pais listados
            });
        }
    }
    resultadoDiv.innerText = output;
}

// Executa o BFS
function executarBFS() {
    const resultadoDiv = document.getElementById('resultado');
    if (!lerGrafo() || vertices.length === 0) {
        resultadoDiv.innerText = 'Por favor, insira um grafo válido primeiro.';
        return;
    }

    let inicio = prompt("Digite o nó inicial para BFS (Ex: A):");
    if (!inicio) {
        resultadoDiv.innerText = 'Execução do BFS cancelada pelo usuário.';
        return;
    }
    inicio = inicio.trim();
    
    let resultadoBFS = bfs(grafo, inicio);
    let output = ""; // Não precisa mostrar a matriz aqui de novo

    if (resultadoBFS.error) {
        output += `Erro no BFS: ${resultadoBFS.error}`;
    } else {
        output += `Resultado BFS a partir de "${inicio}":\n`;
        output += `Ordem de visita: ${resultadoBFS.visitados.join(' -> ')}\n\n`;
        output += "Estrutura da árvore BFS (nó: (pai, distância)):\n";
         if (Object.keys(resultadoBFS.distancias).length === 0 && vertices.includes(inicio)) {
            output += `  ${inicio}: (raiz, 0) - Único nó ou não conectado\n`;
        } else {
            resultadoBFS.visitados.forEach(node => {
                const pai = resultadoBFS.pais[node] || '(raiz da busca)';
                const dist = resultadoBFS.distancias[node];
                if (node === inicio) {
                     output += `  ${node}: (raiz da busca, ${dist})\n`;
                } else {
                    output += `  ${node}: (${pai}, ${dist})\n`;
                }
            });
        }
    }
    resultadoDiv.innerText = output;
}

// Finaliza a aplicação (limpa campos)
function finalizarAplicacao() {
    document.getElementById('grafo-input').value = '';
    document.getElementById('resultado').innerText = '';
    adjMatrixString = 'Nenhum grafo inserido.';
    document.getElementById('matriz-adj').textContent = adjMatrixString;
    grafo = [];
    vertices = [];
    // Adiciona uma mensagem indicando que foi limpo
    document.getElementById('resultado').innerText = 'Campos limpos. Insira um novo grafo para começar.';
}

// Inicializa a exibição do grafo ao carregar a página (mostra a mensagem inicial)
document.addEventListener('DOMContentLoaded', (event) => {
    apresentarGrafo(); // Para mostrar "Nenhum grafo inserido" inicialmente
    document.getElementById('resultado').innerText = 'Aguardando entrada do grafo e execução do algoritmo.';
});