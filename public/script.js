document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home').classList.add('active');

    let moreDetailsButtons = document.querySelectorAll('.more-details');
    moreDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            let details = button.nextElementSibling;
            details.classList.toggle('active');
        });
    });

    let silvermore = document.querySelectorAll('.silver-more');
    silvermore.forEach(button => {
        button.addEventListener('click', () => {
            let details = button.nextElementSibling;
            details.classList.toggle('active');
        });
    });

    function initializeSlider(containerSelector) {
        let prevBtn = document.querySelector(`${containerSelector} .prev-btn`);
        let nextBtn = document.querySelector(`${containerSelector} .next-btn`);
        let slider = document.querySelector(`${containerSelector} .slider`);
        let slides = document.querySelectorAll(`${containerSelector} .slide`);
        let currentIndex = 0;

        function updateNavigationButtons() {
            prevBtn.style.display = currentIndex === 0 ? 'none' : 'inline-flex';
            nextBtn.style.display = currentIndex === slides.length - 1 ? 'none' : 'inline-flex';
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateNavigationButtons();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateNavigationButtons();
            }
        });

        updateNavigationButtons();
    }

    initializeSlider('#package');
    initializeSlider('#event');

    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.addEventListener('scroll', () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });

                sections.forEach(sec => {
                    sec.classList.remove('active');
                });

                sec.classList.add('active');
            }
        });
    });

    const bookNowButtons = document.querySelectorAll('.book, .book-silver');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.popup .close');

    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    };

    const phoneForm = document.getElementById('phone-form');
    phoneForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phoneNumber = document.getElementById('phone-number').value;

        fetch('https://v7studio.onrender.com/save-phone-number', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, phoneNumber: phoneNumber }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            popup.style.display = 'none';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
