const express = require('express');
const router = express.Router();
const member = require('../database/schemas/membersdb');

router.use(express.static('src'));

router.get('/', async (req, res) => {
  try {
    const data = await member.find({});
    res.render('members/index-member', { members: data });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete('/member/:member_ID/delete', async (req, res) => {
  try{
    const member_ID = req.params.member_ID;
    await member.deleteOne({memberid: member_ID});
    console.log('Member Deleted!');  
    res.redirect('/dashboard/members');
  }catch(err){
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/member/:memberID/get', async (req, res) => {
  try {
    const memberID = req.params.memberID;
    const memberINFO = await member.findOne({memberid: memberID}, "memberid fname lname email role isActive teamid");
    res.json(memberINFO);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/member/:memberID/get/id', async (req, res) => {
  try {
    const memberID = req.params.memberID;
    const memberINFO = await member.findOne({memberid: memberID}, "memberid");
    res.json(memberINFO);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/member/:memberID/view', async (req, res) => {
  try {
    const memberID = req.params.memberID;
    const memberINFO = await member.findOne({memberid: memberID}, "memberid fname lname email role isActive teamid");
    res.render('members/view-member', {member: memberINFO});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/member/add', async (req, res) => {
  try{
    const { memberid, fname, lname, email, role, isActive, teamid } = req.body;
    console.log(req.body)
    const newMember = await member.create({memberid, fname, lname, email, role, isActive, teamid});
    newMember.save();
    console.log('Member Saved!');  
    res.redirect('/dashboard/members');
  }catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/member/:member_ID/edit/update', async (req, res) => {
  try{
    const member_ID = req.params.member_ID;
    const { memberid, fname, lname, email, role, isActive, teamid } = req.body;
    console.log(req.body)
    await member.updateOne({memberid: member_ID}, {memberid, fname, lname, email, role, isActive, teamid});
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
router.get('/member/:memberid/', async (req, res) => {
  res.redirect('/dashboard/members');
});
router.get('/member/:member_ID/delete/menu', async (req, res) => {
  res.redirect('/dashboard/members');
});





module.exports = router;