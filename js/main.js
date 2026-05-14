/* ====================================
   THE RONG CHEF - MAIN JAVASCRIPT
   ==================================== */

// ---------- MENU DATA ----------
const menuData = {
    appetizers: [
        { 
            name: "Truffle Arancini", 
            description: "Crispy risotto balls with mozzarella and black truffle", 
            price: "$12", 
            img: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400" 
        },
        { 
            name: "Bruschetta Trio", 
            description: "Classic tomato, mushroom truffle, and roasted pepper", 
            price: "$10", 
            img: "https://images.unsplash.com/photo-1572695157366-1e2f0d2f6f4f?w=400" 
        },
        { 
            name: "Crispy Calamari", 
            description: "Lightly fried with spicy aioli and lemon", 
            price: "$14", 
            img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400" 
        }
    ],
    mains: [
        { 
            name: "Wild Mushroom Risotto", 
            description: "Creamy arborio rice with wild mushrooms and parmesan", 
            price: "$24", 
            img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400" 
        },
        { 
            name: "Grilled Salmon", 
            description: "With lemon butter sauce and seasonal vegetables", 
            price: "$28", 
            img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" 
        },
        { 
            name: "Beef Wellington", 
            description: "Premium beef wrapped in puff pastry with mushroom duxelles", 
            price: "$36", 
            img: "https://images.unsplash.com/photo-1546833998-877b37c2e5c3?w=400" 
        },
        { 
            name: "Chef's Special Pasta", 
            description: "Handmade pasta with secret family sauce", 
            price: "$26", 
            img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400" 
        }
    ],
    desserts: [
        { 
            name: "Molten Chocolate Cake", 
            description: "Warm chocolate cake with vanilla ice cream", 
            price: "$9", 
            img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" 
        },
        { 
            name: "Crème Brûlée", 
            description: "Classic vanilla bean custard with caramelized top", 
            price: "$8", 
            img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400" 
        },
        { 
            name: "Tiramisu", 
            description: "Layered coffee-soaked ladyfingers with mascarpone", 
            price: "$10", 
            img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" 
        }
    ]
};

// ---------- FEATURED DISHES ----------
const featuredDishes = [
    { 
        name: "Chef's Signature Pasta", 
        description: "Handmade pasta with secret family sauce", 
        price: "$26", 
        img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400" 
    },
    { 
        name: "Herb Crusted Lamb Rack", 
        description: "With red wine reduction and seasonal vegetables", 
        price: "$34", 
        img: "https://images.unsplash.com/photo-1545243424-0ce743321e11?w=400" 
    },
    { 
        name: "Seafood Paella", 
        description: "Fresh shrimp, mussels, calamari, and saffron rice", 
        price: "$32", 
        img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400" 
    }
];

// ---------- GALLERY IMAGES ----------
const galleryImages = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600"
];

// This function is now handled by Firebase
// Remove the old loadFeaturedDishes function to avoid conflicts
window.oldLoadFeaturedDishes = window.loadFeaturedDishes;
window.loadFeaturedDishes = () => {
    // Do nothing - Firebase handles it
    console.log('Featured dishes managed by Firebase');
};

// ---------- LOAD MENU ----------
function loadMenu(category = 'all') {
    const container = document.getElementById('menu-container');
    if (!container) return;
    
    let items = [];
    if (category === 'all') {
        items = [...menuData.appetizers, ...menuData.mains, ...menuData.desserts];
    } else if (category === 'appetizers') {
        items = menuData.appetizers;
    } else if (category === 'mains') {
        items = menuData.mains;
    } else if (category === 'desserts') {
        items = menuData.desserts;
    }
    
    if (items.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:2rem;">No items in this category yet.</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="menu-card">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
        </div>
    `).join('');
}

// ---------- LOAD GALLERY ----------
function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;
    
    container.innerHTML = galleryImages.map((img, index) => `
        <div class="gallery-item">
            <img src="${img}" alt="Dish ${index + 1}" loading="lazy" onclick="openLightbox('${img}')">
        </div>
    `).join('');
}

// ---------- LIGHTBOX FUNCTIONALITY ----------
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightbox.style.display = 'flex';
        lightboxImg.src = imgSrc;
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ---------- MOBILE MENU TOGGLE ----------
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// ---------- MENU CATEGORY FILTERS ----------
function initCategoryFilters() {
    const buttons = document.querySelectorAll('.category-btn');
    if (buttons.length === 0) return;
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            loadMenu(category);
        });
    });
}

// ---------- SMOOTH SCROLL ----------
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ---------- FORM VALIDATION ----------
function initFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc3545';
                
                // Remove error styling on input
                field.addEventListener('input', function() {
                    this.style.borderColor = '#ddd';
                }, { once: true });
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
}

// ---------- SCROLL REVEAL ANIMATION ----------
function initScrollReveal() {
    const elements = document.querySelectorAll('.dish-card, .menu-card, .testimonial, .value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ---------- SET ACTIVE NAVIGATION LINK ----------
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ---------- UPDATE FOOTER YEAR ----------
function updateFooterYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
    }
}

// ---------- INITIALIZE EVERYTHING ----------
document.addEventListener('DOMContentLoaded', () => {
    // Load content
    loadFeaturedDishes();
    loadMenu();
    loadGallery();
    
    // Initialize features
    initMobileMenu();
    initCategoryFilters();
    initSmoothScroll();
    initFormValidation();
    initScrollReveal();
    setActiveNavLink();
    updateFooterYear();
    
    // Lightbox event listeners
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
});

// Make functions available globally
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;