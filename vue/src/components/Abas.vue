<template>
  <div class="abas">
    <div class="abas-lista" role="tablist" :aria-label="rotulo">
      <button
        v-for="(aba, indice) in abas"
        :key="aba.titulo"
        type="button"
        role="tab"
        class="aba"
        :class="{ ativa: ativa === indice }"
        :id="`${prefixo}-aba-${indice}`"
        :aria-controls="`${prefixo}-painel-${indice}`"
        :aria-selected="ativa === indice"
        @click="ativa = indice"
      >
        {{ aba.titulo }}
      </button>
    </div>
    <div
      v-for="(aba, indice) in abas"
      v-show="ativa === indice"
      :key="aba.titulo"
      class="aba-painel"
      role="tabpanel"
      :id="`${prefixo}-painel-${indice}`"
      :aria-labelledby="`${prefixo}-aba-${indice}`"
    >
      <p v-for="(paragrafo, posicao) in aba.conteudo" :key="posicao">{{ paragrafo }}</p>
    </div>
  </div>
</template>

<script>
let contador = 0

export default {
  name: 'Abas',
  props: {
    abas: { type: Array, required: true },
    rotulo: { type: String, default: '' },
  },
  data() {
    return {
      ativa: 0,
      prefixo: `abas-${++contador}`,
    }
  },
  watch: {
    abas() {
      this.ativa = 0
    },
  },
}
</script>
