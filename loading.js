const pending_ASCII = `░`;
const done_ASCII = `▓`;
const loadingASCII = `
⠀⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣
`;
const randomBootText = [
    `⚡ Booting up system`,
    `🔧 Initializing kernel`,
    `📦 Loading modules`,
    `🔐 Validating credentials`,
    `🚀 Starting services`,
    `💾 Loading portfolio data`,
    `🎨 Rendering interface`,
    `✨ Finalizing setup`,
    `🌐 Connecting to network`,
    `⚙️ Configuring environment`,
]

const loadingBar = document.querySelector('.loading-bar');
const fill = document.getElementById('fill');
const character = document.createElement('div');
const loadingSection = document.getElementById('loading');
const commandSection = document.getElementById('command-interface');
const asciiArtSection = document.getElementById('loading-ascii-art');
const loadingText = document.getElementById('loading-text');

asciiArtSection.innerHTML = loadingASCII;
asciiArtSection.style.display = 'block';
loadingText.innerHTML = `<span style="color: var(--accent-secondary); font-weight: 600;">⏳ Loading</span>`;
commandSection.style.display = 'none';
character.innerHTML = pending_ASCII;
character.style.position = 'absolute';
character.style.visibility = 'hidden';
document.body.appendChild(character);
const widthOfOneCharacter = character.clientWidth;
const windowWidth = window.innerWidth;
const widthOfFill = Math.min(windowWidth * 0.7, 500);
fill.style.width = `${widthOfFill}px`;
fill.style.maxWidth = '90%';
const numChars = Math.floor(widthOfFill / widthOfOneCharacter);
fill.innerHTML = pending_ASCII.repeat(numChars);
loadingBar.appendChild(fill);

let progress = 0;
let asciiText;
let currentWidth = 0;

const textGenerator = setInterval(() => { 
    const currentText = loadingText.textContent;
    const dots = currentText.match(/\./g);
    if (dots && dots.length >= 3) {
        loadingText.innerHTML = `<span style="color: var(--accent-secondary); font-weight: 600;">${randomBootText[Math.floor(Math.random() * randomBootText.length)]}</span>`;
    } else {
        loadingText.innerHTML += `.`;
    }
}, 500);
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10);
    if (currentWidth >= widthOfFill) {
        asciiText = done_ASCII.repeat(progress);
        fill.prepend(document.createTextNode(asciiText));
        clearInterval(interval);
        clearInterval(textGenerator);
        loadingSection.style.display = 'none';
        commandSection.style.display = 'inline-block';
        const input = document.getElementById("command-input");
        input.focus();
    } else {
        if(currentWidth < widthOfFill) {
            currentWidth += progress/100 * widthOfFill;
            asciiText = done_ASCII.repeat(progress);
            fill.prepend(document.createTextNode(asciiText));
        }
    }
}, 500);

