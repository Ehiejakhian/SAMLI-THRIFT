import { showSuccessMessage } from "/scripts/store.js";

let slot_wr = document.querySelector(".slots");
let bale_wr = document.querySelector(".bales");
let others_wr = document.querySelector(".others");

let slot_temp = document.querySelector("template#slot");
let slot_content = slot_temp.content;
let bale_temp = document.querySelector("template#bale");
let bale_content = bale_temp.content;

fetch("/scripts/JSON/store__items.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((el) => {
      populateDom(el);
    });
    //Modal Stuff starts here.
    listenForClicks(data);
  });


function populateDom(el) {
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

function listenForClicks(data) {
  let slot_imgs = document.querySelectorAll('.slot-image');
  // console.log(slot_imgs)
  slot_imgs.forEach((x, i) => {
    x.addEventListener('click', () => {
      displayModal(data, i, x);
    })
  })
}

function displayModal(data, i, x) {
  const slots = JSON.parse(localStorage.getItem('slots')) || [];

  let modalTemp = document.querySelector('#modal-template');
  let modalContent = modalTemp.content;
  let modal_clone = document.importNode(modalContent, true);

  document.querySelector('body').appendChild(modal_clone);
  ///
  let modal_dom = document.querySelector('.modal');
  modal_dom.classList.add('active');
  let modal_closebtn = modal_dom.querySelector('#close_btn');
  //For closebutton
  modal_closebtn.addEventListener('click', () => {
    document.querySelector('body').removeChild(modal_dom);
  });

  let parent = x.parentNode;
  let p_id = parent.getAttribute('data-id');
  console.log(p_id)
  //For carousel
  let imgs = ``;
  data[p_id].images.forEach(x => {
    imgs += `<img src="${x}"/>`
  })
  modal_dom.querySelector('.modal__content__gallery__carousel').innerHTML = imgs;


  //For caption image
  modal_dom.querySelector('.modal__content__gallery__caption__image').src = data[p_id].images[0];
  //For name
  modal_dom.querySelector('#modal__name').textContent = data[p_id].name;
  
  //For Pieces
  if (!data[p_id].pieces) {
    (!data[p_id].weight)
      ? modal_dom.querySelector('#modal__pieces').textContent = ''
      : modal_dom.querySelector('#modal__pieces').textContent = `${data[p_id].weight} kg` || ``;
  } else if (data[p_id].pieces) {
    modal_dom.querySelector('#modal__pieces').textContent = `${data[p_id].pieces} pieces`;
  }

  //For price
  modal_dom.querySelector('#modal__price').textContent = `₦${data[p_id].price}`;

  //For cart button
  let modal_cartbtn = modal_dom.querySelector('#cart_btn');
  modal_cartbtn.addEventListener('click', () => {
    //Get slot details
    const sl_name = modal_dom.querySelector('#modal__name').textContent;
    const sl_pieces = modal_dom.querySelector('#modal__pieces').textContent;
    const sl_price = modal_dom.querySelector('#modal__price').textContent;
    const sl_image = data[p_id].images[0];

    // Create slot object
    const slotData = {
      name : sl_name,
      pieces : sl_pieces,
      price : sl_price,
      image : sl_image
    };

    // Add to slots array
    if (!slots.find(slot => slot.name === sl_name)) {
      slots.push(slotData);
      console.log('Slot added:', slotData);
      // Save to localStorage
      localStorage.setItem('slots', JSON.stringify(slots));
      // Show success message
      showSuccessMessage(`${sl_name} added to cart 🛒`);
    } else {
      console.log('Slot already in cart:', slotData);
      showSuccessMessage(`${sl_name} is already in the cart 🛒`);
    }
  });

  //For descriptions
  if (!data[p_id].des) {
    modal_dom.querySelector('.modal__content__des').innerHTML = '';
  } else if (data[p_id].des) {
    let stuff = ``;
    data[p_id].des.forEach(li => {
      stuff += `<li>${li}</li>`;
    });
    modal_dom.querySelector('.modal__content__des > ul').innerHTML = stuff;
  }

  //For whatsapp chat
  modal_dom.querySelector('#modal_whatsapp_chat').addEventListener('click', () => {
    let message = `Hello Samli, I want to order:%0A-${data[p_id].name} (₦${data[p_id].price})%0A`;

    const phone = "2348038849000"; 
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  });
}
