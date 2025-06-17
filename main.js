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