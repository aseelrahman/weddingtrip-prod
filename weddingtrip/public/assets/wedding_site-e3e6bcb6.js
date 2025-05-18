document.addEventListener("DOMContentLoaded", function() {
    // Set responsive backgrounds on load and resize
    function setResponsiveBackgrounds() {
        const slides = document.querySelectorAll('.slide');
        const isMobile = window.innerWidth <= 767;
        
        slides.forEach(slide => {
            const bgImage = isMobile ? 
                slide.getAttribute('data-mobile-bg') : 
                slide.getAttribute('data-desktop-bg');
            
            if (bgImage) {
                slide.style.backgroundImage = `url('${bgImage}')`;
            }
        });
    }
    
    // Apply responsive backgrounds
    setResponsiveBackgrounds();
    
    // Reapply backgrounds when window is resized
    window.addEventListener('resize', setResponsiveBackgrounds);
    
    // Right to left fade animation for changing words
    function setupRightLeftFadeAnimation() {
        const wordElement = document.querySelector('.changing-word');
        if (!wordElement) return;
        
        const words = ['Perfect', 'Beautiful', 'Magical', 'Special', 'Dream'];
        let currentWordIndex = 0;
        
        // Initial word
        wordElement.textContent = words[currentWordIndex];
        
        // Change word every 3 seconds
        setInterval(function() {
            // Reset animation
            wordElement.style.animation = 'none';
            // Trigger browser reflow
            void wordElement.offsetWidth;
            // Restart animation
            wordElement.style.animation = 'fadeRightLeft 3s ease-in-out';
            
            // Update to next word
            currentWordIndex = (currentWordIndex + 1) % words.length;
            wordElement.textContent = words[currentWordIndex];
        }, 3000);
    }
    
    // Initialize right-to-left fade animation
    setupRightLeftFadeAnimation();
    
    // Splash screen animation - iOS compatible version
    const splashScreen = document.getElementById('splash-screen');
    
    // Safety check to prevent errors if the splash screen element isn't found
    if (splashScreen) {
        // Use requestAnimationFrame for smoother animation on iOS
        requestAnimationFrame(function() {
            // After 3 seconds (or your preferred timing), scale down the logo and fade out
            setTimeout(function() {
                // Logo will animate based on the CSS keyframes
                
                // After animation completes, fade out the splash screen
                setTimeout(function() {
                    // Use RAF again for the class change - helps with iOS rendering
                    requestAnimationFrame(function() {
                        splashScreen.classList.add('fade-out');
                        
                        // After the fade animation completes, hide the splash screen
                        setTimeout(function() {
                            splashScreen.classList.add('hidden');
                            document.body.classList.add('loaded');
                        }, 1000); // Matches the transition duration in CSS
                    });
                }, 2500); // Match this to your CSS animation duration
            }, 500); // Small delay to ensure everything is loaded properly
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });
    
    // Hero slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slideCount = slides.length;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip links with just "#"
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
    
    // NEW CODE: Close navbar when clicking outside
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // Add click event listener to the document
    document.addEventListener('click', function(event) {
        // Check if navbar is expanded
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            // Check if the click is outside the navbar and not on the toggler button
            const isClickInsideNavbar = navbarCollapse.contains(event.target);
            const isClickOnToggler = navbarToggler.contains(event.target);
            
            if (!isClickInsideNavbar && !isClickOnToggler) {
                // Simulate a click on the toggler to close the navbar
                navbarToggler.click();
            }
        }
    });
    
    console.log("Wedding site JS loaded with right-to-left fade animation and auto-close navbar"); // Updated debug message
});