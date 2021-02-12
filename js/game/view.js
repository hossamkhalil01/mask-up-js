class View
{
    static charHeight;
    static charWidht;
    static virusHeight;
    static virusWidth;

    constructor(canvasElement ,player, character)
    {
        this.virusArray= [];
        this.canvas = canvasElement;
        this.context = this.canvas.getContext("2d");

        //define canvas dimensions
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.player = player;

        //define frame dimensions
        this.character = character;

        //define character dimensions
        this.playerHeight = this.canvasHeight*0.25;
        this.playerWidth = this.canvasWidth*0.1;

        View.charHeight = this.playerHeight;
        View.charWidth = this.playerWidth;


        this.character.setCharacterWidth(this.playerHeight);
        this.character.setCharacterHeight(this.playerWidth);
        

        this.character.loadIdleRightState();

        this.playerFrameWaitCount = 0;

        //load the covid image
        this.virusImg = new Image();
        this.virusImg.src = "../images/game/virus/level1.png";

        this.virusWidth = 80;   
        this.virusHeight = 80;

        View.virusHeight = this.virusHeight;
        View.virusWidth = this.virusWidth;
    }

    getCanvas() {
        return canvas.getContext("2d");
    }

    getPlayerHeight()
    {
        return this.playerHeight;
    }

    getPlayerWidth()
    {
        return this.playerWidth;
    }

    setPlayer(player)
    {
        this.player = player;
        this.updatePlayerDirection();
    }

    updatePlayerDirection()
    {

        if(this.player.isDead && this.player.isFacingRight)
        {
            this.character.loadDeadRightState();
        }

        else if(this.player.isDead && ! this.player.isFacingRight)
        {
            this.character.loadDeadLeftState();
        }

        else if (this.player.isIdle){

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
    }

    render() {
        this.clearScreen();
        this.drawPlayer();
        this.drawViruses();
    }

    drawPlayer()
    {
        this.character.draw(this.player.xPos,this.player.yPos);
        this.checkPlayerFrameWaitCount();
    }

    checkPlayerFrameWaitCount()
    {
        //check to change the player frame or wait
        if(this.playerFrameWaitCount > 10)
        {
            this.character.loadNextFrame();
            this.playerFrameWaitCount = 0;
        }
        else{
            this.playerFrameWaitCount++;
        }
    }

    drawVirus(virus){

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
     runLeft: "runLeft", jumpLeft:"jumpLeft", jumpRight:"jumpRight",
     deadLeft: "deadLeft", deadRight: "deadRight"};

    constructor(canvas)
    {
        //load the base path for the images
        this.basePath = "../images/game/characters/";

        //save the canvas object
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        //init the states sheets dimensions
        this.deadSheetDim = {width: 0, height: 0, rows:0 , cols:0};
        this.idleSheetDim = {width: 0, height: 0, rows:0 , cols:0};
        this.jumpSheetDim = {width: 0, height: 0, rows:0 , cols:0};
        this.runSheetDim  = {width: 0, height: 0, rows:0 , cols:0};


        //init the current state
        this.currState;
        this.currSheetDim;

        this.currXFrame = 0 ;
        this.currYFrame = 0;

        //put default values for character width and height
        this.charWidth = 150;
        this.charHeight = 150;

        this.spritePath;
        this.spriteImg = new Image();

    }

    setCharacterWidth(width)
    {
        this.charWidth = width;
    }

    setCharacterHeight(height)
    {
        this.charHeight = height;
    }

    getCharacterWidth()
    {
        return this.charWidth;
    }

    getCharacterHeight()
    {
        return this.charHeight;
    }

    setCanvas(canvas)
    {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    draw(xPos,yPos)
    {
        this.ctx.drawImage(this.spriteImg, this.currSheetDim.width*this.currXFrame, this.currSheetDim.height*this.currYFrame, 
            this.currSheetDim.width,this.currSheetDim.height, xPos,yPos,this.charWidth,this.charHeight); 
    }

    loadNextFrame()
    {
        this.currXFrame = (this.currXFrame + 1) % (this.currSheetDim.cols);

        if(this.currXFrame === 0)
        {
            this.currYFrame = (this.currYFrame + 1) % (this.currSheetDim.rows);
        }
    }

    isStateChanged(state)
    {
        return state !== this.currState;
    }

    loadIdleRightState()
    {
        //load the state
        this.loadState(Character.charState.idleRight, this.idleSheetDim);
    }

    loadIdleLeftState()
    {
        this.loadState(Character.charState.idleLeft, this.idleSheetDim);
    }

    loadRunRightState()
    {
        this.loadState(Character.charState.runRight, this.runSheetDim);
    }

    loadRunLeftState()
    {
        this.loadState(Character.charState.runLeft, this.runSheetDim);
    }

    loadJumpRightState()
    {
        this.loadState(Character.charState.jumpRight, this.jumpSheetDim);
    }

    loadJumpLeftState()
    {
        this.loadState(Character.charState.jumpLeft, this.jumpSheetDim);
    }

    loadDeadLeftState()
    {
        this.loadState(Character.charState.deadLeft, this.deadSheetDim);
    }

    loadDeadRightState()
    {
        this.loadState(Character.charState.deadRight, this.deadSheetDim);
    }

    loadState(state , newStateDim)
    {
        //if state is changed reset variables
        if(this.isStateChanged(state))
        {
            //load the new state
            this.currState = state;
            this.currSheetDim = newStateDim;

            //reset frames count
            this.currXFrame = 0;
            this.currYFrame = 0;

            //load the new sprite path
            this.spritePath = this.basePath + "/" + this.currState+".png";
            //load the sprite image
            this.spriteImg.src = this.spritePath;
        }
    }
}


class Boy extends Character{


    constructor(canvas)
    {
        super(canvas);
        
        this.basePath +="boy";

        //set sheets dimensions
        this.deadSheetDim = {width: 614 , height: 520, rows:3 , cols:5};
        this.idleSheetDim = {width: 302, height: 477, rows:3 , cols:5};
        this.jumpSheetDim = {width: 390, height: 501, rows:3 , cols:5};
        this.runSheetDim = {width: 359, height: 502, rows:3 , cols:5};


    }

    // setCharacterHeight(height)
    // {
    //     this.charHeight = 0.9*height;
    // }

}

class Girl extends Character{

    constructor(canvas)
    {
        super(canvas);
        this.basePath +="girl";

        //set sheets dimensions
        this.deadSheetDim = {width: 601 , height: 502, rows:3 , cols:5};
        this.idleSheetDim = {width: 416, height: 454, rows:4 , cols:4};
        this.jumpSheetDim = {width: 416, height: 454, rows:4 , cols:4};
        this.runSheetDim = {width: 416, height: 454, rows:4 , cols:4};
    }

    // setCharacterWidth(width)
    // {
    //     this.charWidth = 0.9*width;
    // }

}

//class infinite background
class Background
{

    constructor(imgPath)
    {
        this.BGImg = new Image();
        this.BGImg.src = imgPath;

        this.curr
    }
}