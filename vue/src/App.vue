<template>
  <header class="cabecalho">
    <div class="cabecalho-interno">
      <h1 class="marca">Estante</h1>
      <p class="cabecalho-frase">Organize as suas leituras</p>
    </div>
  </header>

  <main class="pagina">
    <aside class="lateral" aria-labelledby="titulo-leitura">
      <p class="sobretitulo">Lendo agora</p>
      <h2 id="titulo-leitura">{{ leitura.livro.titulo }}</h2>
      <p class="texto-suave">{{ leitura.livro.autor }}</p>

      <BarraProgresso
        :valor="progressoLeitura"
        :rotulo="`${leitura.paginasLidas || 0} de ${leitura.livro.paginas} páginas`"
      />

      <label for="paginas-lidas">Páginas lidas</label>
      <div class="leitura-controles">
        <input
          id="paginas-lidas"
          v-model.number="leitura.paginasLidas"
          type="number"
          min="0"
          :max="leitura.livro.paginas"
          @change="aoMudarPaginas"
        />
        <button
          type="button"
          class="botao"
          :disabled="leitura.concluido"
          @click="avancarPaginas(10)"
        >
          +10 páginas
        </button>
      </div>

      <p v-if="leitura.concluido" class="status">Livro concluído! Escolha o próximo no acervo.</p>
      <p v-else class="status">
        Faltam {{ paginasRestantes }} páginas ({{ tempoLeitura(paginasRestantes) }}).
      </p>
    </aside>

    <div class="principal">
      <section id="acervo" class="secao" aria-labelledby="titulo-acervo">
        <div class="secao-topo">
          <div>
            <h2 id="titulo-acervo">Acervo</h2>
            <p class="texto-suave">Livros disponíveis para a sua próxima leitura.</p>
          </div>
          <MenuSuspenso
            rotulo="Gênero"
            :opcoes="opcoesGenero"
            :selecionado="generoSelecionado"
            @selecionar="filtrarPorGenero"
          />
        </div>

        <ul class="lista-livros">
          <li v-for="livro in livrosDaPagina" :key="livro.id" class="livro">
            <div class="livro-info">
              <p class="etiqueta">{{ livro.genero.toUpperCase() }}</p>
              <h3>{{ livro.titulo }}</h3>
              <p class="texto-suave">{{ livro.autor }} · {{ livro.ano }}</p>
              <p class="livro-sinopse">{{ resumo(livro.sinopse, 90) }}</p>
              <p class="livro-meta">{{ livro.paginas }} páginas · {{ tempoLeitura(livro.paginas) }}</p>
            </div>
            <button type="button" class="botao botao-contorno" @click="selecionarLivro(livro, true)">
              Ver detalhes
            </button>
          </li>
        </ul>

        <p class="resumo" aria-live="polite">
          Mostrando {{ inicio + 1 }}–{{ inicio + livrosDaPagina.length }} de
          {{ plural(livrosFiltrados.length, 'livro', 'livros') }}
        </p>

        <Paginacao
          :total-paginas="totalPaginas"
          :pagina-atual="paginaAtual"
          @mudar="paginaAtual = $event"
        />
      </section>

      <section
        id="detalhes"
        ref="detalhes"
        class="secao"
        tabindex="-1"
        aria-labelledby="titulo-detalhes"
      >
        <p class="sobretitulo">Detalhes do livro</p>
        <h2 id="titulo-detalhes">{{ livroSelecionado.titulo }}</h2>
        <p class="texto-suave">{{ livroSelecionado.autor }} · {{ livroSelecionado.ano }}</p>

        <Abas :abas="abasDetalhe" :rotulo="`Informações sobre ${livroSelecionado.titulo}`" />

        <button type="button" class="botao" @click="lerLivro(livroSelecionado)">Começar a ler</button>
      </section>

      <section class="secao" aria-labelledby="titulo-faq">
        <h2 id="titulo-faq">Perguntas frequentes</h2>
        <Acordeao :itens="perguntas" />
      </section>
    </div>
  </main>

  <footer class="rodape">
    <p>Estante · Projeto acadêmico de Vue.js · Engenharia de Software, UCSAL</p>
  </footer>

  <Notificacoes />
</template>

<script>
import BarraProgresso from './components/BarraProgresso.vue'
import Acordeao from './components/Acordeao.vue'
import Abas from './components/Abas.vue'
import Paginacao from './components/Paginacao.vue'
import MenuSuspenso from './components/MenuSuspenso.vue'
import Notificacoes from './components/Notificacoes.vue'
import {
  livros,
  generos,
  perguntas,
  calcularProgresso,
  tempoLeitura,
  resumo,
  plural,
} from './dados/livros'

const LIVROS_POR_PAGINA = 4

export default {
  name: 'App',
  components: { BarraProgresso, Acordeao, Abas, Paginacao, MenuSuspenso, Notificacoes },

  data() {
    return {
      livros: [],
      perguntas: [],
      leitura: null,
      generoSelecionado: 'Todos',
      paginaAtual: 1,
      livroSelecionado: null,
    }
  },

  computed: {
    opcoesGenero() {
      return [{ valor: 'Todos', texto: 'Todos os gêneros' }].concat(
        generos.map((genero) => ({ valor: genero, texto: genero }))
      )
    },

    livrosFiltrados() {
      return this.livros
        .filter((livro) => this.generoSelecionado === 'Todos' || livro.genero === this.generoSelecionado)
        .sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'))
    },

    totalPaginas() {
      return Math.max(1, Math.ceil(this.livrosFiltrados.length / LIVROS_POR_PAGINA))
    },

    inicio() {
      return (this.paginaAtual - 1) * LIVROS_POR_PAGINA
    },

    livrosDaPagina() {
      return this.livrosFiltrados.slice(this.inicio, this.inicio + LIVROS_POR_PAGINA)
    },

    progressoLeitura() {
      return calcularProgresso(this.leitura.paginasLidas, this.leitura.livro.paginas)
    },

    paginasRestantes() {
      return this.leitura.livro.paginas - (Number(this.leitura.paginasLidas) || 0)
    },

    abasDetalhe() {
      const livro = this.livroSelecionado
      return [
        { titulo: 'Sinopse', conteudo: [livro.sinopse] },
        { titulo: 'Sobre o autor', conteudo: [livro.sobreAutor] },
        {
          titulo: 'Ficha técnica',
          conteudo: [
            `Autor: ${livro.autor}`,
            `Ano de publicação: ${livro.ano}`,
            `Gênero: ${livro.genero}`,
            `Páginas: ${livro.paginas}`,
            `Tempo estimado: ${tempoLeitura(livro.paginas)}`,
          ],
        },
      ]
    },
  },

  created() {
    this.livros = livros.slice()
    this.perguntas = perguntas
    this.leitura = { livro: livros[2], paginasLidas: 120, concluido: false }
    this.livroSelecionado = livros[2]
  },

  mounted() {
    this.$toast.mostrar('info', `Acervo carregado: ${plural(this.livros.length, 'livro', 'livros')}.`)
  },

  methods: {
    tempoLeitura,
    resumo,
    plural,

    aoMudarPaginas() {
      const total = this.leitura.livro.paginas
      const valor = this.leitura.paginasLidas

      if (valor === '' || valor === null || valor === undefined) return

      if (valor < 0) {
        this.leitura.paginasLidas = 0
        this.$toast.mostrar('erro', 'O número de páginas não pode ser negativo.')
        return
      }

      if (valor > total) {
        this.leitura.paginasLidas = total
        this.$toast.mostrar('erro', `Esse livro tem só ${total} páginas.`)
      }

      this.verificarConclusao()
    },

    avancarPaginas(quantidade) {
      const atual = Number(this.leitura.paginasLidas) || 0
      this.leitura.paginasLidas = Math.min(this.leitura.livro.paginas, atual + quantidade)
      this.verificarConclusao()
    },

    verificarConclusao() {
      const leitura = this.leitura
      if (leitura.concluido || leitura.paginasLidas < leitura.livro.paginas) return

      leitura.concluido = true
      this.$toast.mostrar('sucesso', `Parabéns! Você terminou “${leitura.livro.titulo}”.`)
    },

    lerLivro(livro) {
      if (this.leitura.livro.id === livro.id) {
        this.$toast.mostrar('info', `Você já está lendo “${livro.titulo}”.`)
        return
      }

      this.leitura = { livro, paginasLidas: 0, concluido: false }
      this.$toast.mostrar('sucesso', `Agora você está lendo “${livro.titulo}”.`)
    },

    filtrarPorGenero(opcao) {
      this.generoSelecionado = opcao.valor
      this.paginaAtual = 1
      const quantidade = this.livrosFiltrados.length
      this.$toast.mostrar('info', `${plural(quantidade, 'livro encontrado', 'livros encontrados')}.`)
    },

    selecionarLivro(livro, rolarAteDetalhes) {
      this.livroSelecionado = livro

      if (rolarAteDetalhes) {
        this.$nextTick(() => {
          this.$refs.detalhes.scrollIntoView({ behavior: 'smooth', block: 'start' })
          this.$refs.detalhes.focus({ preventScroll: true })
        })
      }
    },
  },
}
</script>
