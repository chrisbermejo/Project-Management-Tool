const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/expressjs-database')
.then(() => console.log('Connected to DB')).catch((err) => console.log(err));