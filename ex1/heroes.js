const heroes = [];
let heroCount = 0;
// selectors
const btnPowerUp = document.getElementById("btn-power-up");
const heroInput = document.getElementById("input-hero");
const btnAddHero = document.getElementById("btn-add-hero");
const heroesElement = document.createElement("div");
const heroesContainer = document.querySelector("main");
const heroCountContainer = document.getElementById("hero-count");

class Hero {
  constructor(name) {
    const thisHero = this;
    thisHero.name = name;
    thisHero.powerCount = 10;
  }

  getCurrentPowerCount() {
    const thisHero = this;
    return thisHero.powerCount;
  }

  train() {
    const thisHero = this;
    thisHero.powerCount = thisHero.powerCount + 1;
    printHallOfFame();
    return this.powerCount;
  }
}

const printHallOfFame = () => {
  if (heroes.length <= 1) {
    heroesElement.innerHTML = `<p class="hero-element">${heroes[0].name}, ${heroes[0].powerCount}</p>`;
  } else {
    const lastIndex = heroes.length - 1;
    heroesElement.innerHTML = `<p class="hero-element">${heroes[lastIndex].name}, ${heroes[lastIndex].powerCount}</p>`;
  }

  heroCountContainer.innerText = heroCount.toString();

  heroesContainer.appendChild(heroesElement);
};

const getHero = (name) => {
  const newHero = new Hero(name);
  if (!heroes.includes(newHero) && newHero.name.trim().length > 0) {
    heroCount++;
    heroes.push(newHero);
    printHallOfFame();
  }
  btnPowerUp.addEventListener("click", () => {
    newHero.train();
  });
};
