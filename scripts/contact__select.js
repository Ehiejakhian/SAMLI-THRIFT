
let contactType = document.querySelectorAll('[name=contact__type]');

contactType.forEach(e => {
  e.addEventListener('click', () => {
    let type = e.id.slice(15, (e.length));
    console.log(type)
    if (type == 'phone') {
      
    } else if (type == 'email') {
      
    } else {
      
    }
  })
});
