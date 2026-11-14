angular.module('estante.servicos').service('toastService', [
  '$timeout',
  function ($timeout) {
    const servico = this;
    let proximoId = 1;

    servico.lista = [];

    servico.mostrar = function (tipo, mensagem, duracao) {
      const toast = {
        id: proximoId++,
        tipo: tipo,
        mensagem: mensagem,
        duracao: duracao || 4000,
      };

      servico.lista.push(toast);

      $timeout(function () {
        servico.remover(toast.id);
      }, toast.duracao);
    };

    servico.remover = function (id) {
      const indice = servico.lista.findIndex(function (toast) {
        return toast.id === id;
      });

      if (indice !== -1) {
        servico.lista.splice(indice, 1);
      }
    };
  },
]);
