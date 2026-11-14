import { reactive } from 'vue'

let proximoId = 1

export const toast = reactive({
  lista: [],

  mostrar(tipo, mensagem, duracao = 4000) {
    const id = proximoId++
    this.lista.push({ id, tipo, mensagem, duracao })

    setTimeout(() => this.remover(id), duracao)
  },

  remover(id) {
    const indice = this.lista.findIndex((item) => item.id === id)
    if (indice !== -1) this.lista.splice(indice, 1)
  },
})
