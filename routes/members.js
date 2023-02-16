const express = require('express');
const router = express.Router();
const member = require('../database/schemas/membersdb');

router.use(express.static('src'));

router.get('/add-member/', function(req, res) {
    res.render("index");
});

router.post('/add-member/submit-form/', async (req, res) => {
  const { memberid, fname, lname, email, role, isActive, teamid } = req.body;
  console.log({ memberid, fname, lname, email, role, isActive, teamid});
  const newMember = await member.create({memberid, fname, lname, email, role, isActive, teamid});
  newMember.save();
  console.log('Member Saved!');  
  res.redirect('/dashboard/members/');
});

router.get('/', (req, res) => {
  res.send("...");
});

module.exports = router;