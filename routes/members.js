const express = require('express');
const router = express.Router();
const member = require('../database/schemas/membersdb');

router.use(express.static('src'));

router.get('/', (req, res) => {
  member.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.render('main-member', { members: data });
    }
  });
});

router.get('/api/:memberID/edit', async (req, res) => {
  try {
    const memberID = req.params.memberID;
    console.log(memberID);
    const memberINFO = await member.findOne({_id: memberID});
    console.log(memberINFO);
    res.json(memberINFO);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/view/:memberID', async (req, res) => {
  try {
    const memberID = req.params.memberID;
    const memberINFO = await member.findOne({_id: memberID});
    res.json(memberINFO);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/submit-form', async (req, res) => {
  const { memberid, fname, lname, email, role, isActive, teamid } = req.body;
  console.log({ memberid, fname, lname, email, role, isActive, teamid});
  const newMember = await member.create({memberid, fname, lname, email, role, isActive, teamid});
  newMember.save();
  console.log('Member Saved!');  
  res.redirect('/dashboard/members');
});

module.exports = router;