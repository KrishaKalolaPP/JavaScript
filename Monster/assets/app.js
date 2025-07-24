const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}



const attack_value=10;
const strong_attackvalue=17;
const monster_attackvalue=14;
const heal_value=20;
const enteredMaxValue=prompt('max life value of both is ','100')
let choseMax=parseInt(enteredMaxValue)
if(isNaN(choseMax) || choseMax<=0){
  choseMax=100
}
let currentMonsterLife=choseMax
let currentPlayerLife=choseMax
let hasbonuslife=true;



adjustHealthBars(choseMax);

function reset(){
  currentMonsterLife=choseMax
  currentPlayerLife=choseMax
  resetGame(choseMax)
}
function endRound(){
  const initialPlayerlife=currentPlayerLife;
const playerdamage=dealPlayerDamage(attack_value)
  currentPlayerLife-=playerdamage

  if(currentPlayerLife<=0 && hasbonuslife==true){
    hasbonuslife=false
    removeBonusLife()
    currentPlayerLife=initialPlayerlife
    alert("bouns life activated")
  }
  if(currentMonsterLife<=0){
    alert("won!")
    reset()
  }
  else if(currentPlayerLife<=0){
    alert("lost")
    reset()
  }
  else if(currentPlayerLife <=0 && currentMonsterLife<=0){
    alert("draw")
    reset()
  }
}
function attackMonster(mode){
  let maxDamage;
  if(mode==='Attack'){
    maxDamage=attack_value;
  }
  else if(mode==='Strong_Attack'){
    maxDamage= strong_attackvalue
  }
  const damage =dealMonsterDamage(attack_value)
  currentMonsterLife-=damage;
  endRound();
}
function attackHandler(){
  attackMonster('Attack')
}

function strongAttackHandler(){
  attackMonster('Strong atttack')
}
function healPlayerHandler(){
  let healvalue;
  if(currentPlayerLife>= choseMax-heal_value){
    alert("can't heal more than your max initial health")
    healvalue=choseMax-currentPlayerLife;
    setPlayerHealth(initialPlayerlife)
  }
  else{
    healValue=heal_value
  }
  increasePlayerHealth(healvalue)
  currentPlayerLife+=healvalue
  endRound()
}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)
healBtn.addEventListener('click',healPlayerHandler)
