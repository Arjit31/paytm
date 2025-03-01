const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } else {
    res.status(403).send('Unauthorized');
    return;
  }
}

module.exports = {authMiddleware};