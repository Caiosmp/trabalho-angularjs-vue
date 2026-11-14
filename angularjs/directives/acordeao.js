angular.module('estante.componentes').directive('acordeao', function () {
  return {
    restrict: 'E',
    scope: {
      itens: '<',
    },
    template: `
      <div class="acordeao">
        <div
          class="acordeao-item"
          ng-repeat="item in itens"
          ng-class="{ aberto: estaAberto($index) }"
        >
          <h3>
            <button
              type="button"
              class="acordeao-botao"
              id="{{prefixo}}-botao-{{$index}}"
              aria-expanded="{{estaAberto($index)}}"
              aria-controls="{{prefixo}}-painel-{{$index}}"
              ng-click="alternar($index)"
            >
              <span>{{item.titulo}}</span>
              <span class="acordeao-icone" aria-hidden="true"></span>
            </button>
          </h3>
          <div
            class="acordeao-painel"
            id="{{prefixo}}-painel-{{$index}}"
            role="region"
            aria-labelledby="{{prefixo}}-botao-{{$index}}"
          >
            <div class="acordeao-painel-interno">
              <p>{{item.conteudo}}</p>
            </div>
          </div>
        </div>
      </div>
    `,
    controller: [
      '$scope',
      function ($scope) {
        $scope.prefixo = 'acordeao-' + $scope.$id;
        $scope.abertoIndex = null;

        $scope.estaAberto = function (indice) {
          return $scope.abertoIndex === indice;
        };

        $scope.alternar = function (indice) {
          $scope.abertoIndex = $scope.abertoIndex === indice ? null : indice;
        };
      },
    ],
  };
});
