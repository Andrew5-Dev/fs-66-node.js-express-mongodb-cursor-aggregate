import express from 'express'
import router from './routes/index.mjs'
import {errors} from 'celebrate'
import logRequests from './middlewares/log.mjs'
import ejs from 'ejs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import flash from 'connect-flash'
import { getUsers } from './db/usersDB.mjs'
import { errorHandler } from './middlewares/errorMiddleware.mjs'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'


dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()


passport.use( new LocalStrategy((username, password, done) => {    const user = getUsers().find(user => user.username === username)
    if (user) {
        if (user.password === password) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Невірний пароль' })

        }
    } else {
        return done(null, false, { message: 'Користувач не знайдено' })
    }
}))



app.use(
    session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: false
    })
)

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    const user = getUsers().find(user => user.id === parseInt(id))
    done(null, user)
})


app.set('view engine', 'pug')
app.set('views', './src/views')

app.engine('ejs', ejs.renderFile);
app.set('views-ejs', './src/views');

app.use(bodyParser.json())
app.use(errorHandler)
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(logRequests)
app.use(router)
app.use(errors())
app.use(express.static('src/public'))



app.use((err, req, res, next) => {
    if (!res.headersSent) {
        res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`)
})