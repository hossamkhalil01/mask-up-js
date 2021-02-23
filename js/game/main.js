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

//add listener to know if the screen is fully loaded
this.addEventListener("DOMContentLoaded", preloadImages, true);
 
let loadedImages = 0;

// array to hold the images to be loaded
let imageArray = new Array(
    "../images/game/backgrounds/level1.jpg", "../images/game/backgrounds/level2.jpg", "../images/game/backgrounds/level3.jpg",
    "../images/game/characters/boy/deadLeft.png", "../images/game/characters/boy/deadRight.png",
    "../images/game/characters/boy/idleLeft.png", "../images/game/characters/boy/idleRight.png",
    "../images/game/characters/boy/jumpLeft.png", "../images/game/characters/boy/jumpRight.png",
    "../images/game/characters/boy/runLeft.png", "../images/game/characters/boy/runRight.png",
    "../images/game/characters/girl/deadLeft.png", "../images/game/characters/girl/deadRight.png",
    "../images/game/characters/girl/idleLeft.png", "../images/game/characters/girl/idleRight.png", 
    "../images/game/characters/girl/jumpLeft.png", "../images/game/characters/girl/jumpRight.png", 
    "../images/game/characters/girl/runLeft.png", "../images/game/characters/girl/runRight.png",
    "../images/game/syringe/left.png", "../images/game/syringe/right.png",
    "../images/game/virus/level1.png", "../images/game/virus/level2.png", "../images/game/virus/level3.png",
    "../images/game/game-over-icon.jpg", "../images/game/mute.png", "../images/game/unmute.png"
);
 
function preloadImages(e) {
    for (var i = 0; i < imageArray.length; i++) {
        var tempImage = new Image();
         
        tempImage.addEventListener("load", trackProgress, true);
        tempImage.src = imageArray[i];
    }
}

function trackProgress() {
    loadedImages++;
     
    if (loadedImages == imageArray.length) {
        imagesLoaded();
    }
}

function imagesLoaded() {
    //load the character
    document.getElementById("loadingGameContainer").style="display:none";
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
}


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