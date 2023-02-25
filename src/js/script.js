// validating the information inside the form. 
function validation() {
  let isValid = true;

  if (memberid.value === "" || isNaN(memberid.value) || parseInt(memberid.value) < 1) {
    memberidError.classList.add('label-error');
    memberid.classList.add('input-error');
    isValid = false;
  } else {
    memberidError.classList.remove('label-error');
    memberid.classList.remove('input-error');
  }

  if (fname.value === "" || !/^[a-zA-Z ]+$/.test(fname.value)) {
    fnameError.classList.add('label-error');
    fname.classList.add('input-error');
    isValid = false;
  } else {
    fnameError.classList.remove('label-error');
    fname.classList.remove('input-error');
  }

  if (lname.value === "" || !/^[a-zA-Z ]+$/.test(lname.value)) {
    lnameError.classList.add('label-error');
    lname.classList.add('input-error');
    isValid = false;
  } else {
    lnameError.classList.remove('label-error');
    lname.classList.remove('input-error');
  }

  if (email.value === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.classList.add('label-error');
    email.classList.add('input-error');
    isValid = false;
  } else {
    emailError.classList.remove('label-error');
    email.classList.remove('input-error');
  }

  if (role.value === "") {
    roleError.classList.add('label-error');
    role.classList.add('input-error');
    isValid = false;
  } else {
    roleError.classList.remove('label-error');
    role.classList.remove('input-error');
  }

  if (isActive.value === "") {
    isActiveError.classList.add('label-error');
    isActive.classList.add('input-error');
    isValid = false;
  } else {
    isActiveError.classList.remove('label-error');
    isActive.classList.remove('input-error');
  }

  if (teamid.value === "" || isNaN(teamid.value) || parseInt(teamid.value) < 1) {
    teamidError.classList.add('label-error');
    teamid.classList.add('input-error');
    isValid = false;
  } else {
    teamidError.classList.remove('label-error');
    teamid.classList.remove('input-error');
  }

  return isValid;
}

function removeClasses(){
  teamidError.classList.remove('label-error');
  teamid.classList.remove('input-error');
  isActiveError.classList.remove('label-error');
  isActive.classList.remove('input-error');
  roleError.classList.remove('label-error');
  role.classList.remove('input-error');
  emailError.classList.remove('label-error');
  email.classList.remove('input-error');
  lnameError.classList.remove('label-error');
  lname.classList.remove('input-error');
  fnameError.classList.remove('label-error');
  fname.classList.remove('input-error');
  memberidError.classList.remove('label-error');
  memberid.classList.remove('input-error');
}

function validateForm(event) {
  event.preventDefault();
  let isValid = validation();
  if (isValid) {   
    history.back();
    event.target.submit();
  }
}

//Member Dialog
let addMemberButton = document.getElementById('addMemberButton');
let editButtons = document.querySelectorAll('.openEditMemberButton');

let memberDialog = document.getElementById('memberForm');
let closeDialog = document.getElementById('close');
let submitDialog = document.getElementById('submit-button');

//Form
let memberform = document.getElementById('member-form');

let memberid = document.getElementById("memberid");
let memberidError = document.getElementById("memberid-error");

let fname = document.getElementById("fname");
let fnameError = document.getElementById("fname-error");

let lname = document.getElementById("lname");
let lnameError = document.getElementById("lname-error");

let email = document.getElementById("email");
let emailError = document.getElementById("email-error");

let role = document.getElementById("role");
let roleError = document.getElementById("role-error");

let isActive = document.getElementById("isActive");
let isActiveError = document.getElementById("isActive-error");

let teamid = document.getElementById("teamid");
let teamidError = document.getElementById("teamid-error");

editButtons.forEach(editButton => {
  editButton.addEventListener('click', async (event) => {
    const memberId = event.target.value;
    try {
      const response = await fetch(`/dashboard/members/member/${memberId}/get`);
      const member = await response.json();
      memberform.action = `/dashboard/members/member/${member._id}/edit/update?_method=PUT`;
      memberid.value = member.memberid;
      fname.value = member.fname;
      lname.value = member.lname;
      email.value = member.email;
      role.value = member.role;
      isActive.value = member.isActive;
      teamid.value = member.teamid;
      submitDialog.innerHTML = "UPDATE";
      memberDialog.showModal();
			history.pushState(null, 'EDIT', `/dashboard/members/member/${member.memberid}/edit`);

    } catch (err) {
      console.error(err);
    }
  });
});

addMemberButton.addEventListener('click', function () {
  memberform.action = "/dashboard/members/member/add";
  memberform.reset();
  submitDialog.innerHTML = "ADD";
  history.pushState(null, 'ADD', '/dashboard/members/member/add');
  memberDialog.showModal();
});

closeDialog.addEventListener('click', function() {
  history.back();
  memberDialog.close();
  memberform.reset();
  removeClasses();
});

let deleteDialog = document.getElementById('deleteForm');
let deleteButtons = document.querySelectorAll('.openDeleteForm');
let deleteForm = document.getElementById('delete-form');
let closeDelete = document.getElementById('delete-close');

deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', async (event) => {
    const memberId = event.target.value;
    try {
      const response = await fetch(`/dashboard/members/member/${memberId}/get/id`);
      const member = await response.json();
      history.pushState(null, 'DELETE', `/dashboard/members/member/${member.memberid}/delete/menu`);
      deleteForm.action = `/dashboard/members/member/${memberId}/delete?_method=DELETE`;
      deleteDialog.showModal();
    } catch (err) {
      console.error(err);
    }
  });
});

closeDelete.addEventListener('click', function() {
  history.back();
  deleteDialog.close();
});