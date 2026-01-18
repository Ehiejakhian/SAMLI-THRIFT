// Array to hold selected slots
const slots = JSON.parse(localStorage.getItem('slots')) || [];

// Listen for clicks on all "Get Slot" buttons
document.querySelectorAll('.get-slot').forEach(button => {
  button.addEventListener('click', function () {
    const slotElement = this.closest('.slot');

    // Extract slot details
    const name = slotElement.querySelector('.slot-name').textContent.trim();
    const pieces = slotElement.querySelector('.slot-pieces').textContent.trim();
    const price = slotElement.querySelector('.slot-price').textContent.trim();
    const image = slotElement.querySelector('.slot-image>img').src;

    // Create slot object
    const slotData = {
      name,
      pieces,
      price,
      image
    };

    // Add to slots array
    slots.push(slotData);
    //Ehi_____________________________________________________________________________________________________________________________________Code here to check if element is alredy in cart.
    console.log('Slot added:', slotData);

    // Save to localStorage
    localStorage.setItem('slots', JSON.stringify(slots));

    // Show success message
    showSuccessMessage(`${name} added to cart 🛒`);
  });
});

// Success message logic
function showSuccessMessage(messageText) {
  let message = document.getElementById('success-message');

  if (!message) {
    message = document.createElement('div');
    message.id = 'success-message';
    message.className = 'success-message';
    document.body.appendChild(message);
  }

  message.textContent = messageText;
  message.classList.add('show');

  setTimeout(() => {
    message.classList.remove('show');
  }, 2500);
}
