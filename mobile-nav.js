// Mobile Navigation functionality
(function() {
  function initMobileNav() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        
        if (isOpen) {
          // Close menu
          mobileMenu.classList.remove('translate-x-0');
          mobileMenu.classList.add('-translate-x-full');
          overlay.classList.add('hidden');
          document.body.style.overflow = '';
        } else {
          // Open menu
          mobileMenu.classList.remove('-translate-x-full');
          mobileMenu.classList.add('translate-x-0');
          overlay.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    }
    
    // Close menu when clicking overlay
    if (overlay) {
      overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
    
    // Close menu when clicking on menu items
    const mobileMenuItems = document.querySelectorAll('#mobile-menu a');
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) { // md breakpoint
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', initMobileNav);
})(); 