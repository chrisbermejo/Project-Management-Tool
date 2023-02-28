const express = require('express');
const router = express.Router();
const member = require('../database/schemas/membersdb');
const user = require('../database/schemas/usersdb');

router.use(express.static('src'));

router.get('/', (req, res) => {
  res.render("login");
});

router.post('/signin', async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.memberid)
    const foundMember = await user.findOne({memberid: req.body.memberid, email: req.body.email, password: req.body.password});
    console.log(foundMember)
    if (foundMember) {
      const userName = await member.findOne({memberid: req.body.memberid, email: req.body.email}, "fname lname");
      req.session.user = {
        fname: userName.fname,
        lname: userName.lname
      };
      res.redirect('/dashboard/');
    } else {
      res.status(401);
      return;
    }
  } catch (err) {
    res.status(500).json({message: err.message});
    return;
  }
});

module.exports = router;