document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    
    // Check if elements exist
    if (!hamburger || !navbar) {
        console.error('Could not find hamburger or navbar elements!');
        return;
    }
    
    // Toggle menu function
    function toggleMenu() {
        navbar.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        
        // Toggle between bars and times icon
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links (mobile)
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navbar.classList.contains('active')) {
            toggleMenu();
        }
    });
});










const testimonials = [
    { text: "This hospital provided exceptional care and support during my treatment!", name: "Riya Raut" },
    { text: "The doctors and nurses were very kind and professional. Highly recommended!", name: "Shravani M" },
    { text: "I felt safe and well taken care of. Thank you for the amazing service!", name: "Shruti Navghare" }
];

let currentIndex = 0;

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    document.getElementById("testimonial-text").innerText = `"${testimonials[currentIndex].text}"`;
    document.getElementById("patient-name").innerText = `- ${testimonials[currentIndex].name}`;
}