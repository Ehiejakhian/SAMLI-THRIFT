
let carousels = document.querySelectorAll('.homeShop__slots');

carousels.forEach((c, i) => {
  let wrap_elem = c.querySelector('.wrapper');
  let wrap_style = getComputedStyle(wrap_elem);
  /*
    console.log(wrap_style.getPropertyValue('--anchor-name1'));
    console.log(wrap_style.getPropertyValue('--anchor-name2'));
  */
  
  let anchorValue__1 = `--carousel-${i}`;
  let anchorValue__2 = `--for-markers-${i}`;
  wrap_elem.style.setProperty('--anchor-name1', anchorValue__1);
  wrap_elem.style.setProperty('--anchor-name2', anchorValue__2);

  //console.log(getComputedStyle(wrap_elem).getPropertyValue('anchor-name'));
})
