/* * JavaScript for Cakes & Moulds
 * This file adds interactivity to the website.
 */

// We wrap all our code in this event listener.
// This makes sure the JavaScript doesn't run until the
// HTML page is fully loaded and ready.
document.addEventListener('DOMContentLoaded', () => {

    console.log("Cakes & Moulds site loaded and script.js is running!");

    // --- Example 1: Make navigation links scroll smoothly ---
    // Selects all navigation links that start with a '#'
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // 1. Stop the browser's default "jump" behavior
            event.preventDefault(); 
            
            // 2. Get the ID of the section to scroll to (e.g., "#menu")
            const targetId = link.getAttribute('href');
            
            // 3. Find that section on the page
            const targetSection = document.querySelector(targetId);
            
            // 4. Tell the browser to scroll to it smoothly
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // --- Example 2: Show a (fake) "Add to Cart" message ---
    // Selects all the product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // 1. Get the name of the product from inside the card
            // .querySelector('h4') finds the <h4> element *within* this specific card
            const productName = card.querySelector('h4').textContent;
            
            // 2. Show a simple pop-up alert
            alert(`You clicked on ${productName}! This could be an "Add to Cart" button.`);
        });
    });


    // --- Example 3: A simple "Welcome" alert on the "Browse Menu" button ---
    const menuButton = document.querySelector('.cta-button');
    
    // We can add more than one 'click' listener to an element
    menuButton.addEventListener('click', () => {
        console.log("Hero button clicked!");
        // Note: This will fire *in addition* to the smooth scroll,
        // because the smooth scroll is on the nav links (which this button also is)
    });

});
