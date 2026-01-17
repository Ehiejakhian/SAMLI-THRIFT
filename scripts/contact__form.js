

let elin = document.querySelector('#name')
let email = document.querySelector('#email')
let phone = document.querySelector('#number')
let message = document.querySelector('#message');

let nameDiv = elin.parentNode.parentNode;
let emailDiv = email.parentNode.parentNode;
let phoneDiv = phone.parentNode.parentNode;
let messageDiv = message.parentNode.parentNode;
console.log(nameDiv);

let error__name = document.querySelector('.error-message__name');
let error__email = document.querySelector('.error-message__email')
let error__phone = document.querySelector('.error-message__phone')
let error__message = document.querySelector('.error-message__message')

let submitBtn = document.querySelector('input[type=submit]')

let nameState = false;
let emailState = false;
let phoneState = false;
let messageState = false;


/* Now the normal event listeners */

elin.addEventListener('keyup', (e) =>{
  checkInput(e.target, 'name');
})
email.addEventListener('keyup', (e) =>{
  checkInput(e.target, 'email');
})
phone.addEventListener('keyup', (e) =>{
  checkInput(e.target, 'phone');
})
message.addEventListener('keyup', (e) =>{
  checkInput(e.target, 'message');
})

function checkInput(input, type) {
  console.log('The input is a', type)
  if (type === "name") {
    if (!input.value || input.value.length < 3) {
      errorMessage('A valid name please', type)
      nameState = false;
    } else {
      errorMessage('remove', type)
      nameState = true;
    }
  } else if (type === "phone") {
      const val = (input.value || '').trim();
      if (!isValidNigerianNumber(val)) {
      errorMessage('The Phone number is not yet valid', type)
      phoneState = false;
    } else {
      errorMessage('remove', type)
      phoneState = true;
    }
  } else if (type === "email") {
    if (!input.value) {
    errorMessage('Email cannot be empty.', type)
    emailState = false;
    } else if (isValidEmail(input.value) == false) {
      errorMessage('Looks like this is not an email', type)
      emailState = false;
    } else {
      errorMessage('remove', type)
      emailState = true;
    }
  } else if (type === "message") {
    if (!input.value || input.value.length < 3) {
      errorMessage('A valid message please', type)
      messageState = false;
    } else {
      errorMessage('remove', type)
      messageState = true;
    }
  }
}

function errorMessage(message, type) {
  if (type == "name") {
    if (message === "remove") {
      error__name.innerHTML = '';
      nameDiv.classList.remove('wrong')
      nameDiv.classList.add('correct')
    } else {
      error__name.innerHTML = message;
      nameDiv.classList.add('wrong')
      nameDiv.classList.remove('correct')
    }
  } else if (type == "email") {
    if (message === "remove") {
      error__email.innerHTML = '';
      emailDiv.classList.remove('wrong')
      emailDiv.classList.add('correct')
    } else {
      error__email.innerHTML = message;
      emailDiv.classList.add('wrong')
      emailDiv.classList.remove('correct')
    }
  } else if (type == "phone") {
    if (message === "remove") {
      error__phone.innerHTML = '';
      phoneDiv.classList.remove('wrong')
      phoneDiv.classList.add('correct')
    } else {
      error__phone.innerHTML = message;
      phoneDiv.classList.add('wrong')
      phoneDiv.classList.remove('correct')
    }
  } else if (type == "message") {
    if (message === "remove") {
      error__message.innerHTML = '';
      messageDiv.classList.remove('wrong')
      messageDiv.classList.add('correct')
    } else {
      error__message.innerHTML = message;
      messageDiv.classList.add('wrong')
      messageDiv.classList.remove('correct')
    }
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
function isValidNigerianNumber(phone) {
  if (!phone) return false;
  const sanitized = phone.replace(/[\s-]/g, '');
  const regex = /^(?:\+234|234|0)(7[0-9]|8[0-9]|9[0-9])[0-9]{8}$/;
  return regex.test(sanitized);
}

submitBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  if (!nameState) {
    errorMessage('Please input a valid name!', 'name');
  } 
  if (!emailState) {
    errorMessage("A valid email please!", 'email')
  } 
  if (!phoneState) {
    errorMessage('Your phone number is invalid!', 'phone')
  }
  if (!messageState) {
    errorMessage('Your message should be at least a word!', 'message')
  }
  if (nameState && emailState && phoneState && messageState) {
    displaySuccessMessage();
  }
})

//AI help
function displaySuccessMessage() {
  // prevent duplicate messages
  if (document.querySelector('.success-message')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'success-message';
  wrapper.innerHTML = `
    <div class="success-message__inner">
      <svg class="success-message__icon" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="success-message__text">
        <h3>Message sent</h3>
        <p>Thanks — we'll get back to you shortly.</p>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // trigger entrance animation on next frame
  requestAnimationFrame(() => wrapper.classList.add('show'));
  // auto-dismiss after a short delay: remove .show to animate out, then remove node
  const AUTO_DISMISS_MS = 4000;
  const EXIT_ANIM_MS = 480; // must be >= CSS transition time
  setTimeout(() => {
    wrapper.classList.remove('show');
    setTimeout(() => {
      if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
    }, EXIT_ANIM_MS);
  }, AUTO_DISMISS_MS);
}

// console.log('bottom of the sea');
