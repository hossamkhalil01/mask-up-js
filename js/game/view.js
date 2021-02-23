class View
{
    static canvas = document.getElementById("mainCanvas");
    static context = View.canvas.getContext("2d");
    static charHeight;
    static charWidth;
    static virusHeight;
    static virusWidth;
    static syringeWidth;
    static syringeHeight;
    static score;
    static level;

    constructor(player, character, level = 1)
    {
        View.level = level;
        
        //create character object
        this.player = player;
        this.character = character;

        //define character dimensions
        this.updateCharacterDim();
        
        this.character.loadIdleRightState();

        this.playerFrameWaitCount = 0;

        //create viruses object
        this.viruses = new VirusesHandler(View.level);
        this.updateVirusDim();

        //create syinge object
        this.syringes = new SyringesHandler();
        this.updateSyringesDim();
    
        //create background object
        this.background = new Background(View.level, 0.2);

        //define syringe image for the score
        this.syringeRightImg = new Image();
        this.syringeRightImg.src = "../images/game/syringe/right.png";

        //values to display
        this.syringeRation = 0;
        this.maxSyringe = 0;
        this.maxScore = 0;
    }
    

    /*******Static Getters********/
    static getCanvas() {
        return View.canvas;
    }

    static getCanvasWidth()
    {
        return View.canvas.width;
    }
    
    static getCanvasHeight()
    {
        return View.canvas.height;
    }
    static getCharWidth()
    {
        return View.charWidth;
    }
    static getCharHeight()
    {
        return View.charHeight;
    }
    static getVirusHeight()
    {
        return View.virusHeight;
    }
    static getVirusWidth()
    {
        return View.virusWidth;
    }
    static getSyringeWidth()
    {
        return View.syringeWidth;
    }
    static getSyringeHeight()
    {
        return View.syringeHeight;
    }
    static getScore()
    {
        return View.score;
    }

    static getPlayerLevel()
    {
        return View.Level;
    }
    getLevel()
    {
        return View.level;
    }



    /******************Setters*************************/
    setScore(score, maxScore)
    {
        View.score = score;
        this.maxScore = maxScore;
    }
    setPlayer(player)
    {
        this.player = player;
        this.updatePlayerDirection();
    }

    setSyringeRatio(ratio, maxSyringe)
    {
        this.SyringesRatio = ratio;
        this.maxSyringe = maxSyringe;
    }

    /*********** Game Resizing **************/
    //function to resize the canvas
    canvasResize()
    {
        View.canvas.setAttribute("width", this.floatToInt(window.innerWidth*0.95));
        View.canvas.setAttribute("height",this.floatToInt(window.innerHeight*0.95));

        //update objects with the new size
        this.updateCharacterDim();
        this.updateVirusDim();
        this.updateSyringesDim();
        this.background.resize();

    }
    updateCharacterDim()
    {
        View.charHeight = this.floatToInt(View.canvas.height*0.15);
        View.charWidth = this.floatToInt(View.canvas.width*0.05);

        this.character.setDimensions(View.charWidth,View.charHeight);
    }
    updateVirusDim()
    {
        View.virusHeight = this.floatToInt(View.canvas.height*0.07);
        View.virusWidth = this.floatToInt(View.canvas.width*0.05);

        this.viruses.setDimensions(View.virusWidth,View.virusHeight);
    }
    updateSyringesDim()
    {
        View.syringeWidth = this.floatToInt(View.canvas.width*0.04);
        View.syringeHeight = this.floatToInt(View.canvas.height*0.03);

        this.syringes.setDimensions(View.syringeWidth , View.syringeHeight);
    }


    /**********View Updates ********/
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

    updateViruses(virusesArr)
    {
        this.viruses.setVirusesArray(virusesArr);
    }

    updateSyringes(syringesArr)
    {
        this.syringes.setSyringesArray(syringesArr);
    }

    updateLevel(level) {

        View.level = level;
        //limit the scene levels
        if (level > 3)
        {
            level = 3;
        }
        this.viruses.changeLevel(level);
        this.background.updateLevel(level);
    }


    /********** Frame Rendring functions*******/
    render() {

        this.clearScreen();
        this.background.update();
        this.drawPlayer();
        this.viruses.draw();
        this.syringes.draw();
        this.drawScore();
        this.drawSyringes();
        this.drawLevel();
    }

    drawPlayer()
    {
        this.character.draw(this.player.xPos,this.player.yPos);
        this.checkPlayerFrameWaitCount();
    }
    drawSyringes(){

        View.context.drawImage(this.syringeRightImg,0,0,SyringesHandler.frameWidth,SyringesHandler.frameHeight
            ,this.floatToInt(View.canvas.width*0.07), this.floatToInt(View.canvas.height*0.11), this.floatToInt(View.canvas.width*0.05),this.floatToInt(View.canvas.height*0.06));
        
        View.context.fillText(` :  ${this.SyringesRatio} / ${this.maxSyringe}`, this.floatToInt(View.canvas.width*0.14), this.floatToInt(View.canvas.height*0.15));
    }

    drawLevel() {
        View.context.fillText(`Level         :  ${View.level}`, this.floatToInt(View.canvas.width*0.07), this.floatToInt(View.canvas.height*0.20));

    }
    drawScore() {

        View.context.beginPath();
        View.context.rect(this.floatToInt(View.canvas.width*0.05), this.floatToInt(View.canvas.height*0.05),
         this.floatToInt(View.canvas.width*0.18), this.floatToInt(View.canvas.height*0.17));
        View.context.stroke();

        View.context.fillStyle = "#307D7E";

        View.context.fillRect(this.floatToInt(View.canvas.width*0.05), this.floatToInt(View.canvas.height*0.05),
        this.floatToInt(View.canvas.width*0.18), this.floatToInt(View.canvas.height*0.17));

        View.context.fillStyle = "#E5E4E2";

        View.context.font = View.canvas.width*0.015+"px Arial";
        View.context.fillText(`Your Score:  ${View.score} / ${this.maxScore}`, this.floatToInt(View.canvas.width*0.07), this.floatToInt(View.canvas.height*0.09));

    }
    checkPlayerFrameWaitCount()
    {
        //check to change the player frame or wait
        if(this.playerFrameWaitCount > 8)
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
        View.context.clearRect(0, 0, View.canvas.width, View.canvas.height);
    }

    floatToInt(num) {
        return Math.floor(num);
    }
}

/************ Helper Classes **************/

// Class to deal with the character's sprite sheets 
class Character {

    static charState =
    {idleRight:"idleRight", idleLeft: "idleLeft", runRight: "runRight", 
     runLeft: "runLeft", jumpLeft:"jumpLeft", jumpRight:"jumpRight",
     deadLeft: "deadLeft", deadRight: "deadRight"};

    constructor()
    {
        //load the base path for the images
        this.basePath = "../images/game/characters/";

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

    setDimensions(width ,height)
    {
        this.charWidth = width;
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
        View.context = this.canvas.getContext("2d");
    }
    

    draw(xPos,yPos)
    {
        View.context.drawImage(this.spriteImg, this.currSheetDim.width*this.currXFrame, this.currSheetDim.height*this.currYFrame, 
            this.currSheetDim.width,this.currSheetDim.height, Math.floor(xPos),Math.floor(yPos),this.charWidth,this.charHeight); 
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

    constructor()
    {
        super();
        this.basePath +="boy";

        //set sheets dimensions
        this.deadSheetDim = {width: 614 , height: 520, rows:3 , cols:5};
        this.idleSheetDim = {width: 302, height: 477, rows:3 , cols:5};
        this.jumpSheetDim = {width: 390, height: 501, rows:3 , cols:5};
        this.runSheetDim = {width: 359, height: 502, rows:3 , cols:5};
    }
}

class Girl extends Character{

    constructor()
    {
        super();
        this.basePath +="girl";

        //set sheets dimensions
        this.deadSheetDim = {width: 601 , height: 502, rows:3 , cols:5};
        this.idleSheetDim = {width: 416, height: 454, rows:4 , cols:4};
        this.jumpSheetDim = {width: 416, height: 454, rows:4 , cols:4};
        this.runSheetDim = {width: 416, height: 454, rows:4 , cols:4};
    }
}

//class to deal with viruses
class VirusesHandler{

    static frameWidth = 350;
    static frameHeight = 350;

    constructor(level,virusWidth,vriusHeight)
    {
        //load the covid image
        this.virusImg = new Image();
        this.virusImg.src = "../images/game/virus/level"+level+".png";

        this.virusWidth = virusWidth;   
        this.virusHeight = vriusHeight;

        this.virusArray= [];
    }
    changeLevel(level)
    {
        this.virusImg.src = "../images/game/virus/level"+level+".png";

        //assign the new width and height
        if (level == 3){
            VirusesHandler.frameHeight = VirusesHandler.frameWidth =  512;
        }
        else{
            VirusesHandler.frameHeight = VirusesHandler.frameWidth =  350;
        }

    }

    setDimensions(width, height)
    {
        this.virusWidth = width;
        this.virusHeight = height;
    }

    drawVirus(virus){
        View.context.drawImage(this.virusImg,0,0,VirusesHandler.frameWidth,VirusesHandler.frameHeight,
            virus.getX(),virus.getY(), this.virusWidth,this.virusHeight);
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

//class to deal with syringes
class SyringesHandler
{
    static frameWidth = 200;
    static frameHeight= 61;

    constructor(syringeWidth, syringeHeight)
    {
        //load the covid image
        this.syringeRightImg = new Image();
        this.syringeRightImg.src = "../images/game/syringe/right.png";

        this.syringeLeftImg = new Image();
        this.syringeLeftImg.src = "../images/game/syringe/left.png";

        this.syringeWidth = syringeWidth;   
        this.syringeHeight = syringeHeight;

        this.syringeArr= [];
    }

    setDimensions(width,height)
    {
        this.syringeHeight = height;
        this.syringeWidth = width;
    }

    drawSyringe(syringe){
        //right direction
        if (syringe.getDirection() == 1)
        {
            View.context.drawImage(this.syringeRightImg,0,0,SyringesHandler.frameWidth,SyringesHandler.frameHeight
                ,syringe.getX(),syringe.getY(), this.syringeWidth,this.syringeHeight);
        }
        //left direction
        else{
            View.context.drawImage(this.syringeLeftImg,0,0,SyringesHandler.frameWidth,SyringesHandler.frameHeight
                ,syringe.getX(),syringe.getY(), this.syringeWidth,this.syringeHeight);
        }
    }

    setSyringesArray(syringesArr) {
        this.syringeArr = syringesArr;
    }

    draw() {
        for( let index = 0 ; index < this.syringeArr.length; index++)
        {
            this.drawSyringe(this.syringeArr[index]);   
        }
    }
}

//class infinite background
class Background
{

    constructor(level, speed)
    {
        this.img = new Image();
        this.img.src = "../images/game/backgrounds/level"+level+".jpg";
        this.x1 = 0;
        this.x2 = View.canvas.width;
        this.y = 0;
        this.width = View.canvas.width;
        this.height = View.canvas.height;

        this.speed = speed;
    }
    updateLevel(level)
    {
        this.img.src = "../images/game/backgrounds/level"+level+".jpg";    
    }

    //function to resize
    resize()
    {
        this.x2 = View.canvas.width;
        this.width = View.canvas.width;
        this.height = View.canvas.height;
    }

    //update background
    update()
    {   
        //handle boundries for image 1 
        if (this.x1 <= - this.width)
        {
            this.x1 = this.width*0.9;
        }
        else 
        {
            this.x1 -= this.speed;
        }

        //handle boundries for image 2
        if (this.x2 <= -this.width)
        {
            this.x2 = this.width*0.9;
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
        View.context.drawImage(this.img, this.x1 , this.y , this.width, this.height);

        //draw image 2
        View.context.drawImage(this.img, this.x2 , this.y , this.width, this.height);
        
    }
}