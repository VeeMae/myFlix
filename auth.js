const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username,
    expiresIn: '1d',
    algorithm: 'HS256'
  });
}

/* POST login. */
module.exports = (router) => {
  router.post('/login', cors(), (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'An error has occured. Please try again.',
          user: 'Incorrect user information.'
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}