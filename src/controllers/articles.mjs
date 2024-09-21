import { getArticles, getArticleById } from "../db/articleDB.mjs";

const getArticlesHandler = (req, res) => {
    const articles = getArticles()
    const title = 'Articles List'
    res.render('index.ejs', { articles , title })
}

const postArticlesHandler = (req, res) => {
    res.send('Post articles route')
}


const getArticleByIdHandler = (req, res) => {
    const {articleId} = req.params
    const article = getArticleById(articleId)
    res.render('article.ejs', { article })
}


const putArticleByIdHandler = (req, res) => {
    const {articleId} = req.params
    res.send(`Put article by Id route: ${articleId}`)
}

const deleteArticleByIdHandler = (req, res) => {
    const {articleId} = req.params
    res.send(`Delete article by Id route: ${articleId}`)
}

export {
    getArticlesHandler,
    postArticlesHandler,
    getArticleByIdHandler,
    putArticleByIdHandler,
    deleteArticleByIdHandler
}