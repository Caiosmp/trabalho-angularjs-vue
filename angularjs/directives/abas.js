angular.module('estante.componentes').directive('abas', function () {
  return {
    restrict: 'E',
    scope: {
      abas: '<',
      rotulo: '@',
    },
    template: `
      <div class="abas">
        <div class="abas-lista" role="tablist" aria-label="{{rotulo}}">
          <button
            type="button"
            role="tab"
            class="aba"
            ng-repeat="aba in abas"
            id="{{prefixo}}-aba-{{$index}}"
            aria-controls="{{prefixo}}-painel-{{$index}}"
            aria-selected="{{ativa === $index}}"
            ng-class="{ ativa: ativa === $index }"
            ng-click="selecionar($index)"
          >{{aba.titulo}}</button>
        </div>
        <div
          class="aba-painel"
          role="tabpanel"
          ng-repeat="aba in abas"
          id="{{prefixo}}-painel-{{$index}}"
          aria-labelledby="{{prefixo}}-aba-{{$index}}"
          ng-show="ativa === $index"
        >
          <p ng-repeat="paragrafo in aba.conteudo track by $index">{{paragrafo}}</p>
        </div>
      </div>
    `,
    controller: [
      '$scope',
      function ($scope) {
        $scope.prefixo = 'abas-' + $scope.$id;
        $scope.ativa = 0;

        $scope.selecionar = function (indice) {
          $scope.ativa = indice;
        };

        $scope.$watch('abas', function () {
          $scope.ativa = 0;
        });
      },
    ],
  };
});
