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
    setContext(context)
    {
        this.context =context;
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
    runLeft: "runLeft", jumpLeft:"jumpLeft", jumpRight:"jumpRight", dead: "dead"};

    constructor(canvas)
    {
        //load the base path for the images
        this.basePath = "../images/game/characters/";

        //save the canvas object
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        //init the current state
        this.currState = Character.idleRight;
        this.rowsCount;
        this.colsCount;

        this.frameWidth;
        this.frameHeight;

        //put default values for character width and height
        this.charWidth = 150;
        this.charHeight = 150;

        this.spritePath;

        this.currXFrame = 0 ;
        this.currYFrame = 0;

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
        this.ctx.beginPath();
        this.ctx.rect(70, 20, 250, 100);
        this.ctx.stroke();
        this.ctx.fillStyle = "red";
        this.ctx.font = "25px Arial";
        this.ctx.fillText(`Your score:  ${model.getPlayer().getScore()}`, 110, 70);
        this.ctx.drawImage(this.spriteImg, this.frameWidth*this.currXFrame, this.frameHeight*this.currYFrame, this.frameWidth,this.frameHeight
        , xPos,yPos,this.charWidth,this.charHeight); 
    }
    getCurrentFrame()
    {
        return this.frameImg;
    }
    loadNextFrame()
    {
        this.currXFrame = (this.currXFrame + 1)% (this.colsCount);

        if(this.currXFrame === 0)
        {
            this.currYFrame = (this.currYFrame + 1)% (this.rowsCount);
        }
    }

    isStateChanged(state)
    {
        return state !== this.currState;
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
        //if state is changed reset variables
        if(this.isStateChanged(state))
        {
            //load the new state
            this.currState = state;

            //load the new sprite path
            this.spritePath = this.basePath + "/" + this.currState+".png";
            //load the sprite image
            this.spriteImg.src = this.spritePath;

            //reset variables
            this.currXFrame = 0;
            this.currYFrame = 0;
        }
    }
}


class Boy extends Character{

    constructor(canvas)
    {
        super(canvas);
        this.basePath +="boy";

        //init sprite variables
        //set the state object
        this.rowsCount = 3;
        this.colsCount = 5;
        this.frameWidth = 390;
        this.frameHeight = 565;
    }
}

class Girl extends Character{

    static normalWidth = 416 ;
    static normalHeight = 454;

    static deadWidth = 450;
    static deadHeight = 502;

    constructor(canvas)
    {
        super(canvas);
        this.basePath +="girl";

        //init sprite variables
        //set the state object
        this.rowsCount = 4;
        this.colsCount = 4;

    }

    setCharacterWidth(width)
    {
        this.charWidth = 0.8*width;
    }

    setCharacterHeight(height)
    {
        this.charHeight = 0.9*height;
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
        this.frameWidth = width;
        this.frameHeight = height;
    }
}