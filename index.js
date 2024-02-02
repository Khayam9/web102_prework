import games from './games.js';
import GAMES_DATA from './games.js';

const parsedGames = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.img}" class="game-img" />
            <div class="game-info">
                <h2>${game.name}</h2>
                <p>${game.description}</p>
                <p>Pledged: ${game.pledged}</p>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(parsedGames);

const contributionsCard = document.getElementById("num-contributions");
const totalBackers = parsedGames.reduce((accumulator, game) => accumulator + game.backers, 0);
contributionsCard.innerHTML = `<p>${totalBackers}</p>`;

const raisedCard = document.getElementById("total-raised");
const totalRaised = parsedGames.reduce((accumulator, game) => accumulator + game.pledged, 0);
raisedCard.innerHTML = `<p>${totalRaised.toLocaleString()}</p>`;

const gamesCard = document.getElementById("num-games");
const totalGames = parsedGames.reduce((accumulator, game) => accumulator + 1, 0);
gamesCard.innerHTML = `<p>${totalGames}</p>`;

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = parsedGames.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
    return unfundedGames;
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = parsedGames.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(parsedGames);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

const descriptionContainer = document.getElementById("description-container");

const unfundedGames = filterUnfundedOnly();
const numberOfUnfundedGames = unfundedGames.reduce((sum, game) => sum + 1, 0);

const displayMessage = `So far, ${totalGames} games have raised $${totalRaised}. ${
    numberOfUnfundedGames > 0
      ? `Unfortunately, ${numberOfUnfundedGames} ${
          numberOfUnfundedGames === 1 ? 'game is' : 'games are'
        } still unfunded.`
      : 'Great news! All games are funded.'
  }`;

const messageElement = document.createElement('p');
messageElement.textContent = displayMessage;
descriptionContainer.appendChild(messageElement);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  parsedGames.sort((item1, item2) => item2.pledged - item1.pledged);
const [firstGame, secondGame] = sortedGames;

const firstGameElement = document.createElement('p');
firstGameElement.textContent = `🥇 ${firstGame.name} - Pledged: $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement('p');
secondGameElement.textContent = `🥈 ${secondGame.name} - Pledged: $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);