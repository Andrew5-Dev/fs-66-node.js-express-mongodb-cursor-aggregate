import {Router} from 'express'
import { authenticateJWT, getLoginHandler, postLoginHandler } from '../controllers/login.mjs'
import { getProtectedHandler } from '../controllers/protected.mjs'
import loginRouter from './login.mjs'


const protectedRouter = Router()

protectedRouter.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>ЗАХИЩЕНА СТОРІНКА</h1><p>Ви залогінені та маєте доступ до захищеної сторінки.</p>`)
    } else {
        res.redirect('/login')
    }
})



/*protectedRouter
  .route('/')
  .get(getProtectedHandler)



protectedRouter.route('/protected')
  .get(getProtectedHandler)*/


export default protectedRouter