class View
{
    static canvas = document.getElementById("mainCanvas");

    getCanvas() {
        return canvas.getContext("2d");
    }

    constructor(canvasElement ,player, character)
    {
        this.virusArray= [];
        this.canvas = canvasElement;
        this.context = canvas.getContext("2d");

        //define canvas dimensions
        this.canvasWidth = View.canvas.width;
        this.canvasHeight = View.canvas.height;

        //define player dimensions
        this.playerHeight = this.canvasHeight*0.3;
        this.playerWidth = this.canvasWidth*0.2;

        this.player = player;


        //define frame dimensions
        this.character = character;

        this.character.loadIdleRightState();

        this.playerFrameObj =this.character.getCurrStateObj()
        this.frameHeight = this.playerFrameObj.charHeight;
        this.frameWidth = this.playerFrameObj.charWidth;

        //define current character frame
        this.currXFrame = 0 ;
        this.currYFrame = 0 ;

        //load the init image
        this.charImg = new Image();
        this.charImg.src = this.playerFrameObj.spritePath;

        this.playerFrameWaitCount = 0;

        //load the covid image
        this.virusImg = new Image();
        this.virusImg.src = "../images/game/virus/level1.png";

        this.virusWidth = 150;
        this.virusHeight = 150;
    }

    setPlayer(player)
    {
        this.player = player;
        this.updatePlayerDirection();
    }

    updatePlayerDirection()
    {
        let prevState = this.character.getLoadedState();
        let currState;

        if (this.player.isIdle){

            if (this.player.isFacingRight){
                this.character.loadIdleRightState();
            }
            else{
                this.character.loadIdleLeftState();
            }
            
        }

        else if(this.player.isJumping){

            if (this.player.isFacingRight){

                this.character.loadJumpRightState();
            }
            else{

                this.character.loadJumpLeftState();
            }
        }
        else{

            if (this.player.isFacingRight){

                this.character.loadRunRightState();
            }
            else{

                this.character.loadRunLeftState();
            }
        }

   
        currState = this.character.getLoadedState();

        //check if state is changed
        if(prevState !== currState)
        {
            //reset the frame count
            this.currXFrame = 0;
            this.currYFrame = 0;

            //load the new object
            this.playerFrameObj = this.character.getCurrStateObj();
            //update image source
            this.charImg.src = this.playerFrameObj.spritePath;

            this.changePlayerFrame();
        }

    }

    render() {
        this.clearScreen();
        this.drawPlayer();
        this.drawViruses();
    }

    drawPlayer()
    {

        this.context.drawImage(this.charImg,this.playerFrameObj.charWidth*this.currXFrame,this.playerFrameObj.charHeight*this.currYFrame, this.playerFrameObj.charWidth
             ,this.playerFrameObj.charHeight  ,this.player.xPos,this.player.yPos, this.playerWidth,this.playerHeight);

        this.checkPlayerFrameWaitCount();
    }

    checkPlayerFrameWaitCount()
    {
        //check to change the player frame or wait
        if(this.playerFrameWaitCount > 10)
        {
            this.changePlayerFrame();
            this.playerFrameWaitCount = 0;
        }
        else{
            this.playerFrameWaitCount++;
        }
    }

    changePlayerFrame()
    {
        this.currXFrame = (this.currXFrame + 1)% (this.playerFrameObj.colsCount);

        if(this.currXFrame === 0)
        {
            this.currYFrame = (this.currYFrame + 1)% (this.playerFrameObj.rowsCount);
        }
    }

    drawVirus(virus){

        // this.context.fillStyle='green';
        // this.context.beginPath();
        // this.context.arc(virus.getX(),virus.getY(),50,0,Math.PI*2);
        // this.context.fill();
        // this.context.closePath();
        // this.context.stroke();

        this.context.drawImage(this.virusImg,0,0,350,350,virus.getX(),virus.getY(), this.virusWidth,this.virusHeight);

    }

    setViruses(viruses) {
        this.virusArray =viruses
    }

    drawViruses() {
        for( let index = 0 ; index < this.virusArray.length; index++)
        {
            this.drawVirus(this.virusArray[index]);
        }
    }
    clearScreen()
    {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

}

// Class to deal with the character's sprite sheets 
class Character {

    static charState =
    {idleRight:"idleRight", idleLeft: "idleLeft", runRight: "runRight", 
    runLeft: "runLeft", jumpLeft:"jumpLeft", jumpRight:"jumpRight", dead: "dead"};

    constructor()
    {
        //load the base path for the images
        this.basePath = "../images/game/characters/";

        //init the current state
        this.loadedState;

        this.currStateObj = {

            rowsCount: 0 , colsCount: 0, spritePath:"", 
            charWidth: 0, charHeight: 0
        }
    }

    loadIdleRightState()
    {
        this.loadState(Character.charState.idleRight);
    }

    loadIdleLeftState()
    {
        this.loadState(Character.charState.idleLeft);
    }

    loadRunRightState()
    {
        this.loadState(Character.charState.runRight);
    }

    loadRunLeftState()
    {
        this.loadState(Character.charState.runLeft);
    }

    loadJumpRightState()
    {
        this.loadState(Character.charState.jumpRight);
    }

    loadJumpLeftState()
    {
        this.loadState(Character.charState.jumpLeft);
    }

    loadDeadState()
    {
        this.loadState(Character.charState.dead);
    }

    loadState(state)
    {
        //change the current state
        this.loadedState = state;

        //load the current sprite path
        this.currStateObj.spritePath = this.basePath + "/" + this.loadedState+".png";
    }

    getCurrStateObj()
    {
        return this.currStateObj;
    }

    getLoadedState()
    {
        return this.loadedState;
    }
}

class Boy extends Character{

    constructor()
    {
        super();
        this.basePath +="boy";

        //init sprite variables
        //set the state object
        this.currStateObj.rowsCount = 5;
        this.currStateObj.colsCount = 3;
        this.currStateObj.charWidth = 614;
        this.currStateObj.charHeight = 564;
    }
}

class Girl extends Character{

    static normalWidth = 416 ;
    static normalHeight = 454;

    static deadWidth = 450;
    static deadHeight = 502;

    constructor()
    {
        super();
        this.basePath +="girl";

        //init sprite variables
        //set the state object
        this.currStateObj.rowsCount = 4;
        this.currStateObj.colsCount = 4;
    }
    loadIdleRightState()
    {
        super.loadIdleRightState();
        this.setCharacterDimensions();
    }
    loadIdleLeftState()
    {
        super.loadIdleLeftState();
        this.setCharacterDimensions();
    }
    loadRunRightState()
    {
        super.loadRunRightState();
        this.setCharacterDimensions();
    }
    loadRunLeftState()
    {
        super.loadRunLeftState();
        this.setCharacterDimensions();
    }
    loadJumpLeftState()
    {
        super.loadJumpLeftState();
        this.setCharacterDimensions();
    }

    loadJumpRightState()
    {
        super.loadJumpRightState();
        this.setCharacterDimensions();
    }

    loadDeadState()
    {
        super.loadDeadState();
        this.setCharacterDimensions(Girl.deadWidth, Girl.deadHeight);
    }
    setCharacterDimensions(width = Girl.normalWidth , height = Girl.normalHeight)
    {
        this.currStateObj.charWidth = width;
        this.currStateObj.charHeight = height;
    }
}