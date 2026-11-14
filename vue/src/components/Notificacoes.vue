<template>
  <div class="toasts" aria-live="polite">
    <div
      v-for="item in lista"
      :key="item.id"
      class="toast"
      :class="`toast-${item.tipo}`"
    >
      <span class="toast-icone" aria-hidden="true">{{ icones[item.tipo] }}</span>
      <p class="toast-mensagem">{{ item.mensagem }}</p>
      <button
        type="button"
        class="toast-fechar"
        aria-label="Fechar notificação"
        @click="$toast.remover(item.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notificacoes',
  data() {
    return {
      icones: { sucesso: '✓', erro: '!', info: 'i' },
    }
  },
  computed: {
    lista() {
      return this.$toast.lista
    },
  },
}
</script>
