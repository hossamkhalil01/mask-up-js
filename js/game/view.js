class View
{
    static charHeight;
    static charWidht;
    static virusHeight;
    static virusWidth;

    constructor(canvasElement ,player, character, level)
    {

        this.canvas = canvasElement;
        this.context = this.canvas.getContext("2d");

        //define canvas dimensions
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.player = player;

        //create character object

        this.character = character;
        //define character dimensions
        this.playerHeight = this.canvasHeight*0.15;
        this.playerWidth = this.canvasWidth*0.1;

        View.charHeight = this.playerHeight;
        View.charWidth = this.playerWidth;

        this.character.setCharacterWidth(View.charHeight);
        this.character.setCharacterHeight(View.charWidth);
        
        this.character.loadIdleRightState();

        this.playerFrameWaitCount = 0;

        //create viruses object
        View.virusHeight = this.canvasHeight*0.07;
        View.virusWidth = this.canvasWidth*0.05;

        this.viruses = new VirusesHandler(this.canvas,View.virusWidth , View.virusHeight, level);
    
        //create background object
        this.BGImg = new Background(this.canvas, level, 0.25);
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
        this.BGImg.update();
        this.drawPlayer();
        this.viruses.draw();
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

//class to deal with viruses
class VirusesHandler{

    constructor(canvas,virusWidth,vriusHeight,level)
    {
        //define canvas
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        //load the covid image
        this.virusImg = new Image();
        this.virusImg.src = "../images/game/virus/"+level+".png";

        this.virusWidth = virusWidth;   
        this.virusHeight = vriusHeight;

        this.virusArray= [];
    }

    drawVirus(virus){
        this.ctx.drawImage(this.virusImg,0,0,350,350,virus.getX(),virus.getY(), this.virusWidth,this.virusHeight);
    }

    setVirusesArray(viruses) {
        this.virusArray =viruses
    }

    draw() {
        for( let index = 0 ; index < this.virusArray.length; index++)
        {
            this.drawVirus(this.virusArray[index]);
        }
    }
}
//class infinite background
class Background
{

    constructor(canvas, level, speed)
    {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.img = new Image();
        this.img.src = "../images/game/backgrounds/"+level+".jpg";
        this.x1 = 0;
        this.x2 = this.canvas.width;
        this.y = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.speed = speed;
    }

    //update background
    update()
    {   
        //handle boundries for image 1 
        if (this.x1 <= - this.width)
        {
            this.x1 = this.width;
        }
        else 
        {
            this.x1 -= this.speed;
        }

        //handle boundries for image 2
        if (this.x2 <= -this.width)
        {
            this.x2 = this.width;
        }
        else
        {
            this.x2 -= this.speed;
        }
        this.draw();
    }
    draw()
    {
        //draw image 1 
        this.ctx.drawImage(this.img, this.x1 , this.y , this.width, this.height);

        //draw image 2
        this.ctx.drawImage(this.img, this.x2 , this.y , this.width, this.height);
    }
}