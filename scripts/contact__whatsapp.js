

let w__name = document.querySelector('#whatsapp__name');

let w__message = document.querySelector('#whatsapp__message');

let w__nameDiv = w__name.parentNode.parentNode;
let w__messageDiv = w__message.parentNode.parentNode;

let w__error__name = document.querySelector('.whatsapp__name__error');
let w__error__message = document.querySelector('.whatsapp__message__error')

let w__submitBtn = document.querySelector('#whatsapp__submit')

let w__nameState = false;
let w__messageState = false;


/* Now the normal event listeners */

w__name.addEventListener('keyup', (e) =>{
  w__checkInput(e.target, 'name');
})
w__message.addEventListener('keyup', (e) =>{
  w__checkInput(e.target, 'message');
})

function w__checkInput(input, type) {
  console.log('The input is a', type)
  if (type === "name") {
    if (!input.value || input.value.length < 3) {
      w__errorMessage('A valid name please', type)
      w__nameState = false;
    } else {
      w__errorMessage('remove', type)
      w__nameState = true;
    }
  } else if (type === "message") {
    if (!input.value || input.value.length < 3) {
      w__errorMessage('A valid message please', type)
      w__messageState = false;
    } else {
      w__errorMessage('remove', type)
      w__messageState = true;
    }
  }
}

function w__errorMessage(message, type) {
  if (type == "name") {
    if (message === "remove") {
      w__error__name.innerHTML = '';
      w__nameDiv.classList.remove('wrong')
      w__nameDiv.classList.add('correct')
    } else {
      w__error__name.innerHTML = message;
      w__nameDiv.classList.add('wrong')
      w__nameDiv.classList.remove('correct')
    }
  } else if (type == "message") {
    if (message === "remove") {
      w__error__message.innerHTML = '';
      w__messageDiv.classList.remove('wrong')
      w__messageDiv.classList.add('correct')
    } else {
      w__error__message.innerHTML = message;
      w__messageDiv.classList.add('wrong')
      w__messageDiv.classList.remove('correct')
    }
  }
}


w__submitBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  if (!w__nameState) {
    w__errorMessage('Please input a valid name!', 'name');
  } 
  if (!w__messageState) {
    w__errorMessage('Your message should be at least a word!', 'message')
  }
  if (w__nameState && w__messageState) {
    sendWhatsappmessage();
  }
})

//AI help
function sendWhatsappmessage() {
  const personName = w__name.value;
  const personMessage = w__message.value;

  const phone = "2348038849000";

  const text =
    `Hello Samli Thrift,%0A` +
    `My name is ${personName}.%0A` +
    `${personMessage}`;

  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, "_blank");

}

// console.log('bottom of the sea');
