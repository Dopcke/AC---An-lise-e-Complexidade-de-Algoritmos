# AC- Análise e Complexidade de Algoritmos

## Integrantes do Grupo

- Daniel Studart Hipólito da Costa - Matrícula: 202202756857
- Felipe Ultramar Gonçalves Valadão - 202201383852
- João Paulo Dopcke de Vasconcellos - Matrícula: 202201038926
- Nicholas Pedro Gonçalves Victorino - Matrícula: 202203813021

## Informações do Curso

- **Curso:** ENGENHARIA DA COMPUTAÇÃO
- **Disciplina:** Análise e Complexidade de Algoritmos
- **Professor:** Cassius Figueiredo 
## Sobre a Aplicação

Esta aplicação web/stand-alone foi desenvolvida como parte da avaliação da disciplina de Análise e Complexidade de Algoritmos. Ela permite ao usuário inserir um grafo por meio de uma lista de adjacência, visualizá-lo como uma matriz de adjacência e executar os algoritmos de busca em largura (BFS) e busca em profundidade (DFS) sobre ele.

### Funcionalidades Implementadas:

1.  **Entrada do Grafo:** O usuário pode inserir um grafo no formato de lista de adjacência textual. Cada linha deve representar um vértice seguido por seus vizinhos, separados por espaços. Por exemplo:
    ```
    A B C
    B A D
    C A
    D B
    E F
    F E
    ```
    (No exemplo acima, A é adjacente a B e C; B é adjacente a A e D, etc.).

2.  **Armazenamento e Visualização:** O grafo inserido é armazenado internamente como uma **matriz de adjacência**. Essa matriz é exibida na interface para que o usuário possa verificar a estrutura do grafo.

3.  **Algoritmos de Busca:**
    * **DFS (Busca em Profundidade):** O usuário pode executar o DFS a partir de um nó inicial especificado. O resultado exibe a ordem de visitação dos nós e a estrutura da árvore de busca gerada (indicando o pai de cada nó na travessia).
    * **BFS (Busca em Largura):** O usuário pode executar o BFS a partir de um nó inicial especificado. O resultado exibe a ordem de visitação, a estrutura da árvore de busca (pais) e a distância de cada nó visitado em relação ao nó inicial.

4.  **Interface:** A aplicação possui uma interface front-end simples com:
    * Uma área de texto para entrada do grafo.
    * Botões para executar DFS e BFS.
    * Uma área para visualização da matriz de adjacência do grafo.
    * Uma área para exibição dos resultados dos algoritmos.
    * Um botão para "Finalizar Aplicação", que limpa os campos de entrada e saída, permitindo novas execuções.

### Linguagens e Tecnologias Utilizadas:

- HTML5
- CSS3
- JavaScript (ES6+)

## Instruções Detalhadas para Execução

1.  **Pré-requisitos:** Um navegador web moderno (Google Chrome, Firefox, Edge, etc.).
2.  **Como Executar:**
   - a. Clone este repositório Git ou baixe os arquivos (`index.html`, `style.css`, `script.js`).
   - b. Abra o arquivo `index.html` diretamente no seu navegador web.
3.  **Utilizando a Aplicação:**
   - a. No campo de texto "Digite o grafo como lista de adjacência...", insira o grafo desejado. Por exemplo, para o primeiro grafo de teste:
       ```
       A B E
       B A C E
       C B F
       D G H
       E A B F
       F C E I
       G D H
       H D G
       I F

       ```
       Para o segundo grafo de teste:
       ```
       A B F
       B C E
       C D 
       D B H
       E D G
       F E G 
       G F
       H G
      
       ```
   - b. Clique em "Executar DFS" ou "Executar BFS".
   - c. Você será solicitado a inserir o nó inicial para a busca (ex: "A").
   - d. A matriz de adjacência do grafo inserido será exibida, seguida pelo resultado do algoritmo escolhido.
   - e. Para limpar a tela e inserir um novo grafo, clique em "Finalizar Aplicação".
