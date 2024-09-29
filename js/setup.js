// Color Scheme
function loadColorScheme() {
    if (localStorage.getItem("color-scheme"))
        return localStorage.getItem("color-scheme");
    else
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
var themeColor;
var colorScheme = loadColorScheme();
colorScheme == 'dark' ? themeColor = '#656bff' : themeColor = 'black';
document.querySelectorAll('meta[name="theme-color"]')[0].content = themeColor;
document.firstElementChild.setAttribute("color-scheme", colorScheme);

// Language
function loadLang() {
    const langs = ['en', 'es', 'ru', 'uk'];
    if (localStorage.getItem("lang")) {
        return localStorage.getItem("lang");
    } else {
        let systemLang = navigator.languages[0].split("-")[0];
        return langs.includes(systemLang) ? systemLang : 'en';
    };
}
var systemLang = loadLang();
document.firstElementChild.setAttribute("lang", systemLang);

// Add styles
var styles = `
    [lang], h3[lang] {
        display: none;
    }
    [lang=${systemLang}] {
        display: inline-block;
    }
    h3[lang=${systemLang}] {
        display: block;
    }
    span#lang {
        /*
        background-image: url('../assets/images/${systemLang}.svg');
        */
        background-image: url('./assets/images/${systemLang}.svg');
    }
    button#toggle-color-scheme {
        /*
        background-image: url('../assets/images/${colorScheme}.svg');
        */
        background-image: url('./assets/images/${colorScheme}.svg');
    }
`
var styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

var isStandalonePWA = !window.matchMedia("(display-mode: browser)").matches && ('windowControlsOverlay' in navigator);
if (isStandalonePWA && !navigator.windowControlsOverlay.visible) {
    var styles = 'h1 { display: none }'
    var styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
};

