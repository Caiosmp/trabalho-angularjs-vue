angular.module('estante.componentes').directive('notificacoes', [
  'toastService',
  function (toastService) {
    return {
      restrict: 'E',
      scope: {},
      template: `
        <div class="toasts" aria-live="polite">
          <div
            class="toast"
            ng-repeat="toast in lista track by toast.id"
            ng-class="'toast-' + toast.tipo"
          >
            <span class="toast-icone" aria-hidden="true">{{icones[toast.tipo]}}</span>
            <p class="toast-mensagem">{{toast.mensagem}}</p>
            <button
              type="button"
              class="toast-fechar"
              aria-label="Fechar notificação"
              ng-click="fechar(toast.id)"
            >×</button>
          </div>
        </div>
      `,
      controller: [
        '$scope',
        function ($scope) {
          $scope.lista = toastService.lista;
          $scope.fechar = toastService.remover;
          $scope.icones = { sucesso: '✓', erro: '!', info: 'i' };
        },
      ],
    };
  },
]);
