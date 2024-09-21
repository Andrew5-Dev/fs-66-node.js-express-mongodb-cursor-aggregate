import { authenticateJWT } from './login.mjs'

const getProtectedHandler = (req, res) => {
  authenticateJWT(req, res, () => {
  })
  res.json({ message: 'Все ОК! Ви зайшли на захищений маршрут' })
}

export { getProtectedHandler }