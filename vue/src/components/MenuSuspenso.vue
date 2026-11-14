<template>
  <div ref="container" class="menu-suspenso">
    <span class="menu-rotulo" :id="`${prefixo}-rotulo`">{{ rotulo }}</span>
    <button
      ref="botao"
      type="button"
      class="menu-botao"
      aria-haspopup="true"
      :aria-expanded="aberto"
      :aria-controls="`${prefixo}-lista`"
      :aria-labelledby="`${prefixo}-rotulo ${prefixo}-valor`"
      @click="aberto = !aberto"
    >
      <span :id="`${prefixo}-valor`">{{ textoSelecionado }}</span>
      <span class="menu-seta" aria-hidden="true"></span>
    </button>

    <ul v-show="aberto" class="menu-lista" :id="`${prefixo}-lista`">
      <li v-for="opcao in opcoes" :key="opcao.valor">
        <button
          type="button"
          class="menu-opcao"
          :class="{ selecionada: opcao.valor === selecionado }"
          :aria-current="opcao.valor === selecionado ? 'true' : null"
          @click="escolher(opcao)"
        >
          {{ opcao.texto }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
let contador = 0

export default {
  name: 'MenuSuspenso',
  props: {
    rotulo: { type: String, default: '' },
    opcoes: { type: Array, required: true },
    selecionado: { type: [String, Number], default: null },
  },
  emits: ['selecionar'],
  data() {
    return {
      aberto: false,
      prefixo: `menu-${++contador}`,
    }
  },
  computed: {
    textoSelecionado() {
      const opcao = this.opcoes.find((item) => item.valor === this.selecionado)
      return opcao ? opcao.texto : ''
    },
  },
  mounted() {
    document.addEventListener('click', this.aoClicarNoDocumento)
    document.addEventListener('keydown', this.aoApertarTecla)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.aoClicarNoDocumento)
    document.removeEventListener('keydown', this.aoApertarTecla)
  },
  methods: {
    escolher(opcao) {
      this.aberto = false
      this.$emit('selecionar', opcao)
      this.$refs.botao.focus()
    },
    aoClicarNoDocumento(evento) {
      if (this.aberto && !this.$refs.container.contains(evento.target)) {
        this.aberto = false
      }
    },
    aoApertarTecla(evento) {
      if (evento.key === 'Escape' && this.aberto) {
        this.aberto = false
        this.$refs.botao.focus()
      }
    },
  },
}
</script>
