
let contactType = document.querySelectorAll('[name=contact__type]');
let contactForms = document.querySelectorAll('.contact__content__form')
let contactButtons = document.querySelectorAll('[for*=contact__type__]');

contactType.forEach((e,index) => {
  e.addEventListener('click', () => {
    let type = e.id.slice(15, (e.length));
    contactButtons.forEach(e => { e.classList.remove('selected') });
    contactForms.forEach(e => { e.classList.remove('selected') });
    if (type == 'phone') {
      console.log('phone Contact selected')
      contactButtons[index].classList.add('selected')
      contactForms[index].classList.add('selected')
    } else if (type == 'email') {
      console.log('email Contact selected')
      contactButtons[index].classList.add('selected')
      contactForms[index].classList.add('selected')
    } else {
      console.log('whatsapp Contact selected')
      contactButtons[index].classList.add('selected')
      contactForms[index].classList.add('selected')
    }
  })
});
