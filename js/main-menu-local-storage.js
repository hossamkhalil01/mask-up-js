// Ahmed Stuff

var userNickname = document.getElementById("userNickname");
var userScore = document.getElementById("userScore");
var userLevel = document.getElementById("userLevel");
const selectCharactersection = document.getElementById("selectCharactersection");

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

//eventlistener on selecting the character 
selectCharactersection.addEventListener("click", function(event){
    // event.preventDefault() ;
    if ((event.target.id == "ali"))
    {
        userData.character = "1";
   
    }else if ((event.target.id == "aliaa")){
        userData.character = "2";
    }
    updateLocalStorage(userData);
    fromselectCharacterTo (selectlevel) ;
});


let continueGameButt = document.getElementById("continueGame");

getFromLocalStorage();

if (userLevel.innerText == 0) {
    continueGameButt.style = "display: none;";
}else{
    continueGameButt.style = "display: block;";
}