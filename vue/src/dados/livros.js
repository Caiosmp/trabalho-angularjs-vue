export const livros = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    ano: 1899,
    genero: 'Romance',
    paginas: 256,
    sinopse:
      'Bento Santiago, o Dom Casmurro, relembra a própria vida e o amor por Capitu, e tenta provar uma traição que o leitor nunca consegue confirmar.',
    sobreAutor:
      'Machado de Assis (1839–1908) é um dos maiores escritores brasileiros e foi o primeiro presidente da Academia Brasileira de Letras.',
  },
  {
    id: 2,
    titulo: 'O Cortiço',
    autor: 'Aluísio Azevedo',
    ano: 1890,
    genero: 'Romance',
    paginas: 304,
    sinopse:
      'A vida agitada de um cortiço no Rio de Janeiro do século XIX e a ambição de João Romão, o dono, que enriquece explorando os moradores.',
    sobreAutor:
      'Aluísio Azevedo (1857–1913) foi o principal nome do Naturalismo na literatura brasileira.',
  },
  {
    id: 3,
    titulo: 'Capitães da Areia',
    autor: 'Jorge Amado',
    ano: 1937,
    genero: 'Romance',
    paginas: 280,
    sinopse:
      'Um grupo de meninos de rua vive num trapiche abandonado em Salvador, dividido entre a liberdade das ruas e a falta de um lar.',
    sobreAutor:
      'Jorge Amado (1912–2001), escritor baiano, é um dos autores brasileiros mais traduzidos no mundo.',
  },
  {
    id: 4,
    titulo: 'O Hobbit',
    autor: 'J. R. R. Tolkien',
    ano: 1937,
    genero: 'Fantasia',
    paginas: 336,
    sinopse:
      'Bilbo Bolseiro, um hobbit que adora o conforto de casa, é levado por um mago e treze anões numa aventura para recuperar um tesouro guardado por um dragão.',
    sobreAutor:
      'J. R. R. Tolkien (1892–1973) foi professor em Oxford e criou a Terra-média, o mundo de O Senhor dos Anéis.',
  },
  {
    id: 5,
    titulo: 'Harry Potter e a Pedra Filosofal',
    autor: 'J. K. Rowling',
    ano: 1997,
    genero: 'Fantasia',
    paginas: 264,
    sinopse:
      'Aos 11 anos, Harry descobre que é bruxo e vai estudar em Hogwarts, onde começa a desvendar o mistério sobre a morte dos pais.',
    sobreAutor:
      'J. K. Rowling (nascida em 1965) é a autora britânica da série Harry Potter, publicada em dezenas de idiomas.',
  },
  {
    id: 6,
    titulo: 'O Nome do Vento',
    autor: 'Patrick Rothfuss',
    ano: 2007,
    genero: 'Fantasia',
    paginas: 656,
    sinopse:
      'Kvothe, um homem que virou lenda, conta a verdadeira história da própria vida, da infância numa trupe de artistas aos anos na Universidade.',
    sobreAutor:
      'Patrick Rothfuss (nascido em 1973) é um escritor americano. O Nome do Vento abre a série A Crônica do Matador do Rei.',
  },
  {
    id: 7,
    titulo: 'Duna',
    autor: 'Frank Herbert',
    ano: 1965,
    genero: 'Ficção científica',
    paginas: 680,
    sinopse:
      'No planeta desértico Arrakis, única fonte da especiaria mais valiosa do universo, o jovem Paul Atreides fica no centro de uma disputa entre impérios.',
    sobreAutor:
      'Frank Herbert (1920–1986) foi um escritor americano. Duna é um dos livros de ficção científica mais vendidos da história.',
  },
  {
    id: 8,
    titulo: 'Fundação',
    autor: 'Isaac Asimov',
    ano: 1951,
    genero: 'Ficção científica',
    paginas: 240,
    sinopse:
      'O matemático Hari Seldon prevê a queda do Império Galáctico e cria a Fundação para encurtar a era de barbárie que virá depois.',
    sobreAutor:
      'Isaac Asimov (1920–1992) foi escritor e bioquímico, autor de centenas de livros de ficção e de divulgação científica.',
  },
  {
    id: 9,
    titulo: 'Neuromancer',
    autor: 'William Gibson',
    ano: 1984,
    genero: 'Ficção científica',
    paginas: 320,
    sinopse:
      'Case, um hacker que perdeu a capacidade de se conectar à rede, recebe uma última chance num trabalho arriscado no ciberespaço.',
    sobreAutor:
      'William Gibson (nascido em 1948) é um escritor americano-canadense e um dos criadores do cyberpunk.',
  },
  {
    id: 10,
    titulo: 'Sapiens',
    autor: 'Yuval Noah Harari',
    ano: 2011,
    genero: 'Não ficção',
    paginas: 464,
    sinopse:
      'Uma breve história da humanidade, da revolução cognitiva aos dias de hoje, explicando como o Homo sapiens passou a dominar o planeta.',
    sobreAutor:
      'Yuval Noah Harari (nascido em 1976) é historiador e professor na Universidade Hebraica de Jerusalém.',
  },
  {
    id: 11,
    titulo: 'Hábitos Atômicos',
    autor: 'James Clear',
    ano: 2018,
    genero: 'Não ficção',
    paginas: 320,
    sinopse:
      'Mostra como pequenas mudanças diárias, repetidas com consistência, se somam e geram grandes resultados ao longo do tempo.',
    sobreAutor:
      'James Clear é um escritor americano que estuda hábitos, tomada de decisão e melhoria contínua.',
  },
  {
    id: 12,
    titulo: 'O Programador Pragmático',
    autor: 'Andrew Hunt e David Thomas',
    ano: 1999,
    genero: 'Não ficção',
    paginas: 352,
    sinopse:
      'Reúne conselhos práticos para quem desenvolve software, da organização do código à forma de lidar com prazos e mudanças.',
    sobreAutor:
      'Andrew Hunt e David Thomas são programadores e estão entre os autores do Manifesto Ágil, de 2001.',
  },
]

export const generos = ['Romance', 'Fantasia', 'Ficção científica', 'Não ficção']

export const perguntas = [
  {
    titulo: 'Como acompanho a minha leitura?',
    conteudo:
      'No quadro "Lendo agora", informe quantas páginas você já leu ou use o botão "+10 páginas". A barra mostra quanto do livro já foi lido.',
  },
  {
    titulo: 'Como escolho outro livro?',
    conteudo:
      'No acervo, clique em "Ver detalhes" e depois em "Começar a ler". O livro escolhido passa a aparecer em "Lendo agora".',
  },
  {
    titulo: 'Como filtro o acervo?',
    conteudo: 'Use o menu "Gênero" para ver só os livros de um tipo, como Romance ou Fantasia.',
  },
  {
    titulo: 'Como é calculado o tempo de leitura?',
    conteudo:
      'Usamos uma média de 40 páginas por hora. É só uma estimativa, porque cada pessoa lê no seu ritmo.',
  },
  {
    titulo: 'Meus dados ficam salvos?',
    conteudo:
      'Não. Este é um projeto de demonstração, e tudo volta ao estado inicial quando a página é recarregada.',
  },
]

export function calcularProgresso(feito, total) {
  if (!total) return 0
  const porcentagem = (Number(feito) / total) * 100
  return Math.round(Math.min(100, Math.max(0, porcentagem || 0)))
}

export function tempoLeitura(paginas) {
  const numero = Number(paginas)
  if (!numero) return ''
  return `≈ ${Math.ceil(numero / 40)} h de leitura`
}

export function resumo(texto, limite = 100) {
  if (!texto || texto.length <= limite) return texto || ''
  const cortado = texto.slice(0, limite)
  const ultimoEspaco = cortado.lastIndexOf(' ')
  return (ultimoEspaco > 0 ? cortado.slice(0, ultimoEspaco) : cortado) + '…'
}

export function plural(quantidade, singular, pluralTexto) {
  return `${quantidade} ${quantidade === 1 ? singular : pluralTexto}`
}
