
let search__slot__template = document.querySelector('#search__slot__template');
let slot__content = search__slot__template.content;

fetch("../scripts/JSON/store__items.json")
.then((res) => res.json())
  .then((data) => {
    listenForSearchInput(data);
  // populateSearchGrid(data)
  // Modal Stuff is handled in store__populate.js
  // Add to cart stuff is handled in store.js
});

  
function listenForSearchInput(data) {
  let search__input = document.querySelector('#search__input');
  search__input.addEventListener('keyup', e => {
    validateInputInfo(e, data);
  });
}

function validateInputInfo(e, data) {
  let val = e.target.value.toLowerCase().trim();
  let key = e.key;
  let filteredData = [];

  filteredData = data.filter(el => {
    const searchableString = `
      ${el.name}${el.tags ? ' ' + el.tags.join(' ') : ''}`.toLowerCase();
    
    return searchableString.includes(val);
  });
  populateSearchGrid(filteredData, val);
  
}


function populateSearchGrid(filteredData, val) {
  let search = document.querySelector('#search');
  let search__grid = document.querySelector('#search__grid');
  search__grid.innerHTML = '';

  if (filteredData.length === 0 || val == '') {
    search.classList.add('none');
    search.classList.add('active');
    return;
  } else {
    search.classList.add('active');
    search.classList.remove('none');
  }

  filteredData.forEach(el => {
    let clone = document.importNode(slot__content, true);
    clone.querySelector('.slot').setAttribute('data-id', el.id);
    clone.querySelector(".slot-image>img").src = el.images[0];
    clone.querySelector(".slot-name").textContent = el.name;
    clone.querySelector(".slot-price").textContent = `₦${el.price}`;
    switch (el.type) {
      case "slot":
        clone.querySelector(".slot-pieces").textContent = `${el.pieces} pieces`;
        clone.querySelector(".get-slot").textContent = 'Get Slot';
        break;
      case "bale":
        clone.querySelector(".slot-pieces").textContent = `${el.weight} kg`;
        clone.querySelector(".get-slot").textContent = 'Get Bale';
        break;
      case "others":
        clone.querySelector(".slot-pieces").innerHTML = '';
        clone.querySelector(".get-slot").innerHTML = `<i class="fa fa-shopping-basket"></i>`;
        break;
    }
    search__grid.innerHTML += clone.querySelector(".slot").outerHTML;
  });
}

console.log('Version 1.8.0');