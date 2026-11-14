angular.module('estante.servicos', []);
angular.module('estante.filtros', []);
angular.module('estante.componentes', ['estante.servicos']);
angular.module('estante.controladores', ['estante.servicos', 'estante.filtros']);

angular
  .module('estanteApp', [
    'estante.servicos',
    'estante.filtros',
    'estante.componentes',
    'estante.controladores',
  ])
  .constant('LIVROS_POR_PAGINA', 4);
