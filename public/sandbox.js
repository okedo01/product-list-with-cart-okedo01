const listItemsHTML = document.querySelector('.list-items');
const emptyCart = document.querySelector('.cart-empty');
const selectedCart = document.querySelector('.result');

let listFood = [];
let listCarts = [];

selectedCart.addEventListener('click', (e) => {
    const deleteIcon = e.target.classList.contains('delete');
    
    if(deleteIcon) {
        console.log(selectedCart.parentElement);
        
    }
})

listItemsHTML.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-to-cart')) {

        emptyCart.style.display = 'none';
        selectedCart.style.display = 'block';

        let foodId = e.target.parentElement.dataset.id;
        addToCart(foodId);
        
    }
    
})

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
    
    addCartToHTML(listCarts);
    
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
            let info = listFood[posOfFoodInCart]
            
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
        })
        .catch(err => {
            alert(err.message);
        })
}
getData();



