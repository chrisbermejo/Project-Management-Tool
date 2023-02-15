// validating the information inside the form. 
function validateForm(event) {
    event.preventDefault();

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

    let isValid = true;

    if (memberid.value === "" || isNaN(memberid.value) || parseInt(memberid.value) < 1) {
      memberidError.innerHTML = "Please enter a valid member ID (must be a number greater than 0)";
      isValid = false;
    } else {
      memberidError.innerHTML = "";
    }

    if (fname.value === "" || !/^[a-zA-Z ]+$/.test(fname.value)) {
      fnameError.innerHTML = "Please enter a valid firstaaaaaa name (letters and spaces only)";
      isValid = false;
    } else {
      fnameError.innerHTML = "";
    }

    if (lname.value === "" || !/^[a-zA-Z ]+$/.test(lname.value)) {
      lnameError.innerHTML = "Please enter a valid last name (letters and spaces only)";
      isValid = false;
    } else {
      lnameError.innerHTML = "";
    }

    if (email.value === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.innerHTML = "Please enter a valid email address";
      isValid = false;
    } else {
      emailError.innerHTML = "";
    }

    if (role.value === "") {
      roleError.innerHTML = "Please select a role";
      isValid = false;
    } else {
      roleError.innerHTML = "";
    }

    if (isActive.value === "") {
      isActiveError.innerHTML = "Please select an active status";
      isValid = false;
    } else {
      isActiveError.innerHTML = "";
    }

    if (teamid.value === "" || isNaN(teamid.value) || parseInt(teamid.value) < 1) {
      teamidError.innerHTML = "Please enter a valid team ID (must be a number greater than 0)";
      isValid = false;
    } else {
      teamidError.innerHTML = "";
    }

    if (isValid) {
      event.target.submit();
    }
}