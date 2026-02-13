function createHeart(x, y, isSpread = false) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    if (x && y) {
        // Corazón en posición específica (clic/toque)
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.animation = 'floatUp 2s ease-out forwards';
    } else {
        // Corazón flotante de fondo
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.animationDuration = Math.random() * 10 + 5 + 's';
        heart.style.opacity = Math.random();
    }

    document.getElementById('heart-bg').appendChild(heart);
    setTimeout(() => heart.remove(), x ? 2000 : 15000);
}

// Estilo de animación para corazones de clic
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
    }
`;
document.head.appendChild(style);

setInterval(() => createHeart(), 400);

// Crear corazones al tocar/hacer clic
document.addEventListener('mousedown', (e) => createHeart(e.clientX, e.clientY));
document.addEventListener('touchstart', (e) => {
    createHeart(e.touches[0].clientX, e.touches[0].clientY);
});

const phrases = [
    "Eres lo más bonito que me ha pasado en la vida. ❤️",
    "Cada momento a tu lado es un regalo que valoro muchísimo. ✨",
    "Tu sonrisa tiene el poder de iluminar hasta mi día más gris. 😊",
    "No me imagino un mundo donde no estés tú conmigo. 🌍",
    "Te amo más de lo que las palabras podrían expresar jamás. 💖",
    "Bri, nunca olvides lo increíblemente fuerte que eres; tu valentía me inspira cada día. 💪✨",
    "Admiro tu capacidad para superar cualquier obstáculo con esa luz que te hace única. 🌟",
    "Eres una mujer guerrera y capaz de todo lo que te propongas; siempre estaré aquí para apoyarte. 🔥❤️"
];

let currentPhrase = 0;
const revealBtn = document.getElementById('reveal-btn');
const mainText = document.getElementById('main-text');
const interactionContainer = document.getElementById('interaction-container');
const questionContainer = document.getElementById('question-container');
const finalMessage = document.getElementById('final-message');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');

let musicStarted = false;

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.innerText = '⏸️';
    } else {
        music.pause();
        musicBtn.innerText = '🎵';
    }
}

musicBtn.addEventListener('click', toggleMusic);

revealBtn.addEventListener('click', () => {
    // Iniciar música al primer clic (necesario por políticas de navegadores)
    if (!musicStarted) {
        music.play();
        musicBtn.innerText = '⏸️';
        musicStarted = true;
    }

    if (currentPhrase < phrases.length) {
        mainText.classList.remove('fade-in');
        void mainText.offsetWidth; // Force reflow
        mainText.innerText = phrases[currentPhrase];
        mainText.classList.add('fade-in');
        currentPhrase++;

        if (currentPhrase === phrases.length) {
            revealBtn.innerText = "Tengo una pregunta...";
        }
    } else {
        interactionContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        questionContainer.classList.add('fade-in');
        // Posicionar el botón NO inicialmente
        noBtn.style.left = '60%';
        noBtn.style.top = '20px';
    }
});

// Botón NO que escapa (optimizado para móviles)
function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    questionContainer.style.display = 'none';
    finalMessage.style.display = 'block';
    finalMessage.classList.add('fade-in');

    // Lluvia masiva
    setInterval(() => {
        for (let i = 0; i < 5; i++) createHeart();
    }, 100);
});


