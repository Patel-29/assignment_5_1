"use strict";

const getElement = selector => document.querySelector(selector);
const getElements = selector => document.querySelectorAll(selector);

const backImgSrc = "images/back.png";
const blankImgSrc = "images/blank.png";
const cardImgSrcStart = "images/card_";

let numCards = 16; // default
let cards = [];
let flippedCards = [];
let matchedCards = new Set();
let correctMatches = 0;
let playerName = "";
let highScore = 0;

const tabsCards = getElement("#tabs_cards");
const tabsRules = getElement("#tabs_rules");
const tabsSettings = getElement("#tabs_settings");
const tabButtons = getElements(".tablinks");

const cardsContainer = getElement("#cards");
const playerDisplay = getElement("#player");
const highScoreDisplay = getElement("#high_score");
const correctDisplay = getElement("#correct");
const newGameLink = getElement("#new_game a");
const playerNameInput = getElement("#player_name");
const numCardsSelect = getElement("#num_cards");
const saveSettingsBtn = getElement("#save_settings");

function shuffleArray(arr) {
  for (let i = arr.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCards() {
  // Clear previous state
  cards = [];
  flippedCards = [];
  matchedCards.clear();
  correctMatches = 0;
  correctDisplay.textContent = "";

  // Generate card pairs (ids 1..numCards/2, duplicated)
  let pairCount = numCards / 2;
  let cardIds = [];
  for(let i=1; i<=pairCount; i++) {
    cardIds.push(i);
    cardIds.push(i);
  }

  shuffleArray(cardIds);

  cardsContainer.innerHTML = "";

  cardIds.forEach((id, index) => {
    let img = document.createElement("img");
    img.src = backImgSrc;
    img.dataset.cardId = id;
    img.dataset.index = index;
    img.alt = "Memory card";
    img.style.cursor = "pointer";

    img.addEventListener("click", onCardClick);

    cardsContainer.appendChild(img);
    cards.push(img);
  });

  updatePlayerInfo();
}

function onCardClick(e) {
  let img = e.target;

  // Ignore clicks on matched or flipped cards or if already two flipped
  if (matchedCards.has(img.dataset.index) || flippedCards.includes(img) || flippedCards.length === 2) {
    return;
  }

  flipCard(img);

  flippedCards.push(img);

  if (flippedCards.length === 2) {
    // Check for match after a short delay
    setTimeout(checkForMatch, 700);
  }
}

function flipCard(img) {
  let cardId = img.dataset.cardId;
  img.src = `${cardImgSrcStart}${cardId}.png`;
}

function unflipCard(img) {
  img.src = backImgSrc;
}

function checkForMatch() {
  let [card1, card2] = flippedCards;
  if (card1.dataset.cardId === card2.dataset.cardId) {
    // It's a match!
    matchedCards.add(card1.dataset.index);
    matchedCards.add(card2.dataset.index);
    correctMatches++;
    correctDisplay.textContent = `Correct matches: ${correctMatches}`;

    // Optionally, remove or gray out matched cards
    card1.style.opacity = "0.5";
    card2.style.opacity = "0.5";
    card1.style.cursor = "default";
    card2.style.cursor = "default";

    // Check if game over
    if (matchedCards.size === cards.length) {
      alert(`Game over! You found all matches. Score: ${correctMatches}`);
      if (correctMatches > highScore) {
        highScore = correctMatches;
        highScoreDisplay.textContent = `High score: ${highScore}`;
      }
    }
  } else {
    // Not a match — flip cards back
    unflipCard(card1);
    unflipCard(card2);
  }
  flippedCards = [];
}

function updatePlayerInfo() {
  playerDisplay.textContent = playerName ? `Player: ${playerName}` : "Player: (anonymous)";
  highScoreDisplay.textContent = `High score: ${highScore}`;
  correctDisplay.textContent = `Correct matches: ${correctMatches}`;
}

function saveSettings() {
  playerName = playerNameInput.value.trim();
  numCards = parseInt(numCardsSelect.value, 10);

  if (numCards % 2 !== 0) {
    alert("Number of cards must be even!");
    return;
  }

  updatePlayerInfo();
  createCards();
  // Switch back to game tab
  activateTab("tabs_cards_link");
}

function activateTab(tabId) {
  tabButtons.forEach(btn => btn.classList.remove("active"));
  [tabsCards, tabsRules, tabsSettings].forEach(tab => tab.classList.add("hide"));

  getElement(`#${tabId}`).classList.add("active");

  if (tabId === "tabs_cards_link") tabsCards.classList.remove("hide");
  else if (tabId === "tabs_rules_link") tabsRules.classList.remove("hide");
  else if (tabId === "tabs_settings_link") tabsSettings.classList.remove("hide");
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial settings load
  playerNameInput.value = playerName;
  numCardsSelect.value = numCards;

  createCards();

  // Tab buttons click
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      activateTab(button.id);
    });
  });

  saveSettingsBtn.addEventListener("click", saveSettings);

  // New game link reloads page
  newGameLink.addEventListener("click", e => {
    e.preventDefault();
    // Reset everything and start new game
    playerName = playerNameInput.value.trim();
    createCards();
  });
});
