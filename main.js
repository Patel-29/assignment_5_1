"use strict";
const getElement = selector => document.querySelector(selector);

// image constants 
const backImgSrc = "images/back.png";
const blankImgSrc = "images/blank.png";
const cardImgSrcStart = "images/card_";

// get elements
const tabsrules = getElement("#tab_rules");
const tabsettings = getElement("#tab_settings");
const tabCards = getElement("#tabs_cards");
const tabButtons = getElement(".tablinks");

const cardscontainer  = getElement("#cards");
const player_display = getElement("#player");
const highscoredisplay = getElement("high_score");
const correctDisplay = getElement("#correct");
const newGamelink = getElement("#new_game a");
const playerNameoutput = getElement("#player_name");
const numCardsSelect = getElement("#num_cards");
const savesettings = getElement("#save_settings");

function shuffle_arr(arr){
    for(let i =arr.length -1 ; i >0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j] , arr[i]];
    }
    return arr;
}

function create_cards(){
    cards=[];
    flippedCards = [];
    matchedcards.clear();
    correctmatches = 0;
    correctDisplay.textContent= "";
    
    let pairCount = numberscards / 2;
    let cardIds = [];
    for(let i=1 ; i<pairCount ;i++){
        cardIds.push(i);
        cardIds.push(i);
    }

    shuffle_arr(cardIds);

    cardscontainer.innerHTML = "";

    cardIds.forEach((id , index) => {
        let img = getElement("#img");
        img.src = backImgSrc;
        img.dataset.cardId = id;
        img.dataset.index = index;
        img.alt = "Memory card";
        img.style.cursor = "pointer";

        img.addEventListener("click" , onCardClick);

        cardscontainer.appendChild(img);
        cards.push(img);
    })

    updatePlayerInfo();


}
cardscontainer.innerHTML = "";

    cardIds.forEach((id , index) => {
        let img = document.createElement("img");
        img.src = backImgSrc;
        img.dataset.cardId = id;
        img.dataset.index = index;
        img.alt = "Memory card";
        img.style.cursor = "pointer";

        img.addEventListener("click" , onCardClick);

        cardscontainer.appendChild(img);
        cards.push(img);
    })

    updatePlayerInfo();


}


function onCardClick(e){
    let img =e.target;

    if(matchedcards.has(img.dataset.index) || flipcards.includes(img) || flipcards.length === 2){
        return;
    }

    flipCard(img);

    flipcards.push(img);

    if (flipcards.length === 2) {
        // Check for match after a short delay
        setTimeout(checkForMatch, 700);
      }
}
function flipCard(img){
    let cardId = img.dataset.cardId;
    img.src = `${cardImgSrcStart}${cardId}.png`;
}
function unflipCard(img){
    img.src = backImgSrc;
}

function activateTab(tabID){
    tabButtons.forEach(btn => btn.classList.remove("active"));
  [tabCards, tabsrules, tabsettings].forEach(tab => tab.classList.add("hide"));
 
  getElement(`${tabID}`.classList.add("active"));

  if(tabID === "tab_cards_link")tabCards.classList.remove("hide");
  else if(tabID === "tabs_rules_link")tabsrules.classList.remove("hide");
  else if(tabID === "tabs_settings_link")tabsettings.classList.remove("hide");
}
document.addEventListener("DOMContentLoaded", () => {
 
    // display cards and player info
    playerNameInput.value = playerName;
  numCardsSelect.value = numCards;
    

    // load settings data
    
 
	// add click event handler for each card link


    // add click event handler for each tab link button
    tabButtons.forEach(button =>{
        button.addEventListener("click" ,() => {
            activateTab(button.id);
        })
    })
    // add click event handler for Save Settings button
    
    
}); 
