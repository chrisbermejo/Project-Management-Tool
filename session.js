const session = require('express-session');

const sessionConfig = {
  // secret: 'CHRISTOPHERBERMEJODB',
  secret: 'serect-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000, secure: false }
};

module.exports = function(app) {
  app.use(session(sessionConfig));

  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });
};
