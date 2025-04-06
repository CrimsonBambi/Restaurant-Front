// login references
const openLogin = document.getElementById('open-login-modal');
const closeLogin = document.getElementById('close-login');
const loginModal = document.getElementById('login-modal');

// register references
const openRegister = document.getElementById('open-register-modal');
const closeRegister = document.getElementById('close-register');
const registerModal = document.getElementById('register-modal');

// Open the login modal
openLogin.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    loginModal.showModal(); 
});

// Close the login modal 
closeLogin.addEventListener('click', () => {
    loginModal.close(); 
});

// Open the register modal
openRegister.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    registerModal.showModal(); 
});

// Close the login modal 
closeRegister.addEventListener('click', () => {
    registerModal.close(); 
});