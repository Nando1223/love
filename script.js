function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 10 + 5 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.opacity = Math.random();

    document.getElementById('heart-bg').appendChild(heart);
    setTimeout(() => heart.remove(), 15000);
}

setInterval(createHeart, 300);

const phrases = [
    "Eres lo más bonito que me ha pasado en la vida. ❤️",
    "Cada momento a tu lado es un regalo que valoro muchísimo. ✨",
    "Tu sonrisa tiene el poder de iluminar hasta mi día más gris. 😊",
    "No me imagino un mundo donde no estés tú conmigo. 🌍",
    "Te amo más de lo que las palabras podrían expresar jamás. 💖"
];

let currentPhrase = 0;
const revealBtn = document.getElementById('reveal-btn');
const mainText = document.getElementById('main-text');
const interactionContainer = document.getElementById('interaction-container');
const questionContainer = document.getElementById('question-container');
const finalMessage = document.getElementById('final-message');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');

revealBtn.addEventListener('click', () => {
    if (currentPhrase < phrases.length) {
        // Cambiar texto con animación
        mainText.classList.remove('fade-in');
        void mainText.offsetWidth; // Trigger reflow
        mainText.innerText = phrases[currentPhrase];
        mainText.classList.add('fade-in');

        currentPhrase++;

        if (currentPhrase === phrases.length) {
            revealBtn.innerText = "Tengo una pregunta...";
        }

        // Efecto de corazones
        for (let i = 0; i < 5; i++) setTimeout(createHeart, i * 100);
    } else {
        // Mostrar pregunta final
        interactionContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        questionContainer.classList.add('fade-in');
    }
});

// Lógica del botón "No" que huye
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

// Lógica del botón "Sí"
yesBtn.addEventListener('click', () => {
    questionContainer.style.display = 'none';
    finalMessage.style.display = 'block';
    finalMessage.classList.add('fade-in');

    // Lluvia masiva de corazones
    setInterval(() => {
        for (let i = 0; i < 10; i++) createHeart();
    }, 200);
});
