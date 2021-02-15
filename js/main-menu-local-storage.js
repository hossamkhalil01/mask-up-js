// Ahmed Stuff 
let userNickname = document.getElementById("userNickname");
let userScore = document.getElementById("userScore");
let userLevel = document.getElementById("userLevel");

const selectCharactersection1 = document.getElementById("selectCharactersection");

let userData = {
    nickname : userNickname.innerText,
    score : userScore.innerText,
    level: userLevel.innerText,
    character: "1"
}

function updateUI(data) {
  userNickname.innerText = data.nickname;
  userScore.innerText = data.score;
  userLevel.innerText = data.level;
}

function updateLocalStorage(data) {
  localStorage.setItem('userData', JSON.stringify(data));
  updateUI(data);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('userData');
  if (reference) {
    data = JSON.parse(reference);
    updateUI(data);
  }
}

updateLocalStorage(userData);

selectCharactersection1.addEventListener("click", function(event){
  //  event.preventDefault() ;
  if ((event.target.id == "ali"))
  {
      userData.character = "1";
 
  }else if ((event.target.id == "aliaa")){
      userData.character = "2";
  }
  updateLocalStorage(userData);
});


let continueGameButt = document.getElementById("continueGame");

getFromLocalStorage();

if (userLevel.innerText == 1  ) {
    continueGameButt.style = "display: none;";
}else{
    continueGameButt.style = "display: block;";
}


newGamebutt = document.getElementById("newGame");

newGamebutt.addEventListener("click", function () {
  userData.level = "1";
  updateLocalStorage(userData);
});