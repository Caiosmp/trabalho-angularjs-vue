<template>
  <div class="acordeao">
    <div
      v-for="(item, indice) in itens"
      :key="item.titulo"
      class="acordeao-item"
      :class="{ aberto: abertoIndex === indice }"
    >
      <h3>
        <button
          type="button"
          class="acordeao-botao"
          :id="`${prefixo}-botao-${indice}`"
          :aria-expanded="abertoIndex === indice"
          :aria-controls="`${prefixo}-painel-${indice}`"
          @click="alternar(indice)"
        >
          <span>{{ item.titulo }}</span>
          <span class="acordeao-icone" aria-hidden="true"></span>
        </button>
      </h3>
      <div
        class="acordeao-painel"
        :id="`${prefixo}-painel-${indice}`"
        role="region"
        :aria-labelledby="`${prefixo}-botao-${indice}`"
      >
        <div class="acordeao-painel-interno">
          <p>{{ item.conteudo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let contador = 0

export default {
  name: 'Acordeao',
  props: {
    itens: { type: Array, required: true },
  },
  data() {
    return {
      abertoIndex: null,
      prefixo: `acordeao-${++contador}`,
    }
  },
  methods: {
    alternar(indice) {
      this.abertoIndex = this.abertoIndex === indice ? null : indice
    },
  },
}
</script>
