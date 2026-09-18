/* =========================
      FLOATING HEARTS
   ========================= */

const heartsContainer = document.getElementById("hearts");

function createHeart() {

  const heart = document.createElement("div");

  heart.className = "heart";
  heart.innerHTML = Math.random() > .5 ? "♥" : "♡";

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 25) + "px";
  heart.style.animationDuration = (Math.random() * 9) + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createHeart, 500);


/* =========================
   LOVE COUNTER
   CHANGE START DATE HERE
========================= */

const relationshipStart = new Date("2025-07-16T00:00:00");

function updateCounter() {

  const now = new Date();

  let difference = now - relationshipStart;

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  difference %= (1000 * 60 * 60 * 24);

  const hours = Math.floor(
    difference / (1000 * 60 * 60)
  );

  difference %= (1000 * 60 * 60);

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  const seconds = Math.floor(
    difference / 1000
  );

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);


/* =========================
   GIFT SURPRISE
========================= */

function openGift() {

  const message =
    document.getElementById("surpriseMessage");

  message.classList.add("show");

  createConfetti();

  setTimeout(() => {
    message.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 300);
}

const gift = document.querySelector(".gift");
gift.addEventListener("click", openGift);


/* =========================
   CONFETTI
========================= */

function createConfetti() {
  const symbols = ["☆","✦","✶","🟅","♫","♪","𝄞","♡","❤︎⁠","ꨄ"]
  for (let i = 0; i < 100; i++) {

    const piece = document.createElement("div");
    const symbol = symbols[Math.floor(Math.random()*symbols.length)];
    piece.innerText = symbol;
    
    piece.style.fontSize = 6 + Math.random() * 30 + "px";
    piece.style.position = "fixed";
    piece.style.color =
      ["#ff527d", "#ffb3c5", "#fff", "#d82f5a"]
      [Math.floor(Math.random() * 4)];

    piece.style.left = "50%";
    piece.style.top = "50%";
    piece.style.zIndex = "200";
    piece.style.pointerEvents = "none";

    document.querySelector(".gift").appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const distance = 300 + Math.random() * 500;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    piece.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1
        },
        {
          transform:
            `translate(${x}px, ${y}px) rotate(720deg)`,
          opacity: 0
        }
      ],
      {
        duration: 1100 + Math.random() * 1000,
        easing: "cubic-bezier(0, 0, 0.58, 1)"
      }
    );

    setTimeout(() => piece.remove(), 1200);
  }
}


/* =========================
   MUSIC
========================= */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

function toggleMusic() {

  if (!playing) {

    music.play().catch(() => {
      alert("Please click the page once and try again.");
    });

    musicBtn.innerHTML = "❚❚";
    playing = true;

  } else {

    music.pause();

    musicBtn.innerHTML = "♫";
    playing = false;
  }
}

musicBtn.addEventListener("click",toggleMusic);

const observer = new IntersectionObserver((entries) => {
  const letter = entries[0];
  if (letter.isIntersecting) {
    letter.target.style.transform = "rotate(0deg)"
  } else {
    letter.target.style.transform = "rotate(-5deg)"
  }
}, { threshold: 0.7 })

const letter = document.querySelector(".letter");
observer.observe(letter);