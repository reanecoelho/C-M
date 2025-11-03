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
    // Updated selector to get links from the new nav AND the "how to order" link
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
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.classList.contains('menu-open')) {
                mobileMenu.classList.remove('menu-open');
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

    // --- 5. Carousel Logic ---
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

    // --- 6. NEW: Hamburger Menu Logic ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('menu-open');
        });
    }

    // --- 7. NEW: "How to Order" Modal Logic ---
    const modalOverlay = document.getElementById('modal-overlay');
    const orderLink = document.getElementById('how-to-order-link');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (modalOverlay && orderLink && modalCloseBtn) {
        // Open modal
        orderLink.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('modal-visible');
        });
        
        // Close modal with button
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('modal-visible');
        });

        // Close modal by clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('modal-visible');
            }
        });
    }

    // --- 8. NEW: Scroll to Top Button Logic ---
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 9. NEW: Dynamic Scroll Reveal Logic ---
    // Use IntersectionObserver for better performance
    const sectionsToReveal = document.querySelectorAll('.reveal-on-scroll');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // relative to the viewport
        threshold: 0.1 // 10% of the item must be visible
    });

    // Observe each section
    sectionsToReveal.forEach(section => {
        revealObserver.observe(section);
    });

}); // <-- End of the DOMContentLoaded listener

