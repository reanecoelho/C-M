/* * JavaScript for Cakes & Moulds
 * This file adds interactivity to the website.
 */

// This waits for the HTML document to be ready, which is fast!
document.addEventListener('DOMContentLoaded', () => {

    console.log("Cakes & Moulds site loaded and script.js is running!");

    // --- 1. LOADER LOGIC ---
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        // Add the 'hidden' class to trigger the CSS fade-out
        loader.classList.add('hidden');
        console.log("Loader hidden!");
    } else {
        console.log("Loader not found.");
    }

    // --- 2. Make navigation links scroll smoothly ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 3. Redirect product clicks to Instagram ---
    // This now selects ALL product cards, in the carousel OR grid
    const productCards = document.querySelectorAll('.product-card, .masonry-card');
    const instagramUrl = "https://www.instagram.com/cakes_and_moulds";

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.querySelector('h4, h3').textContent; // Gets h4 (product) or h3 (category)
            console.log(`Clicked on ${productName}! Redirecting to Instagram...`);
            
            // This opens your Instagram profile in a new tab
            window.open(instagramUrl, '_blank');
        });
    });

    // --- 4. A simple console log on the "Browse Menu" button ---
    const menuButton = document.querySelector('.cta-button');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            console.log("Hero button clicked!");
        });
    }

    // --- 5. NEW: Carousel Logic ---
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carouselWrapper && prevBtn && nextBtn) {
        
        // Function to scroll the carousel
        const scrollCarousel = (direction) => {
            const slideWidth = carouselWrapper.querySelector('.carousel-slide').clientWidth;
            const slideMargin = parseFloat(window.getComputedStyle(carouselWrapper.querySelector('.carousel-slide')).marginRight);
            const scrollAmount = slideWidth + slideMargin;

            if (direction === 'next') {
                carouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                carouselWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        };

        // Go to the next slide
        nextBtn.addEventListener('click', () => {
            scrollCarousel('next');
        });

        // Go to the previous slide
        prevBtn.addEventListener('click', () => {
            scrollCarousel('prev');
        });
    
    } else {
        console.log("Carousel elements not found.");
    }

}); // <-- End of the DOMContentLoaded listener

