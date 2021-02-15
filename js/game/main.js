var user;
let userData = {
    nickname : "mahmoud",
    score : "500",
    level: "1",
    character: "1"
}
function updateLocalStorage(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}
function getFromLocalStorage() {
    const reference = localStorage.getItem('userData');
    if (reference) {
        user = JSON.parse(reference);
    }
    else {
        user = {
            nickname : "",
            score : "0",
            level: "1",
            character: "1"
        }
    }
}
// updateLocalStorage(userData);
getFromLocalStorage();

let canvas = document.getElementById("mainCanvas");

//create model object
let model = new Model(canvas.width*0.02,canvas.height*0.9, canvas.width*0.85);

//create view object
let character;
if (user.character == "1" ){
    character = new Boy();
}
else if (user.character == "2") {
    character =  new Girl();   
}

let view = new View(model.getPlayer(), character , `level${user.level}`);

//create controller object
let controller = new Controller(model);

//create game object 
let game = new Game(model, view);




var mute= document.getElementById("mute")
var isMuted =true;
mute.addEventListener("click",playOrMute)
var  audio= new Audio(`../audio/1.mp3`);

audio.addEventListener("ended",function (){
        audio.currentTime = 0;
        audio.play();
    })

function playOrMute()
{
    if (isMuted)
    {
        mute.src="../images/game/unmute.png"
    audio.play();
    isMuted =false
    }
    else {
        mute.src="../images/game/mute.png"

        isMuted = true;
      audio.pause();
    }
}