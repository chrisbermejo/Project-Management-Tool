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

const loginForm = document.getElementById('joe');
const errorLabel = document.querySelector('.error');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {};
    new FormData( loginForm ).forEach((value, key) => data[key] = value);
    console.log('1')
    console.log(data)
    console.log('1')
    try {
    const response = await fetch('/login/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        body: new URLSearchParams(data)
    });
    console.log(response.ok);
    if (response.ok) {
        window.location.href = '/dashboard';
    }
    if (!response.ok) {
        errorLabel.textContent = 'Incorrect information';
        errorLabel.classList.add('show');
        return;
    }
    } catch (error) {
    console.error(error);
    }
});