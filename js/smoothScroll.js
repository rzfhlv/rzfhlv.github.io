document.addEventListener('DOMContentLoaded', function() {
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Add smooth scrolling to all links with a hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            const menu = document.getElementById('menu');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeIcon = document.getElementById('close-icon');
            
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            menu.classList.add('hidden');

            smoothScroll(targetId);
        });
    });
});