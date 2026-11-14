angular
  .module('estante.filtros')

  .filter('tempoLeitura', function () {
    return function (paginas) {
      const numero = Number(paginas);
      if (!numero) return '';

      const horas = Math.ceil(numero / 40);
      return '≈ ' + horas + ' h de leitura';
    };
  })

  .filter('resumo', function () {
    return function (texto, limite) {
      if (!texto) return '';

      limite = limite || 100;
      if (texto.length <= limite) return texto;

      const cortado = texto.slice(0, limite);
      const ultimoEspaco = cortado.lastIndexOf(' ');
      return (ultimoEspaco > 0 ? cortado.slice(0, ultimoEspaco) : cortado) + '…';
    };
  })

  .filter('plural', function () {
    return function (quantidade, singular, plural) {
      return quantidade + ' ' + (quantidade === 1 ? singular : plural);
    };
  });
