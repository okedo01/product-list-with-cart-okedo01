const listItemsHTML = document.querySelector('.list-items');
const emptyCart = document.querySelector('.cart-empty');
const selectedCart = document.querySelector('.result');

let listFood = [];
let listCarts = [];

listItemsHTML.addEventListener('click', (e) => {
    const addToCartBtn = e.target.closest('.add-to-cart');
    const incrementBtn = e.target.closest('.increment');
    const decrementBtn = e.target.closest('.decrement');
    
    // if(e.target.classList.contains('add-to-cart')) {
    if(addToCartBtn) {

        emptyCart.style.display = 'none';
        selectedCart.style.display = 'block';

        let foodId = e.target.parentElement.dataset.id;
        addToCart(foodId);   

        const parentDiv = addToCartBtn.parentElement;
        console.log(parentDiv);
        
        parentDiv.innerHTML = `
            <div class="icons flex justify-between items-center py-3 px-4 bg-primary rounded-3xl">
                    <img src="./assets/images/icon-increment-quantity.svg" alt="icon-increment-quantity" class="increment bg-rose400 rounded-xl p-2 cursor-pointer">
                    <p>${foodId}</p>
                <img src="./assets/images/icon-decrement-quantity.svg" alt="icon-decrement-quantity" class="decrement bg-rose400 rounded-xl px-2 py-3 cursor-pointer">
            </div>   
        `;
    }else if(incrementBtn) {
        // let foodId = incrementBtn.closest('[data-id]').dataset.id;
        let foodId = e.target.parentElement.parentElement.dataset.id;
        incrementQuantity(foodId)
    }else if(decrementBtn) {
        // let foodId = decrementBtn.closest('[data-id]').dataset.id;
        let foodId = e.target.parentElement.parentElement.dataset.id;
        decrementQuantity(foodId)
    }
})

selectedCart.addEventListener('click', (e) => {
    const deleteIcon = e.target.closest('.delete'); // Check if delete button is clicked
    // const deleteIcon = e.target.parentElement.lastElementChild;

    if (deleteIcon) {
        deleteFromCart(deleteIcon); // Pass the clicked delete icon to the function
    }
});

const deleteFromCart = (deleteIcon) => {
    // const foodIdi = deleteIcon.closest('[data-id]').dataset.id;
    let foodId = deleteIcon.parentElement.parentElement.dataset.id;
    const deleteIndex = listCarts.findIndex(value => {
        return value.foodId === foodId;
    })
    if (deleteIndex !== -1) {
        listCarts.splice(deleteIndex, 1); // Remove the item from the array
    }
    console.log(foodId);
    
    updateCart();
}

const addToCart = (foodId) => {
    let foodIndexInCart = listCarts.findIndex((index) => {
        return index.foodId === foodId;
    })

    if(listCarts.length <= 0) {
        listCarts = [{
            foodId: foodId,
            quantity: 1
        }]
    } else if(foodIndexInCart < 0) {
        listCarts.push({
            foodId: foodId,
            quantity: 1
        })
    } else {
        listCarts[foodIndexInCart].quantity = listCarts[foodIndexInCart].quantity + 1;
    }
    updateCart();
}

const incrementQuantity = (foodId) => {
    let foodIndexInCart = listCarts.findIndex(value => {
        return value.foodId === foodId;
    })
    if(foodIndexInCart !== -1) {
        listCarts[foodIndexInCart].quantity++;
    }
    updateCart();
}

const decrementQuantity = (foodId) => {
    let foodIndexInCart = listCarts.findIndex(value => {
        return value.foodId === foodId;
    })
    if(foodIndexInCart !== -1) {
        listCarts[foodIndexInCart].quantity--;
        if(listCarts[foodIndexInCart].quantity === 0) {
            listCarts.splice(foodIndexInCart, 1);
        }
    }
    updateCart();
}



const updateCart = () => {
    addCartToHTML(listCarts);
    addCartToLocalStorage();
}

addCartToLocalStorage = () => {
    localStorage.setItem('carts', JSON.stringify(listCarts));
}

const addCartToHTML = () => {
    selectedCart.innerHTML = ``;

    let totalPrice = 0;
    let quantity = 0;

    if(listCarts.length > 0) {
        listCarts.forEach((cart, index) => {
            let cartDiv = document.createElement('div');
            cartDiv.classList.add('result');

            let posOfFoodInCart = listFood.findIndex((food, idx) => idx + 1 === parseInt(cart.foodId));
            let info = listFood[posOfFoodInCart];
            
            let totalItemPrice = info.price * cart.quantity;

            totalPrice = totalPrice + totalItemPrice;

            quantity = quantity + cart.quantity;
            
            cartDiv.innerHTML = `
                
                <div class="mb-3 border-b-2 border-l-rose300 pb-3">
                    <p>${info.name}</p>
                    <div class="flex justify-between">
                        <p>x${cart.quantity}</p>
                        <div>itemPrice: ${info.price.toFixed(2)}</div>
                        <div>totalPrice: ${totalItemPrice.toFixed(2)}</div>
                        <img src="./assets/images/icon-remove-item.svg" class="delete border-2 border-r-rose100 bg-rose100 rounded-3xl p-1 cursor-pointer">
                    </div>
                    
                </div>
            `;
            selectedCart.appendChild(cartDiv);
            
        });
        document.querySelector('.total-price').innerHTML = totalPrice.toFixed(2);
        document.querySelector('#quantity').innerHTML = `<span>(${quantity})</span>`;
    }
}

const addDataToHTML = (data) => {
    listItemsHTML.innerHTML = '';
    let quantity = 0;
    if(listFood.length > 0) {
        listFood.forEach((item, index) => {
            let foodDiv = document.createElement('div');

            foodDiv.setAttribute("data-id", index + 1);
            
            foodDiv.innerHTML = `
            
                <img src="./${item.image.thumbnail}" alt="Baklava" class="w-full rounded-2xl">
                <button class="add-to-cart flex justify-center items-center gap-4 bg-rose50 rounded-3xl px-7 py-3 cursor-pointer">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="add-to-cart">
                    Add to Cart
                </button>
                
                <div class="my-5">
                    <h4 class="text-rose400 text-sm">${item.category}</h4>
                    <p class="text-rose900">${item.name}</p>
                    <div class="text-primary">$${item.price.toFixed(2)}</div>
                </div>
            `
            listItemsHTML.appendChild(foodDiv)  
        })
    }
}

const getData = () => {
    fetch('./data/data.json')
        .then(res => {
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            return res.json();
            
        })
        .then(data => {
            listFood = data
            addDataToHTML(data);

           //store data to local storage
        if(localStorage.getItem('carts')) {
            listCarts = JSON.parse(localStorage.getItem('carts'));
            addCartToHTML();
           } 
        })
        .catch(err => {
            alert(err.message);
        })
}
getData();
