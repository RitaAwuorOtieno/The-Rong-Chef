// Menu Data
const menuData = {
    appetizers: [
        { name: "Truffle Arancini", description: "Crispy risotto balls with mozzarella and black truffle", price: "$12", img: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400" },
        { name: "Bruschetta Trio", description: "Classic tomato, mushroom truffle, and roasted pepper", price: "$10", img: "https://images.unsplash.com/photo-1572695157366-1e2f0d2f6f4f?w=400" }
    ],
    mains: [
        { name: "Wild Mushroom Risotto", description: "Creamy arborio rice with wild mushrooms and parmesan", price: "$24", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400" },
        { name: "Grilled Salmon", description: "With lemon butter sauce and seasonal vegetables", price: "$28", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" },
        { name: "Beef Wellington", description: "Premium beef wrapped in puff pastry", price: "$36", img: "https://images.unsplash.com/photo-1546833998-877b37c2e5c3?w=400" }
    ],
    desserts: [
        { name: "Molten Chocolate Cake", description: "With vanilla ice cream", price: "$9", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" },
        { name: "Crème Brûlée", description: "Classic vanilla bean custard", price: "$8", img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400" }
    ]
};

// Featured Dishes (for homepage)
const featuredDishes = [
    { name: "Chef's Signature Pasta", description: "Handmade pasta with secret family sauce", price: "$26", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400" },
    { name: "Lamb Rack", description: "Herb-crusted with red wine reduction", price: "$34", img: "https://images.unsplash.com/photo-1545243424-0ce743321e11?w=400" },
    { name: "Seafood Paella", description: "Fresh shrimp, mussels, and saffron rice", price: "$32", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400" }
];

// Gallery Images
const galleryImages = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600"
];

// Load Featured Dishes on Homepage
function loadFeaturedDishes() {
    const container = document.getElementById('featured-dishes');
    if (!container) return;
    
    container.innerHTML = featuredDishes.map(dish => `
        <div class="dish-card">
            <img src="${dish.img}" alt="${dish.name}" loading="lazy">
            <h3>${dish.name}</h3>
            <p>${dish.description}</p>
            <span class="price">${dish.price}</span>
        </div>
    `).join('');
}

// Load Full Menu
function loadMenu(category = 'all') {
    const container = document.getElementById('menu-container');
    if (!container) return;
    
    let items = [];
    if (category === 'all') {
        items = [...menuData.appetizers, ...menuData.mains, ...menuData.desserts];
    } else {
        items = menuData[category] || [];
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

// Load Gallery
function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;
    
    container.innerHTML = galleryImages.map((img, index) => `
        <div class="gallery-item">
            <img src="${img}" alt="Dish ${index + 1}" loading="lazy" onclick="openLightbox('${img}')">
        </div>
    `).join('');
}

// Lightbox functionality
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightbox.style.display = 'block';
        lightboxImg.src = imgSrc;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Category filter buttons
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

// Smooth scroll for anchor links
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

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedDishes();
    loadMenu();
    loadGallery();
    initMobileMenu();
    initCategoryFilters();
    initSmoothScroll();
    
    // Close lightbox when clicking close button or outside
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
});