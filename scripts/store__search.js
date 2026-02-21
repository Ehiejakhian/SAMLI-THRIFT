
fetch("/scripts/JSON/store__items.json")
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
  let val = e.target.value;
  let key = e.key;
  console.log(key, val);
}

function populateSearchGrid(el) {
  let clone = document.importNode(slot_content, true);
  clone.querySelector('.slot').setAttribute('data-id', el.id);
  clone.querySelector(".slot-image>img").src = el.images[0];
  clone.querySelector(".slot-name").textContent = el.name;
  clone.querySelector(".slot-price").textContent = `₦${el.price}`;
  switch (el.type) {
    case "slot":
      clone.querySelector(".slot-pieces").textContent = `${el.pieces} pieces`;
      clone.querySelector(".get-slot").textContent = 'Get Slot';
      slot_wr.appendChild(clone);
      break;
    case "bale":
      clone.querySelector(".slot-pieces").textContent = `${el.weight} kg`;
      clone.querySelector(".get-slot").textContent = 'Get Bale';
      bale_wr.appendChild(clone)
      break;
    case "others":
      clone.querySelector(".slot-pieces").innerHTML = '';
      clone.querySelector(".get-slot").innerHTML = `<i class="fa fa-shopping-basket"></i>`;
      others_wr.appendChild(clone)
      break;
  }
}