document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('photo', document.getElementById('file-upload').files[0]);
    formData.append('location', document.getElementById('location').value);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    
    if (data.image_url) {
        addImageToCarousel(data.image_url, data.location, data.filename);
    }
});

function addImageToCarousel(imageUrl, location, filename) {
    let slider = document.querySelector('.slides');

    let newSlide = document.createElement('div');
    newSlide.classList.add('slide');
    
    let img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'User Uploaded Image';

    let caption = document.createElement('div');
    caption.classList.add('caption');
    caption.innerText = `Location: ${location}`;

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = function () {
        deletePhoto(newSlide, filename);
    };

    newSlide.appendChild(img);
    newSlide.appendChild(caption);
    newSlide.appendChild(deleteButton);

    slider.prepend(newSlide); // Add the new image at the beginning
}

async function deletePhoto(slideElement, filename) {
    const response = await fetch('/delete_photo', {
        method: 'POST',
        body: JSON.stringify({ filename }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (data.success) {
        slideElement.remove(); // Remove the image from the carousel
    } else {
        alert('Error deleting the image');
    }
}

// ---------------- Carousel Sliding Logic ----------------

let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100; // Move by 100% of container width
    slides.style.transform = `translateX(${offset}%)`;
}

// Auto-slide every 5 seconds
setInterval(() => moveSlide(1), 5000);




