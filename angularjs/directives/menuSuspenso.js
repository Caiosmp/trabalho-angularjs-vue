angular.module('estante.componentes').directive('menuSuspenso', [
  '$document',
  function ($document) {
    return {
      restrict: 'E',
      scope: {
        rotulo: '@',
        opcoes: '<',
        selecionado: '<',
        aoSelecionar: '&',
      },
      template: `
        <div class="menu-suspenso">
          <span class="menu-rotulo" id="{{prefixo}}-rotulo">{{rotulo}}</span>
          <button
            type="button"
            class="menu-botao"
            aria-haspopup="true"
            aria-expanded="{{aberto}}"
            aria-controls="{{prefixo}}-lista"
            aria-labelledby="{{prefixo}}-rotulo {{prefixo}}-valor"
            ng-click="alternar()"
          >
            <span id="{{prefixo}}-valor">{{textoSelecionado()}}</span>
            <span class="menu-seta" aria-hidden="true"></span>
          </button>
          <ul class="menu-lista" id="{{prefixo}}-lista" ng-show="aberto">
            <li ng-repeat="opcao in opcoes">
              <button
                type="button"
                class="menu-opcao"
                ng-class="{ selecionada: opcao.valor === selecionado }"
                ng-attr-aria-current="{{opcao.valor === selecionado ? 'true' : undefined}}"
                ng-click="escolher(opcao)"
              >{{opcao.texto}}</button>
            </li>
          </ul>
        </div>
      `,
      link: function (scope, elemento) {
        const botao = elemento[0].querySelector('.menu-botao');

        scope.prefixo = 'menu-' + scope.$id;
        scope.aberto = false;

        scope.textoSelecionado = function () {
          const opcao = (scope.opcoes || []).find(function (item) {
            return item.valor === scope.selecionado;
          });
          return opcao ? opcao.texto : '';
        };

        scope.alternar = function () {
          scope.aberto = !scope.aberto;
        };

        scope.escolher = function (opcao) {
          scope.aberto = false;
          scope.aoSelecionar({ opcao: opcao });
          botao.focus();
        };

        function aoClicarNoDocumento(evento) {
          if (!scope.aberto || elemento[0].contains(evento.target)) return;
          scope.$apply(function () {
            scope.aberto = false;
          });
        }

        function aoApertarTecla(evento) {
          if (evento.key !== 'Escape' || !scope.aberto) return;
          scope.$apply(function () {
            scope.aberto = false;
          });
          botao.focus();
        }

        $document.on('click', aoClicarNoDocumento);
        $document.on('keydown', aoApertarTecla);

        scope.$on('$destroy', function () {
          $document.off('click', aoClicarNoDocumento);
          $document.off('keydown', aoApertarTecla);
        });
      },
    };
  },
]);
