angular.module('estante.controladores').controller('PrincipalController', [
  '$scope',
  '$filter',
  '$document',
  '$timeout',
  'livrosFactory',
  'toastService',
  'LIVROS_POR_PAGINA',
  function ($scope, $filter, $document, $timeout, livrosFactory, toastService, LIVROS_POR_PAGINA) {
    const todosOsLivros = livrosFactory.listar();

    $scope.leitura = {
      livro: livrosFactory.buscarPorId(3),
      paginasLidas: 120,
      concluido: false,
    };

    $scope.progressoLeitura = function () {
      return livrosFactory.calcularProgresso($scope.leitura.paginasLidas, $scope.leitura.livro.paginas);
    };

    $scope.aoMudarPaginas = function () {
      const total = $scope.leitura.livro.paginas;
      const valor = $scope.leitura.paginasLidas;

      if (valor === null || valor === undefined || valor === '') return;

      if (valor < 0) {
        $scope.leitura.paginasLidas = 0;
        toastService.mostrar('erro', 'O número de páginas não pode ser negativo.');
        return;
      }

      if (valor > total) {
        $scope.leitura.paginasLidas = total;
        toastService.mostrar('erro', 'Esse livro tem só ' + total + ' páginas.');
      }

      verificarConclusao();
    };

    $scope.avancarPaginas = function (quantidade) {
      const total = $scope.leitura.livro.paginas;
      const atual = Number($scope.leitura.paginasLidas) || 0;
      $scope.leitura.paginasLidas = Math.min(total, atual + quantidade);
      verificarConclusao();
    };

    function verificarConclusao() {
      const leitura = $scope.leitura;
      if (leitura.concluido || leitura.paginasLidas < leitura.livro.paginas) return;

      leitura.concluido = true;
      toastService.mostrar('sucesso', 'Parabéns! Você terminou “' + leitura.livro.titulo + '”.');
    }

    $scope.lerLivro = function (livro) {
      if ($scope.leitura.livro.id === livro.id) {
        toastService.mostrar('info', 'Você já está lendo “' + livro.titulo + '”.');
        return;
      }

      $scope.leitura = { livro: livro, paginasLidas: 0, concluido: false };
      toastService.mostrar('sucesso', 'Agora você está lendo “' + livro.titulo + '”.');
    };

    $scope.generoSelecionado = 'Todos';
    $scope.paginaAtual = 1;

    $scope.opcoesGenero = [{ valor: 'Todos', texto: 'Todos os gêneros' }].concat(
      livrosFactory.listarGeneros().map(function (genero) {
        return { valor: genero, texto: genero };
      })
    );

    function compararTexto(a, b) {
      return String(a.value).localeCompare(String(b.value), 'pt-BR');
    }

    function atualizarLista() {
      let lista = todosOsLivros;

      if ($scope.generoSelecionado !== 'Todos') {
        lista = $filter('filter')(lista, { genero: $scope.generoSelecionado }, true);
      }

      lista = $filter('orderBy')(lista, 'titulo', false, compararTexto);

      $scope.livrosFiltrados = lista;
      $scope.totalPaginas = Math.max(1, Math.ceil(lista.length / LIVROS_POR_PAGINA));

      if ($scope.paginaAtual > $scope.totalPaginas) {
        $scope.paginaAtual = $scope.totalPaginas;
      }

      $scope.inicio = ($scope.paginaAtual - 1) * LIVROS_POR_PAGINA;
      $scope.livrosDaPagina = $filter('limitTo')(lista, LIVROS_POR_PAGINA, $scope.inicio);
    }

    $scope.filtrarPorGenero = function (opcao) {
      $scope.generoSelecionado = opcao.valor;
      $scope.paginaAtual = 1;
      atualizarLista();

      const quantidade = $scope.livrosFiltrados.length;
      toastService.mostrar(
        'info',
        $filter('plural')(quantidade, 'livro encontrado', 'livros encontrados') + '.'
      );
    };

    $scope.irParaPagina = function (pagina) {
      $scope.paginaAtual = pagina;
      atualizarLista();
    };

    function montarAbas(livro) {
      return [
        { titulo: 'Sinopse', conteudo: [livro.sinopse] },
        { titulo: 'Sobre o autor', conteudo: [livro.sobreAutor] },
        {
          titulo: 'Ficha técnica',
          conteudo: [
            'Autor: ' + livro.autor,
            'Ano de publicação: ' + livro.ano,
            'Gênero: ' + livro.genero,
            'Páginas: ' + $filter('number')(livro.paginas),
            'Tempo estimado: ' + $filter('tempoLeitura')(livro.paginas),
          ],
        },
      ];
    }

    $scope.selecionarLivro = function (livro, rolarAteDetalhes) {
      $scope.livroSelecionado = livro;
      $scope.abasDetalhe = montarAbas(livro);

      if (rolarAteDetalhes) {
        $timeout(function () {
          const secao = $document[0].getElementById('detalhes');
          if (secao && secao.scrollIntoView) {
            secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
            secao.focus({ preventScroll: true });
          }
        });
      }
    };

    $scope.perguntas = livrosFactory.perguntasFrequentes();

    atualizarLista();
    $scope.selecionarLivro($scope.leitura.livro, false);
  },
]);
