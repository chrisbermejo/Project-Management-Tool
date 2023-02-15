const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/')
.then(() => console.log('Connected to DB')).catch((err) => console.log(err));


app.use(express.static('src'));
app.use('/css', express.static(__dirname + '/src/mystyle'));
app.use('/js', express.static(__dirname + '/src/index'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.render("index");
});


app.post('/submit-member-form', (req, res) => {
  const formData = req.body;
  console.log(formData.fname);
  res.send('Form submitted successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port `)
});