console.log('Version 1.0.0');
let newTemp = document.querySelector('#new__item');
let newContent = newTemp.content;
let new__grid = document.querySelector('.new__grid');

fetch("scripts\JSON\store__items.json")
  .then((res) => res.json())
  .then((data) => {
    fillTheEarth(data);
  });

function fillTheEarth(data) {
  for (let i = 0; i < 5; i++) {
    let el = data[i];
    advertise(el);
  }
}

function advertise(el) {
  let clone = document.importNode(newContent, true);
  clone.querySelector('.new__grid__item__images').innerHTML = `<img src=${el.images[0]} alt="img"/>`;
  clone.querySelector('h3').textContent = el.name;
  clone.querySelector('h3 + div').innerHTML = `
    <p>@₦${el.price}</p>
    <p>${el.type}</p>
  `;
  (el.pieces)
    ? clone.querySelector('h3 + div').innerHTML += `<p>${el.pieces} pcs</p>`
    : (el.weight)
      ? clone.querySelector('h3 + div').innerHTML +=  `<p>${el.weight} kg</p>`
      : null;
  let li__s = ``;
  el.des.forEach(li => {
    li__s += `<li>${li}</li>`;
  });
  clone.querySelector('ul').innerHTML = li__s;

  new__grid.appendChild(clone);
}