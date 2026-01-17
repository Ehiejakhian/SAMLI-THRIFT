document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('#cart');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const undoButton = document.getElementById('undo-button');
  let slots = JSON.parse(localStorage.getItem('slots')) || [];
  let lastRemoved = null;
  let cartIsEmpty = false;

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  undoButton.addEventListener('click', () => {
    if (lastRemoved) {
      slots.splice(lastRemoved.index, 0, lastRemoved.slot);
      localStorage.setItem('slots', JSON.stringify(slots));
      renderCart();
      toast.classList.remove('show');
      lastRemoved = null;
    }
  });

  function renderCart() {
    cartContainer.innerHTML = '';
    if (cartIsEmpty) {
      console.log('cartIs Empty')
      cartContainer.innerHTML = `
      <div class="empty__cart">
          <a href="./store.html"><i class="fa fa-shopping-bag"></i></a>
          <p>You have not added Items to your cart</p>
          <a href="./store.html">Visit the Shop</a>
      </div>
      `;
    } else {

      slots.forEach((slot, index) => {
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
          <button class="remove-item" data-index="${index}">×</button>
          <div class="cart-image">
          <img src="${slot.image}"/>
          </div>
          <div class="cart-details">
            <h4>${slot.name}</h4>
            <p>${slot.pieces}</p>
            <p>${slot.price}</p>
          </div>
        `;
        cartContainer.appendChild(item);
      });
  
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
          const index = parseInt(this.getAttribute('data-index'));
          const item = this.closest('.cart-item');
  
          item.classList.add('fade-out');
          setTimeout(() => {
            lastRemoved = { slot: slots[index], index };
            slots.splice(index, 1);
            localStorage.setItem('slots', JSON.stringify(slots));
            renderCart();
            showToast('Slot removed from cart 🛒');
          }, 300);
        });
      });
    }

  }

  renderCart();
  if ((cartContainer.querySelectorAll('.cart-item').length) == 0) {
    cartIsEmpty = true;
    cartContainer.innerHTML = `
    `;
    renderCart()
  }
});

document.querySelector('#clear-cart').addEventListener('click', () => {
  localStorage.removeItem('slots');
  location.reload();
});

setInterval(() => {
  
},100)

