const express = require('express');
const router = express.Router();

router.use(express.static('src'));

router.get('/', (req, res) => {
  try{
    console.log(req.session.user);
    res.render('dashboard', {user: req.session.user});
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});


module.exports = router;