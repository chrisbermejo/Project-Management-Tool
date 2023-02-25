const express = require('express');
const router = express.Router();
const member = require('../database/schemas/membersdb');

router.use(express.static('src'));

router.get('/', (req, res) => {
  try{
    member.find({}, (err, data) => {
      res.render('dashboard', { members: data });
    });
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});


module.exports = router;