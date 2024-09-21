import {Router} from 'express'
import {getRootHandler} from '../controllers/root.mjs'

const rootRouter = Router()

rootRouter.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>ГОЛОВНА</h1><p>Ви вже залогінені та маєте повний доступ до всіх сторінок.</p>`)
    } else {
        res.redirect('/login')
    }
})

rootRouter.route('/').
get(getRootHandler)


export default rootRouter