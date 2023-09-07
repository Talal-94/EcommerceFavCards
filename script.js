const items = [
    { id: 1, name: 'Item 1', description: 'shoes', favorite: false, imgUrl: 'https://contents.mediadecathlon.com/p2153181/k$be8bc3d9588b54af503e67bfa50b498b/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452'},
    { id: 2, name: 'Item 2', description: 'shoes', favorite: false, imgUrl: 'https://contents.mediadecathlon.com/p2153181/k$be8bc3d9588b54af503e67bfa50b498b/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452' },
    { id: 3, name: 'Item 3', description: 'shoes', favorite: false, imgUrl: 'https://contents.mediadecathlon.com/p2153181/k$be8bc3d9588b54af503e67bfa50b498b/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452' },
    { id: 4, name: 'Item 4', description: 'shoes', favorite: false, imgUrl: 'https://contents.mediadecathlon.com/p2153181/k$be8bc3d9588b54af503e67bfa50b498b/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452' },
    { id: 5, name: 'Item 5', description: 'shoes', favorite: false, imgUrl: 'https://contents.mediadecathlon.com/p2153181/k$be8bc3d9588b54af503e67bfa50b498b/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452' },
    { id: 6, name: 'Item 6', description: 'shoes', favorite: false, imgUrl: 'https://contents.mediadecathlon.com/p2153181/k$be8bc3d9588b54af503e67bfa50b498b/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452' },
    { id: 7, name: 'Item 7', description: 'shoes', favorite: false, imgUrl: 'https://contents.mediadecathlon.com/p2153181/k$be8bc3d9588b54af503e67bfa50b498b/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452' },

];

const itemsList = document.getElementById('items-list');
const favoritesList = document.getElementById('favorites-list');
const favoritesCount = document.getElementById('favorites-count');


function renderItems() {
    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="card m-2">
            <img src="${item.imgUrl}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <button ${item.favorite ? 'class="favorite"' : 'class="unfavorite"'} data-id="${item.id}"><i class="fa-solid fa-heart"></i></button>
            </div>
        </div>
         
        `;
        li.querySelector('button').addEventListener('click', toggleFavorite);
        itemsList.appendChild(li);
    });
}

function renderFavorites() {
    favoritesList.innerHTML = '';
    const favoriteItems = items.filter(item => item.favorite);
    favoriteItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        favoritesList.appendChild(li);
    });
    favoritesCount.textContent = favoriteItems.length;
}

function toggleFavorite(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.favorite = !item.favorite;
        saveItemsToLocalStorage(); 
        renderItems();
        renderFavorites();
    }
}


function saveItemsToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function loadItemsFromLocalStorage() {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        items.forEach(item => {
            const savedItem = parsedItems.find(savedItem => savedItem.id === item.id);
            if (savedItem) {
                item.favorite = savedItem.favorite;
            }
        });
    }
}


loadItemsFromLocalStorage(); 
renderItems();
renderFavorites();
