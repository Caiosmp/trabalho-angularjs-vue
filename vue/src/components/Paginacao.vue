<template>
  <nav v-if="totalPaginas > 1" class="paginacao" aria-label="Paginação">
    <button
      type="button"
      class="pagina-botao"
      :disabled="paginaAtual === 1"
      @click="irPara(paginaAtual - 1)"
    >
      ‹ Anterior
    </button>

    <ul class="paginacao-lista">
      <li v-for="numero in paginas" :key="numero">
        <button
          type="button"
          class="pagina-botao"
          :class="{ atual: numero === paginaAtual }"
          :aria-label="`Página ${numero}`"
          :aria-current="numero === paginaAtual ? 'page' : null"
          @click="irPara(numero)"
        >
          {{ numero }}
        </button>
      </li>
    </ul>

    <button
      type="button"
      class="pagina-botao"
      :disabled="paginaAtual === totalPaginas"
      @click="irPara(paginaAtual + 1)"
    >
      Próxima ›
    </button>
  </nav>
</template>

<script>
export default {
  name: 'Paginacao',
  props: {
    totalPaginas: { type: Number, required: true },
    paginaAtual: { type: Number, required: true },
  },
  emits: ['mudar'],
  computed: {
    paginas() {
      return Array.from({ length: this.totalPaginas }, (_, indice) => indice + 1)
    },
  },
  methods: {
    irPara(numero) {
      if (numero < 1 || numero > this.totalPaginas || numero === this.paginaAtual) return
      this.$emit('mudar', numero)
    },
  },
}
</script>
