const express = require('express');
const router = express.Router();
const projects = require('../database/schemas/projectsdb');
const AuditLog = require('../database/schemas/auditLog');

router.use(express.static('src'));

router.get('/', (req, res) => {
  try{
    projects.find({}, (err, data) => {
      res.render('projects/main-projects', { projects: data });
    });
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete('/project/:projectid/delete', async (req, res) => {
  try{
    const projectID = req.params.projectid;
    await projects.deleteOne({projectid: projectID});
    console.log('Project Deleted!');  
    res.redirect('/dashboard/projects');
  }catch(err){
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/project/:projectid/get', async (req, res) => {
  try {
    const projectID = req.params.projectid;
    const projectINFO = await projects.findOne({projectid: projectID});
    res.json(projectINFO);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/project/add', async (req, res) => {
  try{
    const {projectid, title, description, status, projectedDate} = req.body;
    console.log(req.body)
    const newProject = await projects.create({ projectid, title, description, status, projectedDate});
    newProject.save();
    console.log('Project Saved!');  
    res.redirect('/dashboard/projects');
  }catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/project/:projectid/edit/update', async (req, res) => {
  try{
    const project_id = await projects.findOne({ projectid: req.params.projectid },{ _id: 1 });
    const {projectid, title, description, status, projectedDate} = req.body;
    const oldProject = await projects.findOne({_id: project_id._id});
    await projects.updateOne({_id: project_id._id}, {projectid, title, description, status, projectedDate});

    const updatedFields = {};

    if (Number(projectid) !== oldProject.projectid){
      updatedFields.old_projectid = oldProject.projectid;
      updatedFields.new_projectid = projectid;
    }
    if (title !== oldProject.title){
      updatedFields.old_title = oldProject.title;
      updatedFields.new_title = title;
    }
    if (description !== oldProject.description){
      updatedFields.old_description = oldProject.description;
      updatedFields.new_description = description;
    }
    if (status !== oldProject.status){
      updatedFields.old_status = oldProject.status;
      updatedFields.new_status = status;
    }
    if (projectedDate !== oldProject.projectedDate){
      updatedFields.old_projectedDate = oldProject.projectedDate;
      updatedFields.new_projectedDate = projectedDate;
    }

    const auditLogEntry = new AuditLog({
      type: 'Project',
      type_id: project_id._id,
      updated_by: 'chris',
      updated_fields: updatedFields
    });

    await auditLogEntry.save();

    console.log('Project Updated!');  
    res.redirect('/dashboard/projects');
  }catch(err){
    console.error(err);
    res.sendStatus(500);
  }
});


router.get('/project/:projectid/edit', async (req, res) => {
  res.redirect('/dashboard/projects');
});
router.get('/project/:projectid/', async (req, res) => {
  res.redirect('/dashboard/projects');
});
router.get('/project/:projectid/delete/menu', async (req, res) => {
  res.redirect('/dashboard/projects');
});

module.exports = router;