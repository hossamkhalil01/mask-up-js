class View
{
    static canvas = document.getElementById("mainCanvas");
    static playerHeight = 504;
    static playerWidth = 603;
    static gameFrame =0;


    getCanvas() {
        return canvas.getContext("2d");
    }

    constructor(canvasElement , xPos,yPos ,xFrame,yFrame)
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
        this.xFrame=xFrame;
        this.yFrame=yFrame;
        this.xPos=xPos;
        this.yPos=yPos;
    }
    
    addVirus() {
        this.virusArray.push( new Virus());
        console.log(this.virusArray.length);
    }
    setPlayer(xPos, yPos ,xFrame ,yFrame)
    {
        this.xFrame=xFrame;
        this.yFrame=yFrame;
        this.xPos=xPos;
        this.yPos=yPos;
    }

    drawGame() {
        this.clearScreen();
        this.drawPlayer();
        this.drawViruses();
    }
    drawPlayer()
    {
        var img = new Image();
        img.src="../images/girlS.png";
        console.log("xpos"+this.xPos + "yPos"+this.yPos);
        console.log(View.playerWidth*this.xFrame);
        this.context.drawImage(img,View.playerWidth*this.xFrame,View.playerHeight*this.yFrame, View.playerWidth ,View.playerHeight  ,this.xPos,this.yPos, this.playerWidth,this.playerHeight);
        console.log("why you here ");
    }

    drawVirus(virus){
        this.context.fillStyle='green';
        this.context.beginPath();
        this.context.arc(virus.getX(),virus.getY(),50,0,Math.PI*2);
        this.context.fill();
        this.context.closePath();
        this.context.stroke();
    }

    handleViruses() {
        for( var index = 0 ; index < this.virusArray.length; index++)
        {
            this.virusArray[index].update();
        }
    }
    drawViruses() {
        for( var index = 0 ; index < this.virusArray.length; index++)
        {
            this.drawVirus(this.virusArray[index]);
        }
    }
    clearScreen()
    {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    renderCurrentFrame()
    {

    }
    updateFrame()
    {

    }
}

// Class to deal with the character's sprite sheets 
class Character {

    static charState =
    {idleRight:"idle", idleLeft: "idle", runRight: "run", 
    runLeft: "run", jump:"jump", dead: "dead"};

    //character number (1) for boy character and (2) for girl character
    constructor()
    {
        //load the base path for the images
        this.basePath = "../../images/game/characters/";

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

    loadJumpState()
    {
        this.loadState(Character.charState.jump);
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
        this.currStateObj.spritePath = this.basePath += this.loadedState;
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
        this.currStateObj.spritePath = this.basePath+="idle.png";
        this.setCharacterDimensions();
    }
    loadIdleLeftState()
    {
        super.loadIdleLeftState();
        this.currStateObj.spritePath = this.basePath+="idle.png";
        this.setCharacterDimensions();
    }
    loadRunRightState()
    {
        super.loadRunRightState();
        this.currStateObj.spritePath = this.basePath+="run.png";
        this.setCharacterDimensions();
    }
    loadRunLeftState()
    {
        super.loadRunLeftState();
        this.currStateObj.spritePath = this.basePath+="run.png";
        this.setCharacterDimensions();
    }
    loadJumpState()
    {
        super.loadJumpState();
        this.currStateObj.spritePath = this.basePath+="jump.png";
        this.setCharacterDimensions();
    }
    loadDeadState()
    {
        super.loadDeadState();
        this.currStateObj.spritePath = this.basePath+="dead.png";
        this.setCharacterDimensions(Girl.deadWidth, Girl.deadHeight);
    }
    setCharacterDimensions(width = Girl.normalWidth , height = Girl.normalHeight)
    {
        this.currStateObj.charWidth = width;
        this.currStateObj.charHeight = height;
    }
}