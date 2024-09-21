const articles = [
  { id: 1, name: 'BTRC', body: 'BTRC forms committee to develop guidelines for satellite internet'  },
  { id: 2, name: 'NIST', body: 'NIST releases new digital identity and AI guidelines for contractors' }
]

const getArticles = () => articles

const getArticleById = (id) => articles.find(article => article.id === parseInt(id))

export { getArticles, getArticleById }
