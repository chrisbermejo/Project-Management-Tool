const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const memberRoute = require('./routes/members');
const PORT = 3000;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/')
.then(() => console.log('Connected to DB')).catch((err) => console.log(err));

app.use(express.static('src'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/dashboard/members', memberRoute);

app.get('/', function(req, res) {
  res.redirect('/dashboard/members/add-member/')
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port `)
});
