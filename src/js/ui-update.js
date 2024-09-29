import * as utils from './utils';

function getColors(invert) {
    let themeColor;
    let colorScheme = document.firstElementChild.getAttribute('color-scheme');
    if (invert) colorScheme == 'dark' ? colorScheme = 'light' : colorScheme = 'dark';
    colorScheme == 'dark' ? themeColor = '#656bff' : themeColor = 'black';
    return [themeColor, colorScheme];
}

if (utils.isElectron()) {window.Electron.loadColorScheme(getColors(false)[0])};

document.getElementById('toggle-color-scheme').onclick = function(e) {
    let [themeColor, colorScheme] = getColors(true);
    document.querySelectorAll('meta[name="theme-color"]')[0].content = themeColor;
    if (utils.isElectron()) {window.Electron.loadColorScheme(themeColor)};
    document.firstElementChild.setAttribute('color-scheme', colorScheme);
    e.target.style.backgroundImage = `url('./assets/images/${colorScheme}.svg')`;
    localStorage.setItem('color-scheme', colorScheme);
};

const mediaQueryList = window.matchMedia('(display-mode: window-controls-overlay)');
mediaQueryList.addEventListener('change', handleDisplayModeChange);
function handleDisplayModeChange(mql) {
    document.querySelector('h1').style.display = mql.matches ? 'inline-block' : 'none';
};

const langs = ['en', 'es', 'ru', 'uk'];
var langIndicator = document.getElementById('lang');
var langSelector = document.getElementById('langselector');
langSelector.value = document.firstElementChild.getAttribute('lang');
langSelector.onmouseover = (e) => {
    langIndicator.style.backgroundSize = 'cover';
};
langSelector.onmouseout = (e) => {
    langIndicator.style.backgroundSize = 'contain';
};
langSelector.onchange = (e) => {
    let newLang = e.target.value;
    document.firstElementChild.setAttribute('lang', newLang);
    document.querySelectorAll('[lang]').forEach(e => {e.style.display = 'none'});
    document.querySelectorAll(`[lang=${newLang}]`).forEach(e => {e.style.display = 'unset'});
    document.querySelectorAll(`h3[lang=${newLang}]`).forEach(e => {e.style.display = 'block'});
    langIndicator.style.backgroundImage = `url('./assets/images/${newLang}.svg')`;
    localStorage.setItem('lang', newLang);
};

var isStandalonePWA = !window.matchMedia('(display-mode: browser)').matches && ('windowControlsOverlay' in navigator);
var isItch = window.location.href.indexOf('itch') != -1;
let prevScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
let headerVisibility = 'visible';
window.onscroll = () => {
    if (!isStandalonePWA && !utils.isElectron() && !isItch) {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const header = document.getElementById('header-main');
        if (scrollTop > prevScrollTop &&  headerVisibility !== 'hidden' && scrollTop > header.clientHeight) {
            header.style.opacity = 0;
            headerVisibility = 'hidden';
        } else if (scrollTop < prevScrollTop &&  headerVisibility !== 'visible' && scrollTop > header.clientHeight) {
            header.style.opacity = 1;
            headerVisibility = 'visible';
        };
        prevScrollTop = scrollTop <= 0 ? 0 : scrollTop; // for Mobile or negative scrolling
    }
};
