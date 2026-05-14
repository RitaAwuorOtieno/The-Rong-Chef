// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, getDocs, query, orderBy, limit, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2671-k8-pU8gb5QmJWmMEWAIciAJsEeA",
    authDomain: "the-rong-chef.firebaseapp.com",
    projectId: "the-rong-chef",
    storageBucket: "the-rong-chef.firebasestorage.app",
    messagingSenderId: "9185728688",
    appId: "1:9185728688:web:5aeeaca66312de1051c375"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Make auth and db available globally
window.auth = auth;
window.db = db;

// Load testimonials from Firebase
async function loadFirebaseTestimonials() {
    const container = document.getElementById('dynamic-testimonials');
    if (!container) return;
    
    try {
        console.log('Loading testimonials from Firebase...');
        const q = query(collection(db, 'remarks'), orderBy('date', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        
        console.log('Found remarks:', querySnapshot.size);
        
        if (querySnapshot.empty) {
            container.innerHTML = `
                <div class="testimonial">
                    <p>No reviews yet. Be the first to leave a remark!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const remark = doc.data();
            container.innerHTML += `
                <div class="testimonial">
                    <div style="color: #ffd700; margin-bottom: 10px;">
                        ${'★'.repeat(remark.rating)}${'☆'.repeat(5-remark.rating)}
                    </div>
                    <p>"${escapeHtml(remark.text)}"</p>
                    <h4>- ${escapeHtml(remark.author)}</h4>
                    <small>${new Date(remark.date).toLocaleDateString()}</small>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading testimonials:', error);
        container.innerHTML = '<div class="testimonial">Unable to load reviews. Please try again later.</div>';
    }
}

// Load featured dishes from Firebase
async function loadFirebaseFeaturedDishes() {
    const container = document.getElementById('featured-dishes');
    if (!container) return;
    
    try {
        console.log('Loading featured dishes from Firebase...');
        const q = query(collection(db, 'featuredDishes'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        
        console.log('Found dishes:', querySnapshot.size);
        
        if (querySnapshot.empty) {
            return; // Let main.js handle default dishes
        }
        
        container.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const dish = doc.data();
            container.innerHTML += `
                <div class="dish-card">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                    <h3>${escapeHtml(dish.name)}</h3>
                    <p>${escapeHtml(dish.description)}</p>
                    <span class="price">${dish.price}</span>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading featured dishes:', error);
    }
}

// Check admin login status to show/hide admin link
function checkAdminStatus() {
    onAuthStateChanged(auth, (user) => {
        const adminLink = document.getElementById('admin-link');
        const loginLink = document.getElementById('login-link');
        
        if (adminLink) {
            if (user) {
                adminLink.style.display = 'inline-block';
                if (loginLink) loginLink.style.display = 'none';
            } else {
                adminLink.style.display = 'none';
                if (loginLink) loginLink.style.display = 'inline-block';
            }
        }
    });
}

// Save booking to Firebase
async function saveBookingToFirebase(bookingData) {
    try {
        await addDoc(collection(db, 'bookings'), {
            ...bookingData,
            submitted: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error saving booking:', error);
        return false;
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize Firebase features
function initFirebase() {
    console.log('Firebase initialized');
    loadFirebaseTestimonials();
    loadFirebaseFeaturedDishes();
    checkAdminStatus();
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebase);
} else {
    initFirebase();
}

// Make functions available globally
window.saveBookingToFirebase = saveBookingToFirebase;
window.loadFirebaseTestimonials = loadFirebaseTestimonials;