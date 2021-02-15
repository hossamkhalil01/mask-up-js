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

//load data from local storage
getFromLocalStorage();

//load the character
let character;

if (user.character != "2" ){
    character = new Boy();
}
else{
    character =  new Girl();   
}

//create model object
let model = new Model(`${user.level}`);
//create view object
let view = new View(model.getPlayer(), character , `${user.level}`);
//create controller object
let controller = new Controller(model);
//create game object 
let game = new Game(model, view);


//handle music
let isMuted =true;

const mute= document.getElementById("mute");

mute.addEventListener("click",playOrMute)

var  audio= new Audio(`../audio/track1.mp3`);

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