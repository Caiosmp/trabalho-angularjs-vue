angular.module('estante.componentes').directive('barraProgresso', function () {
  return {
    restrict: 'E',
    scope: {
      valor: '<',
      rotulo: '@',
    },
    template: `
      <div class="progresso">
        <div class="progresso-topo">
          <span id="{{idRotulo}}">{{rotulo}}</span>
          <strong>{{porcentagem()}}%</strong>
        </div>
        <div
          class="progresso-trilho"
          role="progressbar"
          aria-labelledby="{{idRotulo}}"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="{{porcentagem()}}"
        >
          <div
            class="progresso-preenchimento"
            ng-class="{ completo: porcentagem() === 100 }"
            ng-style="{ width: porcentagem() + '%' }"
          ></div>
        </div>
      </div>
    `,
    controller: [
      '$scope',
      function ($scope) {
        $scope.idRotulo = 'progresso-' + $scope.$id;

        $scope.porcentagem = function () {
          const numero = Number($scope.valor) || 0;
          return Math.round(Math.min(100, Math.max(0, numero)));
        };
      },
    ],
  };
});
