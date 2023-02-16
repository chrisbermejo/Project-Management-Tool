const express = require('express');
const router = express.Router();

let formData = {};

router.use(express.static('src'));

router.get('/add-member/', function(req, res) {
    res.render("index");
  });

router.post('/add-member/submit-form/', (req, res) => {
  formData = req.body;
  console.log(formData);
  res.redirect('/dashboard/members/');
});

router.get('/', (req, res) => {
  res.send(JSON.stringify(formData, null, 2));
})

module.exports = router;