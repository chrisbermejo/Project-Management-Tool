const passwordIcon = document.getElementById('show-password');
const passwordInput = document.getElementById('password');

passwordIcon.addEventListener('click', () => {
    if (passwordIcon.textContent == "key") {
        return;
    }
    if (passwordIcon.textContent == "visibility") {
        passwordIcon.textContent = "visibility_off";
        passwordInput.type = 'text';
    } else {
        passwordIcon.textContent = "visibility";
        passwordInput.type = 'password';
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length <= 0) {
        passwordIcon.textContent = "key";
        passwordInput.type = 'password';
    } else {
        passwordIcon.textContent = "visibility";
    }
});