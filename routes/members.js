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

router.get('/api/:memberId/edit', async (req, res) => {
  try {
<<<<<<< HEAD
    const memberID = req.params.memberID;
    console.log(memberID);
    const memberINFO = await member.findOne({_id: memberID});
=======
    const memberId = req.params.memberId;
    const memberINFO = await member.findOne({ memberid: memberId});
>>>>>>> 8915792f745828786c41f0a1fa0d121b119c144b
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
  console.log(req.body.memberid);
  console.log({ memberid, fname, lname, email, role, isActive, teamid});
  const newMember = await member.create({memberid, fname, lname, email, role, isActive, teamid});
  newMember.save();
  console.log('Member Saved!');  
  res.redirect('/dashboard/members');
  
});

// router.post('/edit-form', async (req, res) => {
//   const { memberid, fname, lname, email, role, isActive, teamid } = req.body;
//   console.log({ memberid, fname, lname, email, role, isActive, teamid});
//   const newMember = await member.collection("member").updateOne( )
  
//   {memberid, fname, lname, email, role, isActive, teamid});
//   newMember.save();
//   console.log('Member Saved!');  
//   res.redirect('/dashboard/members');
// });

module.exports = router;