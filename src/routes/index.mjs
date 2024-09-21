import {Router} from 'express'
import rootRouter from './root.mjs'
import usersRouter from './users.mjs'
import loginRouter from './login.mjs'
import protectedRouter from './protected.mjs'
import articlesRouter from './articles.mjs'
import basicAuth from '../middlewares/basicAuth.mjs'

const router = Router()

router.post('/background', (req, res) => {
  const background = req.body.background;
  if (background) {
    res.cookie('background', background, { maxAge: 500000, httpOnly: true });
  }
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  const background = req.cookies.background || 'white';
  res.render('login', { background });
});



router.use('/', rootRouter)
router.use('/login', loginRouter)
router.use('/protected', protectedRouter)
router.use('/users', usersRouter)
router.use('/articles',  articlesRouter)

export default router