let slot_wr = document.querySelector(".slots");
let bale_wr = document.querySelector(".bales");

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
  });


function populateDom(el) {
  let clone = document.importNode(slot_content, true);
  clone.querySelector(".slot-image>img").src = el.image;
  clone.querySelector(".slot-name").textContent = el.name;
  el.type == "slot"
    ? (clone.querySelector(".slot-pieces").textContent = `${el.pieces} pieces`)
    : (clone.querySelector(".slot-pieces").textContent = `${el.weight} kg`);
  clone.querySelector(".slot-price").textContent = `₦${el.price}`;
  el.type == 'slot'
    ? (clone.querySelector(".get-slot").textContent = 'Get Slot')
    : (clone.querySelector(".get-slot").textContent = 'Get Bale');

  el.type == "slot" ? slot_wr.appendChild(clone) : bale_wr.appendChild(clone);
}
