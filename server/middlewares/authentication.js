import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, 'tilde00', (err, decoded) => {
    // TODO this is bad
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    req.user = decoded;
    next();
  });
}