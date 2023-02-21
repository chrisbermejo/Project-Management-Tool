const express = require('express');
const bodyParser = require('body-parser');
const memberRoute = require('./routes/members');
const loginRoute = require('./routes/login');
const PORT = 3000;

const app = express();

require('./database');

app.use(express.static('src'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/dashboard/members', memberRoute);
app.use('/login/', loginRoute);

app.get('/', function(req, res) {
  res.redirect('/login/')
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port `)
});
