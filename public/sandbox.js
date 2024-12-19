const listItemsHTML = document.querySelector('.list-items');
let listItems = [];

const addDataToHTML = (data) => {
    listItemsHTML.innerHTML = '';
    if(listItems.length > 1) {
        listItems.forEach(item => {
            const listDiv = document.createElement('div')
            listDiv.classList.add('list-items');
            
            listDiv.innerHTML = `
            
                <img src="./${item.image.thumbnail}" alt="Baklava" class="w-96 rounded-2xl">
                <div class="add-to-cart flex justify-center items-center gap-4 bg-rose50 rounded-3xl px-7 py-3 cursor-pointer">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="add-to-cart">
                    <div>Add to Cart</div>
                </div>
                <div class="mt-4">
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



