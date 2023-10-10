const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');
let isOpen = false;

menuToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        // Change to close icon
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        // Change back to hamburger icon
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
    menu.classList.toggle('hidden');
});

// Add click event listeners to menu items to close the menu
const menuItems = menu.querySelectorAll('a[href^="#"]');
menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        isOpen = false;
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        menu.classList.add('hidden');
    });
});