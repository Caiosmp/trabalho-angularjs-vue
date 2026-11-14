<template>
  <div class="progresso">
    <div class="progresso-topo">
      <span :id="idRotulo">{{ rotulo }}</span>
      <strong>{{ porcentagem }}%</strong>
    </div>
    <div
      class="progresso-trilho"
      role="progressbar"
      :aria-labelledby="idRotulo"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="porcentagem"
    >
      <div
        class="progresso-preenchimento"
        :class="{ completo: porcentagem === 100 }"
        :style="{ width: porcentagem + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
let contador = 0

export default {
  name: 'BarraProgresso',
  props: {
    valor: { type: Number, default: 0 },
    rotulo: { type: String, default: '' },
  },
  data() {
    return { idRotulo: `progresso-${++contador}` }
  },
  computed: {
    porcentagem() {
      const numero = Number(this.valor) || 0
      return Math.round(Math.min(100, Math.max(0, numero)))
    },
  },
}
</script>
