// References
const openModalButton = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-modal');
const loginModal = document.getElementById('login-modal');

// Open the modal
openModalButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    loginModal.showModal(); 
});

// Close the modal 
closeModalButton.addEventListener('click', () => {
    loginModal.close(); 
});

