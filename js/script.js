const testimonials = [
    { text: "This hospital provided exceptional care and support during my treatment!", name: "John Doe" },
    { text: "The doctors and nurses were very kind and professional. Highly recommended!", name: "Emily Smith" },
    { text: "I felt safe and well taken care of. Thank you for the amazing service!", name: "Michael Brown" }
];

let currentIndex = 0;

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    document.getElementById("testimonial-text").innerText = `"${testimonials[currentIndex].text}"`;
    document.getElementById("patient-name").innerText = `- ${testimonials[currentIndex].name}`;
}