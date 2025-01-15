const listItemsHTML = document.querySelector('.list-items');
const emptyCart = document.querySelector('.cart-empty');
const selectedCart = document.querySelector('.result');

let listFood = [];
let listCarts = [];

// Add event listener to the list items container
listItemsHTML.addEventListener('click', (e) => {
    const addToCartBtn = e.target.closest('.add-to-cart');
    const incrementBtn = e.target.closest('.increment');
    const decrementBtn = e.target.closest('.decrement');

    if (addToCartBtn) {
        const foodId = addToCartBtn.closest('[data-id]').dataset.id;
        addToCart(foodId);

        // Replace Add to Cart button with increment and decrement buttons
        const parentDiv = addToCartBtn.parentElement;
        parentDiv.innerHTML = `
            <img src="./${item.image.thumbnail}" alt="${item.name}" class="w-full rounded-2xl">
            <div class="icons flex justify-between items-center py-3 px-4 bg-primary rounded-3xl">
                <img src="./assets/images/icon-increment-quantity.svg" alt="Increment Quantity" class="increment bg-rose400 rounded-xl p-2 cursor-pointer">
                <p class="quantity-display">${getQuantity(foodId)}</p>
                <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement Quantity" class="decrement bg-rose400 rounded-xl px-2 py-3 cursor-pointer">
            </div>
        `;
    } else if (incrementBtn) {
        const foodId = incrementBtn.closest('[data-id]').dataset.id;
        incrementQuantity(foodId);
    } else if (decrementBtn) {
        const foodId = decrementBtn.closest('[data-id]').dataset.id;
        decrementQuantity(foodId);
    }
});

// Add item to cart
const addToCart = (foodId) => {
    const foodIndexInCart = listCarts.findIndex((item) => item.foodId === foodId);

    if (foodIndexInCart === -1) {
        listCarts.push({ foodId, quantity: 1 });
    } else {
        listCarts[foodIndexInCart].quantity++;
    }

    updateCart();
};

// Increment quantity
const incrementQuantity = (foodId) => {
    const foodIndexInCart = listCarts.findIndex((item) => item.foodId === foodId);
    if (foodIndexInCart !== -1) {
        listCarts[foodIndexInCart].quantity++;
    }
    updateCart();
};

// Decrement quantity
const decrementQuantity = (foodId) => {
    const foodIndexInCart = listCarts.findIndex((item) => item.foodId === foodId);
    if (foodIndexInCart !== -1) {
        listCarts[foodIndexInCart].quantity--;
        if (listCarts[foodIndexInCart].quantity === 0) {
            listCarts.splice(foodIndexInCart, 1);
        }
    }
    updateCart();
};

// Get the quantity of a specific item
const getQuantity = (foodId) => {
    const food = listCarts.find((item) => item.foodId === foodId);
    return food ? food.quantity : 0;
};

// Update the cart display
const updateCart = () => {
    addCartToHTML();
    addCartToLocalStorage();
};

addCartToLocalStorage = () => {
    localStorage.setItem('carts', JSON.stringify(listCarts));
};

// Add cart items to HTML
const addCartToHTML = () => {
    selectedCart.innerHTML = ``;

    let totalPrice = 0;
    let quantity = 0;

    if (listCarts.length > 0) {
        listCarts.forEach((cart) => {
            const foodInfo = listFood.find((food, idx) => idx + 1 === parseInt(cart.foodId));
            const totalItemPrice = foodInfo.price * cart.quantity;

            totalPrice += totalItemPrice;
            quantity += cart.quantity;

            const cartDiv = document.createElement('div');
            cartDiv.classList.add('result');
            cartDiv.innerHTML = `
                <div class="mb-3 border-b-2 border-l-rose300 pb-3">
                    <p>${foodInfo.name}</p>
                    <div class="flex justify-between">
                        <p>x${cart.quantity}</p>
                        <div>itemPrice: ${foodInfo.price.toFixed(2)}</div>
                        <div>totalPrice: ${totalItemPrice.toFixed(2)}</div>
                        <img src="./assets/images/icon-remove-item.svg" class="delete border-2 border-r-rose100 bg-rose100 rounded-3xl p-1 cursor-pointer">
                    </div>
                </div>
            `;
            selectedCart.appendChild(cartDiv);
        });

        document.querySelector('.total-price').innerHTML = `$${totalPrice.toFixed(2)}`;
        document.querySelector('#quantity').innerHTML = `<span>(${quantity})</span>`;
    }
};

// Fetch food data and initialize the app
const getData = () => {
    fetch('./data/data.json')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            listFood = data;
            addDataToHTML(data);

            if (localStorage.getItem('carts')) {
                listCarts = JSON.parse(localStorage.getItem('carts'));
                addCartToHTML();
            }
        })
        .catch((err) => {
            alert(err.message);
        });
};

// Add food items to HTML
const addDataToHTML = (data) => {
    listItemsHTML.innerHTML = '';
    data.forEach((item, index) => {
        const foodDiv = document.createElement('div');
        foodDiv.setAttribute('data-id', index + 1);
        foodDiv.innerHTML = `
            <img src="./${item.image.thumbnail}" alt="${item.name}" class="w-full rounded-2xl">
            <button class="add-to-cart flex justify-center items-center gap-4 bg-rose50 rounded-3xl px-7 py-3 cursor-pointer">
                <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart">
                Add to Cart
            </button>
            <div class="my-5">
                <h4 class="text-rose400 text-sm">${item.category}</h4>
                <p class="text-rose900">${item.name}</p>
                <div class="text-primary">$${item.price.toFixed(2)}</div>
            </div>
        `;
        listItemsHTML.appendChild(foodDiv);
    });
};

getData();
