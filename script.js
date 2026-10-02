// PERSONALIZE HERE: change the name used on the welcome screen (leave blank for the generic greeting).
const friendName = "Khushi";

// PERSONALIZE HERE: edit all five birthday notes in this one array.
const letters = [
  { title: "A little birthday wish", message: "Happy Birthdayy Khushi! 💗\nYou are one of the sweetest people! I hope today reminds you just how loved and special you are." },
  { title: "Wishing you a beautiful year", message: "May this new year of your life bring you\nmore laughter, peaceful days, beautiful memories,\nand all the little things your heart wishes for. ✨" },
  { title: "A tiny reminder", message: "Here's your reminder:\nYou are doing better than you think.\nKeep being your wonderful, chaotic, beautiful self. 🫶🏻" },
  { title: "You make things brighter", message: "Some people make life a little brighter\njust by being in it.\nYou're definitely one of those people. 🌷" },
  { title: "And finally...", message: "And finally...\n\nNever forget how amazing you are.\nKeep smiling, keep dreaming,\nand keep being YOU. 💗\n\nHappy Birthday! 🎂✨" }
];

// OPTIONAL PHOTO: add assets/photo.jpg, then set PHOTO_PATH to "assets/photo.jpg" below.
const PHOTO_PATH = "";

const welcome = document.querySelector("#welcome");
const lettersScreen = document.querySelector("#lettersScreen");
const grid = document.querySelector("#letterGrid");
const modal = document.querySelector("#letterModal");
const effects = document.querySelector("#effects");
const opened = new Set();
let lastFocus = null;

if (friendName.trim()) document.querySelector("#welcomeTitle").innerHTML = `Happy Birthdayy ${escapeHtml(friendName.trim())}! <span>💗</span>`;
if (PHOTO_PATH) {
  const section = document.createElement("section");
  section.className = "photo-section";
  section.innerHTML = `<div class="photo-frame"><img src="${PHOTO_PATH}" alt="A birthday memory together"></div><p>One memory for the birthday girl 📸💗</p>`;
  section.querySelector("img").addEventListener("error", () => { section.querySelector(".photo-frame").textContent = "[YOUR PHOTO HERE]"; });
  document.querySelector("#finalReveal").append(section);
}

// Create a few calm floating decorations; all effects are lightweight and decorative.
const sky = document.querySelector(".sky");
const skySymbols = ["♡", "✦", "·", "✧", "♥"];
for (let i = 0; i < 22; i++) {
  const bit = document.createElement("span");
  bit.className = "skybit";
  bit.textContent = skySymbols[i % skySymbols.length];
  bit.style.left = `${(i * 47 + 11) % 97}%`;
  bit.style.top = `${(i * 61 + 8) % 94}%`;
  bit.style.fontSize = `${9 + (i % 4) * 4}px`;
  bit.style.setProperty("--duration", `${6 + (i % 5)}s`);
  sky.append(bit);
}

letters.forEach((letter, index) => {
  const button = document.createElement("button");
  button.className = "letter";
  button.type = "button";
  button.style.setProperty("--float", `${3.5 + index * .38}s`);
  button.style.animationDelay = `${index * -.45}s`;
  button.setAttribute("aria-label", `Open Letter ${String(index + 1).padStart(2, "0")}`);
  button.innerHTML = `<span class="envelope" aria-hidden="true"><span class="seal">♥</span></span><span class="letter-label">Letter ${String(index + 1).padStart(2, "0")}</span><span class="opened-mark" aria-live="polite"></span>`;
  button.addEventListener("click", () => openLetter(index, button));
  grid.append(button);
});

function openLetter(index, button) {
  opened.add(index);
  button.classList.add("is-opened");
  button.querySelector(".opened-mark").textContent = "✓ Opened";
  button.setAttribute("aria-label", `Reopen Letter ${String(index + 1).padStart(2, "0")}, opened`);
  document.querySelector("#modalLabel").textContent = `LETTER ${String(index + 1).padStart(2, "0")}`;
  document.querySelector("#modalTitle").textContent = letters[index].title;
  document.querySelector("#modalMessage").textContent = letters[index].message;
  updateProgress();
  lastFocus = button;
  modal.hidden = false;
  document.querySelector(".close-button").focus();
  heartBurst(13);
}
function updateProgress() {
  document.querySelector("#progressText").textContent = `Letters opened: ${opened.size}/${letters.length}`;
  document.querySelector("#progressBar").style.width = `${opened.size / letters.length * 100}%`;
  if (opened.size === letters.length) {
    const finalCard = document.querySelector("#finalCard");
    finalCard.hidden = false;
  }
}
function closeModal() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }
document.querySelector(".close-button").addEventListener("click", closeModal);
document.querySelector(".modal-x").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target.dataset.close) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

document.querySelector("#openSurprise").addEventListener("click", event => {
  event.currentTarget.animate([{ transform: "scale(1)" }, { transform: "scale(.92)" }, { transform: "scale(1.04)" }, { transform: "scale(1)" }], { duration: 340 });
  confetti(32);
  setTimeout(() => { welcome.hidden = true; welcome.classList.remove("active"); lettersScreen.hidden = false; lettersScreen.classList.add("active"); document.querySelector("#lettersTitle").focus?.(); }, 260);
});
document.querySelector("#giftButton").addEventListener("click", event => {
  event.currentTarget.hidden = true;
  document.querySelector("#finalReveal").hidden = false;
  confetti(105);
  heartBurst(35);
});

document.querySelector("#musicButton").addEventListener("click", async event => {
  const audio = document.querySelector("#birthdayMusic");
  const button = event.currentTarget;
  if (audio.paused) {
    try { await audio.play(); button.textContent = "🔊"; button.setAttribute("aria-label", "Pause background music"); button.title = "Pause background music"; }
    catch { button.textContent = "🎵"; button.setAttribute("aria-label", "Music file unavailable; add assets/birthday.mp3"); button.title = "Add your music as assets/birthday.mp3"; }
  } else { audio.pause(); button.textContent = "🎵"; button.setAttribute("aria-label", "Play background music"); button.title = "Play background music"; }
});

function heartBurst(count) {
  const icons = ["💗", "💕", "♡", "✨", "🌸"];
  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.className = "floaty";
    item.textContent = icons[Math.floor(Math.random() * icons.length)];
    item.style.left = `${8 + Math.random() * 84}%`;
    item.style.setProperty("--duration", `${1.8 + Math.random() * 1.7}s`);
    item.style.setProperty("--size", `${13 + Math.random() * 13}px`);
    item.style.setProperty("--drift", `${Math.round(Math.random() * 100 - 50)}px`);
    effects.append(item);
    setTimeout(() => item.remove(), 3700);
  }
}
function confetti(count) {
  const colors = ["#efa4ba", "#c8b3e9", "#f4c5a9", "#f6d886", "#b7d9c6"];
  for (let i = 0; i < count; i++) {
    const item = document.createElement("i");
    item.className = "confetti";
    item.style.left = `${Math.random() * 100}%`;
    item.style.background = colors[i % colors.length];
    item.style.setProperty("--duration", `${1.7 + Math.random() * 1.8}s`);
    item.style.setProperty("--drift", `${Math.round(Math.random() * 180 - 90)}px`);
    item.style.animationDelay = `${Math.random() * .42}s`;
    effects.append(item);
    setTimeout(() => item.remove(), 4300);
  }
}
function escapeHtml(text) { return text.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char])); }


