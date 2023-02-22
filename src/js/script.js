// validating the information inside the form. 
function validateForm(event) {
  event.preventDefault();
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

  if (isValid) {
    closeAddMemberDialog[0].addEventListener('click', function() {
      demoDialog.close();
    });      
    event.target.submit();
  }
}



//Add Member Dialog
let openAddMemberDialogButton = document.getElementById('openAddMemberButton');
let AddMemberDialog = document.getElementById('addMemberForm');
let closeAddMemberDialog = document.querySelectorAll('.closeAddMember');

//add-form
let memberform = document.getElementById('add-member-form');

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

openAddMemberDialogButton.addEventListener('click', function () {
  if (typeof AddMemberDialog.showModal === "function") {
    AddMemberDialog.showModal();
  } else {
    console.log("The <dialog> API is not supported by this browser");
  }
});

closeAddMemberDialog[1].addEventListener('click', function() {
  AddMemberDialog.close();
  memberform.reset()
  removeClasses();
});


//edit-form
let edit_memberid = document.getElementById("edit-memberid");
let edit_fname = document.getElementById("edit-fname");
let edit_lname = document.getElementById("edit-lname");
let edit_email = document.getElementById("edit-email");
let edit_role = document.getElementById("edit-role");
let edit_isActive = document.getElementById("edit-isActive");
let edit_teamid = document.getElementById("edit-teamid");
let edit_button = document.getElementById("edit-Update");

//Edit Member Dialog
let openEditMemberDialogButton = document.querySelectorAll('.openEditMemberButton');
let EditMemberDialog = document.getElementById('editMemberForm');
let closeEditMemberDialog = document.querySelectorAll('.closeEditMember');

closeEditMemberDialog[1].addEventListener('click', function() {
  history.back();
  EditMemberDialog.close();
  removeClasses();
});

openEditMemberDialogButton.forEach(editButton => {
  editButton.addEventListener('click', async (event) => {
    const memberId = event.target.value;

    try {
      const response = await fetch(`/dashboard/members/api/${memberId}/edit`);
      const member = await response.json();
      console.log(member);
      edit_memberid.value = member.memberid;
      edit_fname.value = member.fname;
      edit_lname.value = member.lname;
      edit_email.value = member.email;
      edit_role.value = member.role;
      edit_isActive.value = member.isActive;
      edit_teamid.value = member.teamid;
      edit_button.value = member._id;

      EditMemberDialog.showModal();
      const url = `/dashboard/members/edit/${member.memberid}`;
			const title = "EDIT";
			history.pushState(null, title, url);


    } catch (err) {
      console.error(err);
    }
  });
});