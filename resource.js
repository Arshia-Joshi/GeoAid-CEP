let slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove("active");
    });
    slides[currentIndex].classList.add("active");
    currentIndex = (currentIndex + 1) % slides.length;
}

showSlides(); 
setInterval(showSlides, 3000); 
