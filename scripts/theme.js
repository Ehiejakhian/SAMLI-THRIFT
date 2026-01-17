var root = document.querySelector(':root')
let rootStyle = root.style
document.querySelector('#theme-checkbox').addEventListener('click', () => {
  checkCurrentTheme();
})
let theme = '';
// Check if local storage has theme
function checkCurrentTheme() {
  if (localStorage.getItem("theme") == null || JSON.parse(localStorage.getItem("theme")) == undefined) {
    console.log('no theme in local storage')
    theme = 'light';
    changeTheme('light');
  } else {
    console.log('local storage has theme');
    theme = JSON.parse(localStorage.getItem('theme'));
    console.log(theme);
    (theme == 'light')? changeTheme('dark'): changeTheme('light');
    console.log(JSON.parse(localStorage.getItem('theme')));
  
  }
}

function changeTheme(theme) {
  if (theme == 'light') {
    rootStyle.setProperty('--text', '#121212')
    rootStyle.setProperty('--bg', '#fff')
    rootStyle.setProperty('--cream', '#f5f5dc')
    rootStyle.setProperty('--header-bg', '#1f7679')

    rootStyle.setProperty('--header-text', '#dbf1f1')
    rootStyle.setProperty('--header-text-hover', '#f79e4b')
    rootStyle.setProperty('--header-nav-bg', '#125b5e')
  } else {
    rootStyle.setProperty('--text', '#fff')
    rootStyle.setProperty('--bg', '#000')
    rootStyle.setProperty('--cream', '#1a1a11')
    rootStyle.setProperty('--header-bg', '#121212')
    
    rootStyle.setProperty('--header-text', '#eeeeee')
    rootStyle.setProperty('--header-text-hover', '#965a00')
    rootStyle.setProperty('--header-nav-bg', '#080808')
  }
  localStorage.setItem("theme", JSON.stringify(theme));
}

changeTheme(JSON.parse(localStorage.getItem("theme")));
