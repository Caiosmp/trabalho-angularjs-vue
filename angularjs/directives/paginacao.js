angular.module('estante.componentes').directive('paginacao', function () {
  return {
    restrict: 'E',
    scope: {
      totalPaginas: '<',
      paginaAtual: '<',
      aoMudar: '&',
    },
    template: `
      <nav class="paginacao" aria-label="Paginação" ng-if="totalPaginas > 1">
        <button
          type="button"
          class="pagina-botao"
          ng-click="irPara(paginaAtual - 1)"
          ng-disabled="paginaAtual === 1"
        >‹ Anterior</button>

        <ul class="paginacao-lista">
          <li ng-repeat="numero in paginas">
            <button
              type="button"
              class="pagina-botao"
              ng-class="{ atual: numero === paginaAtual }"
              aria-label="Página {{numero}}"
              ng-attr-aria-current="{{numero === paginaAtual ? 'page' : undefined}}"
              ng-click="irPara(numero)"
            >{{numero}}</button>
          </li>
        </ul>

        <button
          type="button"
          class="pagina-botao"
          ng-click="irPara(paginaAtual + 1)"
          ng-disabled="paginaAtual === totalPaginas"
        >Próxima ›</button>
      </nav>
    `,
    controller: [
      '$scope',
      function ($scope) {
        $scope.$watch('totalPaginas', function (total) {
          $scope.paginas = [];
          for (let numero = 1; numero <= (total || 0); numero++) {
            $scope.paginas.push(numero);
          }
        });

        $scope.irPara = function (numero) {
          if (numero < 1 || numero > $scope.totalPaginas || numero === $scope.paginaAtual) {
            return;
          }
          $scope.aoMudar({ pagina: numero });
        };
      },
    ],
  };
});
