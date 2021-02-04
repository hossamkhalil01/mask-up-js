
var music = document.getElementById("music");
var account = document.getElementById("accunt");
var accountForm = document.getElementById("accountForm");
var musicForm =  document.getElementById("musicForm");
var play = document.getElementById("play");
var repeat = document.getElementById("repeat");
var shuffle = document.getElementById("shuffle");
play.addEventListener("click",playSong)
repeat.addEventListener("click",repeatSong);
shuffle.addEventListener("click",shuffleSong)
music.addEventListener("click",musicClicked);
var audio = document.getElementById("theAud");
audio.addEventListener("ended",chooseSong)
var buttonType ="";
var currentSong = document.getElementById("currentSong");
var musicAlbum = document.getElementById("musicAlbum");
document.addEventListener("DOMContentLoaded", initializeSongs);
var pauseResume = document.getElementById("pause-reusme");
pauseResume.addEventListener("click",pauseOrResume)

function pauseOrResume() {
    console.log("weseltHna");
    console.log()
    if (pauseResume.getAttribute("currentType" ) =="pause")
    {
        console.log("holaa")
        pauseResume.setAttribute("currentType","resume")
        pauseResume.textContent="Resume"
        Album.pauseResume("pause");
    }
    else {
        pauseResume.setAttribute("currentType","pause")
        pauseResume.textContent="Pause"
    }
    Album.pauseResume("resume");
}
function chooseSong() {

    if(buttonType == "play")
    {
        console.log("play")
        Album.playSong();
    }
    else if (buttonType == "repeat")
    {
        console.log("repeat")
        Album.repeatSong();
    }
    else if (buttonType == "shuffle")
    {
        console.log("second shuffle")
        Album.shuffleSong();
    }
}
function musicClicked(e) {
    accountForm.style.display="none"
    musicForm.style.display=""

}

function mapAlbumToDom() {
    if(Album.getSongs().length >0 )
    {
        var li = "";
        for (var song  in  Album.getSongs())
        {
            li = document.createElement("li")
            li.innerHTML = `<li class="musicLi"> <span> ${Album.getSongs()[song]}</span> 
<!--    <img id="${song}" name="play" src="../images/play.png" width="50px" height="50px" alt=""> -->
</li>`
            musicAlbum.appendChild(li);
        }
    }
    // play.click();
}
function initializeSongs() {

        Album.addSong("01_AlbyEtmannah.mp3");
        Album.addSong("02_AmarEah.mp3");
        Album.addSong("03_AhHabibi.mp3");
        Album.addSong("04_Awelkolhaga.mp3");

    mapAlbumToDom();


}
function playSong() {
    buttonType = "play";
    Album.playSong();
}
function repeatSong() {
    buttonType = "repeat";
    Album.repeatSong();
}
function shuffleSong() {
    buttonType = "shuffle";
    Album.shuffleSong();

}
class Album {
    static songs=[];
    static index ;

    static getSongs() {
        return this.songs;
    }
    static addSong(song)
    {
        this.songs.push(song);
    }



    static setIndex(index)
    {
        this.index= index;
    }
    static getIndex()
    {
        return this.index;
    }
    static pauseResume(status)
    {
        if (status =="pause")
        {
            console.log("ana ha paaaaaaaaaause")
            console.log(audio);
            audio.currentTime = 0;
            audio.pause();
            var oldSrc = audio.src;
            // console.log(oldSrc)
            // currentSong.            // currentSong.src = "";
            // currentSong.src= oldSrc;
            // console.log(audio)
        }
        else {
            if (isNaN(this.index))
            {
                console.log("mmust be here")
                this.index=0;
                currentSong.src = `../audio/${Album.getSongs()[this.index]}`;
                audio.load();
            }
            audio.play();
        }
    }
    static repeatSong()
    {
        console.log("logaia")
        if (isNaN(this.index))
        {
            console.log("mmust be here")
            this.index=0;
        }
        console.log("index is "+this.index);

        currentSong.src = `../audio/${Album.getSongs()[this.index]}`;
        audio.load();
        audio.play();
    }
    static shuffleSong() {
        var  min = Math.ceil(0);
        var  max = Math.floor(this.songs.length-1);


        this.index =(Math.floor(Math.random() * (max - min + 1)) + min);
        currentSong.src = `../audio/${Album.getSongs()[this.index]}`;
        audio.load();
        audio.play();


    }
    static playSong()
    {
        console.log("Mr log");
        if (isNaN(this.index))
        {
            console.log("mmust be here")
            this.index=0;
        }
        else if(this.index == this.songs.length-1)
        {
            this.index=0;
        }
        else{
            console.log("are you heeereee ");
            this.index++;
        }
        currentSong.src = `../audio/${Album.getSongs()[this.index]}`;
            audio.load();
            audio.play();

    }

}

