const bgContainer = document.getElementById('background-container');
const featureTitle = document.getElementById('feature-title');
const featureDesc = document.getElementById('feature-desc');
const statusText = document.getElementById('status-text');
const percentageText = document.getElementById('percentage-text');
const progressBar = document.getElementById('progress-bar');
const progressGlow = document.getElementById('progress-glow');
const audio = document.getElementById('bg-music');
const volumeControl = document.getElementById('volume-control');
const playerName = document.getElementById('player-name');
const playerAvatar = document.getElementById('player-avatar');
const playerStatus = document.getElementById('player-status');

let filesTotal = 0;
let filesNeeded = 0;
let bgIndex = 0;
let featureIndex = 0;

function createBgElement(url) {
    const div = document.createElement('div');
    div.className = 'bg-image';
    div.style.backgroundImage = `url('${url}')`;
    return div;
}

const particleConfigs = {
    sakura: {
        "particles": {
            "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#ffb7c5", "#ffffff", "#f2245b"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 5, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 1, "sync": false } },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 1.2, "direction": "bottom-right", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
        },
        "interactivity": { "events": { "onhover": { "enable": false }, "onclick": { "enable": false } } },
        "retina_detect": true
    },
    fire: {
        "particles": {
            "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#ff4500", "#ff8c00", "#ffd700", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.9, "random": true, "anim": { "enable": true, "speed": 2, "opacity_min": 0, "sync": false } },
            "size": { "value": 2.5, "random": true, "anim": { "enable": true, "speed": 5, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 4, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false },
            "glow": { "enable": true, "color": "#ff4500", "blur": 5 }
        },
        "interactivity": { "events": { "onhover": { "enable": false }, "onclick": { "enable": false } } },
        "retina_detect": true
    },
    dark: {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#4b0082", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0, "sync": false } },
            "size": { "value": 1.5, "random": true },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 0.8, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": { "events": { "onhover": { "enable": false }, "onclick": { "enable": false } } },
        "retina_detect": true
    }
};

let currentParticleType = "";

function changeBackground() {
    if (Config.backgrounds.length === 0) return;

    const currentBgData = Config.backgrounds[bgIndex];
    if (!currentBgData) return;

    const url = typeof currentBgData === 'string' ? currentBgData : currentBgData.url;
    const particleType = typeof currentBgData === 'object' && currentBgData.particle ? currentBgData.particle : "sakura";

    const newBg = createBgElement(url);

    bgContainer.appendChild(newBg);

    void newBg.offsetWidth;

    newBg.classList.add('active');

    if (particleType !== currentParticleType && window.pJSDom && window.pJSDom.length > 0) {
        currentParticleType = particleType;
        const pjs = window.pJSDom[0].pJS;

        if (pjs) {
            pjs.fn.vendors.destroypJS();
            window.pJSDom = [];
        }

        particlesJS('particles-js', particleConfigs[particleType] || particleConfigs["sakura"]);
    }

    const allBgs = bgContainer.querySelectorAll('.bg-image');
    if (allBgs.length > 2) {
        allBgs[0].classList.remove('active');
        setTimeout(() => {
            if (allBgs[0] && allBgs[0].parentNode) {
                allBgs[0].parentNode.removeChild(allBgs[0]);
            }
        }, 1500);
    }

    bgIndex = (bgIndex + 1) % Config.backgrounds.length;
}

setTimeout(() => {
    bgContainer.innerHTML = '';
    particlesJS('particles-js', particleConfigs["sakura"]);
    changeBackground();
    setInterval(changeBackground, Config.backgroundDelay);
}, 500);




const featureBlock = document.getElementById('feature-block');
let firstFeature = true;

function changeFeature() {
    if (Config.features.length === 0) return;

    const currentFeature = Config.features[featureIndex];

    if (firstFeature) {
        featureTitle.innerText = currentFeature.title;
        featureDesc.innerText = currentFeature.desc;
        firstFeature = false;
        featureIndex = (featureIndex + 1) % Config.features.length;
        return;
    }

    const blockRect = featureBlock.getBoundingClientRect();
    const parentRect = featureBlock.parentElement.getBoundingClientRect();

    const sliceContainer = document.createElement('div');
    sliceContainer.className = 'katana-slice-container';
    sliceContainer.style.width = blockRect.width + 'px';
    sliceContainer.style.height = blockRect.height + 'px';
    sliceContainer.style.position = 'absolute';
    sliceContainer.style.top = (blockRect.top - parentRect.top) + 'px';
    sliceContainer.style.left = (blockRect.left - parentRect.left) + 'px';

    const topHalf = featureBlock.cloneNode(true);
    const bottomHalf = featureBlock.cloneNode(true);

    topHalf.removeAttribute('id');
    bottomHalf.removeAttribute('id');
    topHalf.className = 'feature-block katana-half katana-fall-top';
    bottomHalf.className = 'feature-block katana-half katana-fall-bottom';
    topHalf.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%)';
    bottomHalf.style.clipPath = 'polygon(0% 0%, 0% 100%, 100% 100%)';

    const slash = document.createElement('div');
    slash.className = 'katana-diagonal-slash';

    sliceContainer.appendChild(topHalf);
    sliceContainer.appendChild(bottomHalf);
    sliceContainer.appendChild(slash);

    featureBlock.style.opacity = 0;
    featureBlock.parentElement.appendChild(sliceContainer);

    const flashOverlay = document.getElementById('flash-overlay');
    setTimeout(() => {
        flashOverlay.classList.remove('flash-active');
        void flashOverlay.offsetWidth;
        flashOverlay.classList.add('flash-active');

        document.body.classList.remove('shake');
        void document.body.offsetWidth;
        document.body.classList.add('shake');

        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }, 150);

    setTimeout(() => {
        sliceContainer.remove();
        featureTitle.innerText = currentFeature.title;
        featureDesc.innerText = currentFeature.desc;

        featureBlock.style.opacity = 0;
        setTimeout(() => { featureBlock.style.opacity = 1; }, 50);

        featureIndex = (featureIndex + 1) % Config.features.length;
    }, 900);
}

changeFeature();
setInterval(changeFeature, Config.featureDelay);


const visualizer = document.getElementById('visualizer');
const numBars = 15;
const bars = [];

if (visualizer) {
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        visualizer.appendChild(bar);
        bars.push(bar);
    }
}

function animateVisualizer() {
    if (!audio.paused && bars.length > 0) {
        bars.forEach(bar => {
            const height = 5 + Math.random() * 30;
            bar.style.height = `${height * audio.volume * 2}px`;
        });
    } else if (bars.length > 0) {
        bars.forEach(bar => bar.style.height = `5px`);
    }
    requestAnimationFrame(animateVisualizer);
}
animateVisualizer();


if (Config.music && Config.music.length > 0) {
    const randomMusic = Config.music[Math.floor(Math.random() * Config.music.length)];
    audio.src = randomMusic;
    audio.volume = Config.musicVolume;
    volumeControl.value = Config.musicVolume;

    document.body.addEventListener('click', () => {
        if (audio.paused) audio.play();
    }, { once: false });

    audio.play().catch(e => console.log("Audio autoplay waiting for interaction"));
}

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});



function DownloadingFile(fileName) {
    statusText.innerText = "Téléchargement : " + fileName;
}

function SetStatusChanged(status) {
    statusText.innerText = status;
}

function SetFilesTotal(total) {
    filesTotal = total;
}

function SetFilesNeeded(needed) {
    filesNeeded = needed;

    if (filesTotal > 0) {
        let downloaded = filesTotal - filesNeeded;
        let percentage = Math.round((downloaded / filesTotal) * 100);

        percentage = Math.max(0, Math.min(100, percentage));

        progressBar.style.width = percentage + "%";
        progressGlow.style.width = percentage + "%";
        percentageText.innerText = percentage + "%";
    }
}

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, lang, p_name) {
    if (p_name) {
        playerName.innerText = p_name;
    }

    if (steamid && steamid.length === 17) {
        playerStatus.innerText = "ID: " + steamid;
        playerAvatar.src = `https://avatars.steamstatic.com/${steamid}_full.jpg`;
        playerAvatar.onerror = function() {
            this.src = `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg`;
        };
    }
}
