function basicAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).end('Access denied. No credentials sent');
  }
  next();
}

export default basicAuth