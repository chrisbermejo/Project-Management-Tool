
function projectValidation() {
  let isValid = true;

  if (projectid.value === "" || isNaN(projectid.value) || parseInt(projectid.value) < 1) {
    projectidError.classList.add('label-error');
    projectid.classList.add('input-error');
    isValid = false;
  } else {
    projectidError.classList.remove('label-error');
    projectid.classList.remove('input-error');
  }

  if (title.value === "") {
    titleError.classList.add('label-error');
    title.classList.add('input-error');
    isValid = false;
  } else {
    titleError.classList.remove('label-error');
    title.classList.remove('input-error');
  }

  if (description.value === "") {
    descriptionError.classList.add('label-error');
    description.classList.add('input-error');
    isValid = false;
  } else {
    descriptionError.classList.remove('label-error');
    description.classList.remove('input-error');
  }

  if (projectStatus.value === "") {
    statusError.classList.add('label-error');
    projectStatus.classList.add('input-error');
    isValid = false;
  } else {
    statusError.classList.remove('label-error');
    projectStatus.classList.remove('input-error');
  }

  if (projectedDate.value === "" || isNaN(Date.parse(projectedDate.value))) {
    projectedDateError.classList.add('label-error');
    projectedDate.classList.add('input-error');
    isValid = false;
  } else {
    projectedDateError.classList.remove('label-error');
    projectedDate.classList.remove('input-error');
  }

  return isValid;
}

function removeProjectClasses(){
  projectidError.classList.remove('label-error');
  projectid.classList.remove('input-error');
  titleError.classList.remove('label-error');
  title.classList.remove('input-error');
  descriptionError.classList.remove('label-error');
  description.classList.remove('input-error');
  statusError.classList.remove('label-error');
  projectStatus.classList.remove('input-error');
  projectedDateError.classList.remove('label-error');
  projectedDate.classList.remove('input-error');
}

function validateForm(event) {
  event.preventDefault();
  let isValid = projectValidation();
  if (isValid) {   
    history.back();
    event.target.submit();
  }
}

//Member Dialog
let addProjectButton = document.getElementById('addProjectButton');
let editButtons = document.querySelectorAll('.openEditProjectButton');

let projectDialog = document.getElementById('projectForm');
let closeDialog = document.getElementById('close');
let submitDialog = document.getElementById('submit-button');

//Form
let projectform = document.getElementById('project-form');

let projectid = document.getElementById("projectid");
let projectidError = document.getElementById("projectid-error");

let title = document.getElementById("title");
let titleError = document.getElementById("title-error");

let description = document.getElementById("description");
let descriptionError = document.getElementById("description-error");

let projectStatus = document.getElementById("status");
let statusError = document.getElementById("status-error");

let projectedDate = document.getElementById("projectedDate");
let projectedDateError = document.getElementById("projectedDate-error");

editButtons.forEach(editButton => {
  editButton.addEventListener('click', async (event) => {
    const projectID = event.target.value;
    try {
      const response = await fetch(`/dashboard/projects/project/${projectID}/get`);
      const project = await response.json();
      console.log(project.projectid)
      projectform.action = `/dashboard/projects/project/${project.projectid}/edit/update?_method=PUT`;
      projectid.value = project.projectid;
      title.value = project.title;
      description.value = project.description;
      projectStatus.value = project.status;
      projectedDate.value = project.projectedDate;
      submitDialog.innerHTML = "UPDATE";
      projectDialog.showModal();
			history.pushState(null, 'EDIT', `/dashboard/projects/project/${project.projectid}/edit`);

    } catch (err) {
      console.error(err);
    }
  });
});

addProjectButton.addEventListener('click', function () {
  projectform.action = "/dashboard/projects/project/add";
  projectform.reset();
  submitDialog.innerHTML = "ADD";
  history.pushState(null, 'ADD', '/dashboard/projects/project/add');
  projectDialog.showModal();
});

closeDialog.addEventListener('click', function() {
  history.back();
  projectDialog.close();
  projectform.reset();
  removeClasses();
});

let deleteDialog = document.getElementById('delete-projectForm');
let deleteButtons = document.querySelectorAll('.openDeleteForm');
let deleteForm = document.getElementById('delete-form');
let closeDelete = document.getElementById('delete-close');

deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', async (event) => {
    const projectID = event.target.value;
    try {
      history.pushState(null, 'DELETE', `/dashboard/projects/project${projectID}/delete/menu`);
      deleteForm.action = `/dashboard/projects/project/${projectID}/delete?_method=DELETE`;
      deleteDialog.showModal();
    } catch (err) {``
      console.error(err);
    }
  });
});

closeDelete.addEventListener('click', function() {
  history.back();
  deleteDialog.close();
});