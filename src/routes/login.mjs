import {Router} from 'express'
import {
  getLoginHandler,
  postLoginHandler,
} from '../controllers/login.mjs'
import passport from "passport";
import {errors} from "celebrate";

const loginRouter = Router()


loginRouter.post(
  '/',
  passport.authenticate('local', {
    failureFlash: true
  }),
  (req, res) => {
    res.redirect('/protected')
  }
)

loginRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/protected')
  } else {
    res.render('login')
  }
})

/*loginRouter
  .route('/')
  .get(getLoginHandler)
  .post(postLoginHandler)*/


export default loginRouter