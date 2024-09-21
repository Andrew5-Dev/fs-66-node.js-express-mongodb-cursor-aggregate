import jwt from 'jsonwebtoken'

const getLoginHandler = (req, res) => {
  res.render('login')
}
const postLoginHandler = (req, res) => {
    console.log(req.body)
    const { username, password } = req.body

    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, 'your-secret-key', { algorithm: 'HS512', expiresIn: '30s' })
        res.cookie('token', token, { httpOnly: true, maxAge: 60000 })
        res.json({ message: 'Ви успішно увійшли' })
    } else {
        res.status(401).send('Невірний логін або пароль')
    }
}

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token

    if (token) {
        jwt.verify(token, 'your-secret-key', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Доступ заборонено або токен недійсний' })
            }
            req.user = user
            next()
        })
    } else {
        res.status(401).json({ message: 'Необхідна авторизація' })
    }
}


export { getLoginHandler, postLoginHandler, authenticateJWT}