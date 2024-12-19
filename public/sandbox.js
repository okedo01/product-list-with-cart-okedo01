const listItemsHTML = document.querySelector('.list-items');
const emptyCart = document.querySelector('.cart-empty');
const selectedCart = document.querySelector('.cart-selected');
const quantity = document.querySelector('#quantity');
let listItems = [];
let carts = [];

listItemsHTML.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-to-cart')) {

        emptyCart.style.display = 'none';
        selectedCart.style.display = 'block';

        let productId = e.target.parentElement.dataset.id;
        addToCart(productId);
        
    }
    
})

const addToCart = (productId) => {
    let productIndexInCart = carts.findIndex((index) => {
        return index.productId === productId;
    })

    if(carts.length <= 0) {
        carts = [{
            productId: productId,
            quantity: 1
        }]
    } else  if(productIndexInCart < 0) {
        carts.push({
            productId: productId,
            quantity: 1
        })
    } else {
        carts[productIndexInCart].quantity = carts[productIndexInCart].quantity + 1;
    }

    addCartToHTML(carts);
    
}

const addCartToHTML = () => {
    console.log(carts);
    
}

const addDataToHTML = (data) => {
    listItemsHTML.innerHTML = '';
    if(listItems.length > 0) {
        listItems.forEach((item, index) => {
            const listDiv = document.createElement('div');

            listDiv.setAttribute("data-id", index + 1);
            
            listDiv.innerHTML = `
            
                <img src="./${item.image.thumbnail}" alt="Baklava" class="w-full rounded-2xl">
                <button class="add-to-cart flex justify-center items-center gap-4 bg-rose50 rounded-3xl px-7 py-3 cursor-pointer">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="add-to-cart">
                    Add to Cart
                </button>
                <div class="my-5">
                    <h4 class="text-rose400 text-sm">${item.category}</h4>
                    <p class="text-rose900">${item.name}</p>
                    <div class="text-primary">$${item.price}</div>
                </div>
            `
            listItemsHTML.appendChild(listDiv)  
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
            listItems = data
            addDataToHTML(data);
        })
        .catch(err => {
            alert(err.message);
        })
}
getData();



