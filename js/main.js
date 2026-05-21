let cart = [];

function toggleCart() {
    document.getElementById('side-cart').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
}

document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', () => {
        // Récupération des infos du produit
        const name = button.parentElement.querySelector('h3').innerText;
        const price = parseFloat(button.parentElement.querySelector('.price').innerText);
        
        // Ajout au tableau avec un ID unique pour pouvoir le supprimer facilement
        const item = { id: Date.now(), name, price };
        cart.push(item);
        
        updateCart();
        if(!document.getElementById('side-cart').classList.contains('open')) toggleCart();
    });
});

// Nouvelle fonction pour retirer un article
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const itemsContainer = document.getElementById('cart-items');
    const count = document.getElementById('cart-count');
    const total = document.getElementById('total-price');
    
    itemsContainer.innerHTML = "";
    let totalSum = 0;
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align:center; color:#555;">Ton panier est vide 🍁</p>';
    } else {
        cart.forEach(item => {
            totalSum += item.price;
            itemsContainer.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #222; padding-bottom:10px;">
                    <div>
                        <div style="font-weight:bold; font-size:0.9rem;">${item.name}</div>
                        <div style="color:var(--primary-cyan); font-size:0.8rem;">${item.price.toFixed(2)}$</div>
                    </div>
                    <button onclick="removeItem(${item.id})" style="background:none; border:none; color:var(--secondary-pink); cursor:pointer; font-size:0.7rem; text-transform:uppercase; font-weight:bold;">
                        Retirer
                    </button>
                </div>`;
        });
    }
    
    count.innerText = cart.length;
    total.innerText = totalSum.toFixed(2);
}