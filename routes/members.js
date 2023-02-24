const express = require('express');
const router = express.Router();
const member = require('../database/schemas/membersdb');

router.use(express.static('src'));

router.get('/', (req, res) => {
  try{
    member.find({}, (err, data) => {
      res.render('main-member', { members: data });
    });
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/member/:memberID/get', async (req, res) => {
  try {
    const memberID = req.params.memberID;
    console.log(memberID);
    const memberINFO = await member.findOne({_id: memberID});
    res.json(memberINFO);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/member/:memberID/view', async (req, res) => {
  try {
    const memberID = req.params.memberID;
    const memberINFO = await member.findOne({_id: memberID}, "memberid fname lname email role isActive teamid");
    console.log(memberINFO);
    res.render('view-member', {member: memberINFO});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/submit-form', async (req, res) => {
  try{
    const { memberid, fname, lname, email, role, isActive, teamid } = req.body;
    console.log({ memberid, fname, lname, email, role, isActive, teamid});
    const newMember = await member.create({memberid, fname, lname, email, role, isActive, teamid});
    newMember.save();
    console.log('Member Saved!');  
    res.redirect('/dashboard/members');
  }catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/member/:member_ID/edit/update', async (req, res) => {
  try{
    const member_ID = req.params.member_ID;
    const { memberid, fname, lname, email, role, isActive, teamid } = req.body;
    await member.updateOne({_id: member_ID}, {memberid, fname, lname, email, role, isActive, teamid});
    console.log('Member Updated!');  
    res.redirect('/dashboard/members');
  }catch(err){
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/member/:memberid/edit', async (req, res) => {
  res.redirect('/dashboard/members');
});

module.exports = router;