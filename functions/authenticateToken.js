const jwt = require('jsonwebtoken');
const SECRET_KEY = "SECTET_KEY"; //
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
