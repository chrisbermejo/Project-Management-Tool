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

const loginForm = document.querySelector('.login-form');
const errorLabel = document.querySelector('.error');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    console.log(formData)
    try {
    const response = await fetch('/login/signin', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        errorLabel.textContent = 'Incorrect information';
        errorLabel.classList.add('show');
        return;
    }
    } catch (error) {
    console.error(error);
    }
});
