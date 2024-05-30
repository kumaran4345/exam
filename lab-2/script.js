document.addEventListener("DOMContentLoaded", function() {

    const aboutSection = document.getElementById('about-me');
    const aboutLink = document.querySelector('nav ul li a[href="#about-me"]');
    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();
        aboutSection.classList.toggle('hidden');
    });


    let currentProject = 0;
    const projects = document.querySelectorAll('#projects ul li');
    setInterval(function() {
        projects[currentProject].classList.toggle('hidden');
        currentProject = (currentProject + 1) % projects.length;
        projects[currentProject].classList.toggle('hidden');
    }, 3000);


    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for your message!');
    });
});


const style = document.createElement('style');
style.textContent = '.hidden { display: none; }';
document.head.append(style);
