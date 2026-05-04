const dishes = [
    { name: "Spicy Lamb Curry", desc: "Slow-cooked with 12 spices", price: "$18", img: "images/lamb.jpg" },
    { name: "Chef's Special Biryani", desc: "Aromatic basmati rice", price: "$22", img: "images/biryani.jpg" }
];

function loadMenu() {
    const container = document.getElementById('menu-container');
    if(!container) return;
    
    container.innerHTML = dishes.map(dish => `
        <div class="menu-card">
            <img src="${dish.img}" alt="${dish.name}">
            <h3>${dish.name}</h3>
            <p>${dish.desc}</p>
            <span class="price">${dish.price}</span>
        </div>
    `).join('');
}

loadMenu();