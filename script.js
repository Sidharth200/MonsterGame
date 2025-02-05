let XP = 0;
let health = 200
let gold = 70;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  {
    name: "stick",
    damage: 5
  },
  {
    name: "sword",
    damage: 10
  },
  {
    name: "axe",
    damage: 15
  },
  {
    name: "Hammer",
    damage: 100
  }
];
const monsters = [
  {
    name: "slime",
    health: 20,
    damage: 10,
    level: 5
  },
  {
    name: "goblin",
    health: 30,
    damage: 20,
    level: 15
  },
  {
    name: "dragon",
    health: 100,
    damage: 90,
    level: 80
  }
];
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store.\""
    
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight Goblin", "Go to town square"],
    "button functions": [fightSlime, fightGoblin, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Run away", "Dodge"],
    "button functions": [attack, goTown, dodge],
    text: "You are in a fight."
  },
  {
    name: "kill Monster",
    "button text": ["Go to Town", "Go to Town", "Go to Town"],
    "button functions": [goTown, goTown, goTown],
    text: "You killed the monster."
  },
  {
    name: "lose",
    "button text": ["Try again", "Try again", "Try again"],
    "button functions": [restart, restart, restart],
    text: "You lost the game."
  },
  {
    name: "win",
    "button text": ["Replay", "Replay", "Replay"],
    "button functions": [restart, restart, restart],
    text: "You lost the game."
  }
];

//Initialization of Buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown(){
  update(locations[0]);
  }

function goStore() {
  update(locations[1]);
}
function goCave(){
  update(locations[2]);
}
function buyHealth(){
  if(gold >= 10){
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }else {
    text.innerText = "Not enough gold!";
  }
}
function buyWeapon(){
  if(currentWeapon < weapons.length - 1){
    if(gold >= 20){
      gold -= 20;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += "In your Inventory you have: " + inventory;
    } else{
      text.innerText = "Not enough gold!";
    }
  } else{
    text.innerText = "You already have the maximum weapon!";
    button2.innerText = "Sell your Weapon";
    button2.onclick = sellWeapon;
  }
}
function sellWeapon(){
  if(inventory.length > 1){
    gold += 20;
    gold.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold your " + currentWeapon + ".";
    text.innerText += "In your Inventory you have: " + inventory;
  } else{
    text.innerText = "Don't Sell Your Only Weapon!";
    button2.innerText = "Buy weapon";
    button2.onclick = buyWeapon;
  }
}
function fightSlime(){
  fighting = 0;
  goFight();
}
function fightGoblin(){
  fighting = 1;
  goFight();
}
function fightDragon(){
  fighting = 2;
  goFight();
}
function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;

}
function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks";
  text.innerText += " You are attacking with " + weapons[currentWeapon].name + ".";
  health -= monsters[fighting].damage;
  monsterHealth -= weapons[currentWeapon].damage + Math.floor(Math.random() * XP) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <=0){
    lose();
  } else if(monsterHealth <= 0){
    fighting === 2 ? winGmae() : defeatMonster();
  }
}
function dodge(){
  text.innerText = "You dodge the " + monsters[fighting].name + "'s attack!";
}
function defeatMonster(){
  gold += Math.floor(monsters[fighting].damage * Math.random() + 1);
  XP += monsters[fighting].level + 1;
  goldText.innerText = gold;
  xpText.innerText = XP;
  update(locations[4]);
}
function lose(){
  update(locations[5]);
}
function restart(){
  XP = 0;
  health = 200;
  gold = 70;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = XP;
  update(locations[0]);
  goTown();
}
function winGame(){
  update(locations[6]);
}
