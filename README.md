# Estante

Aplicação para organizar leituras: acompanhar quantas páginas faltam no livro atual, explorar um acervo e ver os detalhes de cada livro.

Atividade de AngularJS (com o desafio extra em Vue.js) da disciplina do Prof. Elton Figueiredo da Silva, Engenharia de Software, UCSAL.

## Componentes

| Componente | Uso na aplicação |
|---|---|
| Barra de Progresso | Páginas lidas do livro atual |
| Menu Suspenso | Filtro do acervo por gênero |
| Paginação | Acervo, com 4 livros por página |
| Abas | Detalhes do livro: Sinopse, Sobre o autor e Ficha técnica |
| Acordeão | Perguntas frequentes |
| Notificação Toast | Avisos de sucesso, erro e informação |

## AngularJS (pasta `angularjs/`)

AngularJS 1.8.3 carregado por CDN. Não precisa instalar nada.

```
angularjs/
├── index.html
├── app.js                          módulo principal
├── style.css
├── controllers/
│   └── principalController.js      estado da página no $scope
├── services/
│   ├── livrosFactory.js            factory: dados e regras de negócio
│   └── toastService.js             service: notificações
├── filters/
│   └── filtros.js                  tempoLeitura, resumo e plural
└── directives/
    ├── barraProgresso.js
    ├── acordeao.js
    ├── abas.js
    ├── paginacao.js
    ├── menuSuspenso.js
    └── notificacoes.js
```

**Como rodar:** abra o `angularjs/index.html` no navegador. Ou, no terminal (inclusive no Codespaces):

```bash
cd angularjs
python3 -m http.server 8000
```

e abra `http://localhost:8000`.

**Conceitos usados:**
- Diretivas com bindings (`<`, `@` e `&`) e controladores
- `$scope` e `ng-model` (two-way data binding no campo de páginas lidas)
- Factory (`livrosFactory`) e service (`toastService`)
- Filtros próprios (`tempoLeitura`, `resumo`, `plural`) e do AngularJS (`number`, `uppercase`, `filter`, `orderBy`, `limitTo`)
- Eventos com `ng-click` e `ng-change`

## Vue.js: desafio extra (pasta `vue/`)

Vue 3 com Vite, usando a Options API.

```
vue/src/
├── App.vue                    componente principal
├── main.js
├── style.css
├── servicos/toast.js          serviço global de notificações ($toast)
├── dados/livros.js
└── components/
    ├── BarraProgresso.vue
    ├── Acordeao.vue
    ├── Abas.vue
    ├── Paginacao.vue
    ├── MenuSuspenso.vue
    └── Notificacoes.vue
```

**Como rodar:**

```bash
cd vue
npm install
npm run dev
```

**Conceitos usados:** props, `data`, `computed`, `methods`, `$emit` (paginação e menu suspenso), `watch` e lifecycle hooks (`created`, `mounted` e `beforeUnmount`).

## Responsividade e acessibilidade

- No celular, tudo fica em uma coluna. No computador, o quadro "Lendo agora" vira uma coluna lateral.
- Tags semânticas (`header`, `main`, `aside`, `section`, `nav`, `footer`) e atributos ARIA em todos os componentes.
- Navegação por teclado, contorno de foco visível e menu suspenso que fecha com Esc.
- Animações desligadas para quem ativou "reduzir movimento" no sistema.

Os livros exibidos são apenas exemplos.
