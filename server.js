const express = require('express');
const bodyParser = require('body-parser');
const session = require('./session');
const methodOverride = require('method-override');
const dashboardRoute = require('./routes/dashboard');
const memberRoute = require('./routes/members');
const taskRoute = require('./routes/tasks');
const projectRoute = require('./routes/projects');
const loginRoute = require('./routes/login');
const PORT = 3000;

const app = express();
session(app);
require('./database');

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.redirect('/login');
});

app.use((req, res, next) => {
  if (req.url === '/login' || req.url === '/login/' || req.url === '/login/signin/' || req.url === '/login/signin') {
    next();
  } else if (req.session.user) {
    if (req.session.user.role === "admin" || req.session.user.role === "member") {
      console.log('Moving pages')
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  } else {
    res.redirect('/login');
  }
});

app.use('/dashboard/members', memberRoute);
app.use('/dashboard/projects', projectRoute);
app.use('/dashboard/tasks', taskRoute);
app.use('/dashboard', dashboardRoute);
app.use('/login', loginRoute);

app.listen(PORT, () => {
    console.log('')
    console.log(`Server is running at ${PORT} port `)
});
