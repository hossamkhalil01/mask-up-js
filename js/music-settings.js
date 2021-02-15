class MusicSetting{
    static  audio = document.getElementById("theAud");
    static currentSong = document.getElementById("currentSong");
    static getAudio() {
        return this.audio;
    }

    static getCurrentSong() {
        return this.currentSong;
    }
    constructor() {
        this.music =document.getElementById("music");
        this.account = document.getElementById("accunt");
        this.accountForm = document.getElementById("accountForm");
        this.musicForm =  document.getElementById("musicForm");
        this.play = document.getElementById("play");
        this.repeat = document.getElementById("repeat");
        this.shuffle = document.getElementById("shuffle");
        this.audio = document.getElementById("theAud");
        this.buttonType ="";
        this.musicAlbum = document.getElementById("musicAlbum");
        this.pauseResume = document.getElementById("pause-reusme");
    }
    addEventListeners() {
        this.play.addEventListener("click",this.playSong)
        this.repeat.addEventListener("click",this.repeatSong);
        this.shuffle.addEventListener("click",this.shuffleSong)
        this.music.addEventListener("click",this.musicClicked);
        this.audio.addEventListener("ended",this.chooseSong);
        this.pauseResume.addEventListener("click",this.pauseOrResume);
        document.addEventListener("DOMContentLoaded", this.initializeSongs);

    }
     pauseOrResume() {

        if (document.getElementById("pause-reusme").getAttribute("currentType" ) =="pause")
        {
            document.getElementById("pause-reusme").setAttribute("currentType","resume")
            document.getElementById("pause-reusme").textContent="Resume"
            Album.pauseResume("pause");
        }
        else {
            document.getElementById("pause-reusme").setAttribute("currentType","pause")
            document.getElementById("pause-reusme").textContent="Pause";
            Album.pauseResume("resume");

        }
    }
     chooseSong() {
        if(this.buttonType == "play")
        {

            Album.playSong();
        }
        else if (this.buttonType == "repeat")
        {

            Album.repeatSong();
        }
        else if (this.buttonType == "shuffle")
        {
            Album.shuffleSong();
        }
    }
     musicClicked(e) {
         document.getElementById("accountForm").style.display="none"
         document.getElementById("musicForm").style.display=""
         document.querySelector(".fifth").style.backgroundColor = "" ;
        document.querySelector(".fourth").style.backgroundColor = "red" ;

    }


        initializeSongs() { 
       
        Album.addSong("track1.mp3");
        Album.addSong("track2.mp3");
        Album.addSong("track3.mp3");
        Album.addSong("track4.mp3");
            if(Album.getSongs().length >0 )
            {
                var li = "";
                for (var song  in  Album.getSongs())
                {
                    li = document.createElement("li");
                    li.innerHTML = `<li class="musicLi"> <span> ${Album.getSongs()[song]}</span></li>`;
                    musicAlbum.appendChild(li);
                }
            }
    }

     playSong() {
        this.buttonType = "play";
        Album.playSong();
    }
     repeatSong() {
        this.buttonType = "repeat";
        Album.repeatSong();
    }
     shuffleSong() {
        this.buttonType = "shuffle";
        Album.shuffleSong();

    }
}
class Album {
    static songs=[];
    static index ;
    static audio_var;

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
            this.audio_var.pause();
        }
        else {
            if (isNaN(this.index))
            {
                this.index=0;
            }
            this.audio_var = new Audio(`../audio/${Album.getSongs()[this.index]}`);
            this.audio_var.play();
        }
    }
    static repeatSong()
    {
        document.getElementById("pause-reusme").setAttribute("currentType","pause")
        document.getElementById("pause-reusme").textContent="Pause";


        if (isNaN(this.index))
        {

            this.index=0;
        }

        if (this.audio_var != null )
        {
            this.audio_var.pause();
        }
        this.audio_var = new Audio(`../audio/${Album.getSongs()[this.index]}`);
        this.audio_var.play();
    }
    static shuffleSong() {
        document.getElementById("pause-reusme").setAttribute("currentType","pause")
        document.getElementById("pause-reusme").textContent="Pause";
        var  min = Math.ceil(0);
        var  max = Math.floor(this.songs.length-1);
        this.index =(Math.floor(Math.random() * (max - min + 1)) + min);

        if (this.audio_var != null )
        {
            this.audio_var.pause();
        }
        this.audio_var = new Audio(`../audio/${Album.getSongs()[this.index]}`);
        this.audio_var.play();


    }
    static playSong()
    {
        document.getElementById("pause-reusme").setAttribute("currentType","pause")
        document.getElementById("pause-reusme").textContent="Pause";


        if (isNaN(this.index))
        {

            this.index=0;
        }
        else if(this.index == this.songs.length-1)
        {
            this.index=0;
        }
        else{
            this.index++;
        }
        if (this.audio_var != null )
        {
            this.audio_var.pause();
        }
        this.audio_var = new Audio(`../audio/${Album.getSongs()[this.index]}`);
        this.audio_var.play();
    }
}
var music = new MusicSetting();
music.addEventListeners();