class Model
{
    static maxSyringeCount = 5;
    static canvasWidtht=1900;
    static canvasHeight =800;

    static getCanvasWidth()
    {
        return this.canvasWidtht;
    }
    static getCanvasHeight()
    {
        return this.canvasHeight;
    }
    constructor(initPlayerX, initPlayerY, maxX )
    {
        //create viruses
        this.virusArr=[];

        //init the player object to hold player data
        this.player = new Player(initPlayerX, initPlayerY ,maxX);

        //detect player hit
        this.isCharHit = false;

        //init syringe object
        this.syringeArr=[];

        //define  the kill bonus
        this.killBonus = 5;
    }

    addVirus() {
        this.virusArr.push( new Virus());
    }

    addSyringe(){

        if( this.syringeArr.length <= Model.maxSyringeCount)
        {
            this.syringeArr.push(new Syringe(this.player.getX()+View.charWidth*0.4, this.player.getY() + View.charHeight*0.8,this.player.getDirection()));
        }
    }

    removeSyringeOnBoundries(index)
    {
        //check boundries
        if(this.syringeArr[index].getX() < -View.syringeWidth || (this.syringeArr[index].getX() > this.canvasWidtht+View.syringeWidth ))
        {
            this.syringeArr.splice(index,1);
        }
    }

    handleSyringes()
    {
        for( var index = 0 ; index < this.syringeArr.length; index++)
        {
            this.syringeArr[index].updatePos();
            this.removeSyringeOnBoundries(index);
            this.detectViruseHit(index);
        }
    }
    detectViruseHit(syringeIndx)
    {
       //define margins for collision
        let widthMargin = View.syringeWidth*0.2;
        let heightMargin = View.syringeHeight*0.2;

        //all measures are relative to the player's position
        let topSideDistance;
        let bottomSideDistance;
        let directionSideDistance;

        //loop through current viruses
        for (let virusIndx = 0 ; virusIndx < this.virusArr.length ; virusIndx++)
        {
            //check collision
            topSideDistance =  this.syringeArr[syringeIndx].getY() - (this.virusArr[virusIndx].getY() + View.virusHeight);
            bottomSideDistance = this.virusArr[virusIndx].getY() - (this.syringeArr[syringeIndx].getY() + View.syringeHeight);
           

            //assign the right side for collision
            if (this.syringeArr[syringeIndx].getDirection() == 1)
            {   
                directionSideDistance = this.virusArr[virusIndx].getX() - (this.syringeArr[syringeIndx].getX() + View.syringeWidth);
            }
            //left direction syringe
            else{
                directionSideDistance = this.syringeArr[syringeIndx].getY() - (this.virusArr[virusIndx].getX() + View.virusWidth );
            }

            //check for direction side collision
            if (!(topSideDistance > -heightMargin || directionSideDistance > -widthMargin || bottomSideDistance > -heightMargin))
            {
                this.handleVirusSyringeCollision(syringeIndx,virusIndx);
                return;
            }
        }
    }

    handleVirusSyringeCollision(syringeIndx , virusIndx)
    {
        //remove both from the array
        this.virusArr.splice(virusIndx,1);
        this.syringeArr.splice(syringeIndx,1);

        //update the score
        this.increasePlayerScore();
    }

    increasePlayerScore() {
        this.player.setScore(this.player.getScore()+this.killBonus);
    }

    removeVirusOnBoundries(virusIndex) {

        if(this.virusArr[virusIndex].getX() < -View.virusWidth )
        {
            this.virusArr.splice(virusIndex,1);
        }
    }
    
    detectVirusesCollision(virusIndex)
    {
       if (this.isCharHit)
       {
           return;
       }
       if(this.isVirusPlayerCollision(this.virusArr[virusIndex].x, this.virusArr[virusIndex].y 
                                , this.player.getX(), this.player.getY()))                
        {
            this.isCharHit = true; 
            this.player.setIsDead();               
        }
    }

    isVirusPlayerCollision(virusXPos, virusYPos, playerXPos, playerYPos)
    {
        //define margins for collision
        let widthMargin = View.charWidth*0.6;
        let heightMargin = View.charHeight*0.2;


        //all measures are relative to the player's position
        let topSideDistance  = playerYPos - (virusYPos + View.virusHeight);
        let rightSideDistance = virusXPos - (playerXPos + View.charWidth);
        let bottomSideDistance = virusYPos - (playerYPos + View.charHeight);
        let leftSideDistance = playerXPos - (virusXPos + View.virusWidth);

        if (topSideDistance > -heightMargin || rightSideDistance > -widthMargin || bottomSideDistance > -heightMargin 
            || leftSideDistance > -widthMargin )
        {
            return false;
        }
        else {
            return true;
        }
    }

    handleViruses() {
        for( var index = 0 ; index < this.virusArr.length; index++)
        {
            this.virusArr[index].updatePos();
            this.detectVirusesCollision(index);
            this.removeVirusOnBoundries(index);
        }
    }

    getViruses() {
        return this.virusArr;
    }

    getPlayer() {
        return this.player;
    }

    getSyringes()
    {
        return this.syringeArr;
    }
}
class Player{

    constructor(initPlayerX, initPlayerY , maxX) {
        Model.initPlayerY=initPlayerY;
        this.xPos = initPlayerX;
        this.yPos =initPlayerY;

        this.dx = 15//speed in x direction
        this.dy = 0 ; // speed
        this.drag = 0.5; // the drag is 0.01
        this.grav = 0.7;
        this.isFacingRight = true;
        this.isJumping= false;
        this.isDown = false;
        this.isDead = false;
        this.xMaxPos = maxX;
        this.xMinPos = initPlayerX;
        this.isIdle = true;
        this.onGround = false;
        this.score = 0;
    }
    setScore(score) {
        this.score = score;
    }
    getScore(){
        return this.score;
    }

    moveRight()
    {
        this.xPos += this.dx;
        //check the boundires
        if (this.xPos > this.xMaxPos)
        {
            this.xPos = this.xMaxPos;
        }

        this.isFacingRight = true;
    }
    moveLeft()
    {
        this.xPos -= this.dx;

        //check the boundires
        if (this.xPos < this.xMinPos)
        {
            this.xPos = this.xMinPos;
        }

        this.isFacingRight = false;

    }
    moveUp()
    {

        if (this.yPos >=480)
        {
            this.isJumping=true;
        }
    }


    moveDown()
    {
        this.yPos-=1;
        this.isDown = true;
        this.isJumping = false;
    }
    
    setIdle(idleStatus)
    {
        this.isIdle = idleStatus;
    }
    setPlayerX(xPos)
    {
        this.xPos = xPos;
    }
    setPlayerY(yPos)
    {
        this.yPos = yPos;
    }
    setIsDead()
    {
        this.isDead = true;
    }

    getX()
    {
        return this.xPos;
    }
    getY()
    {
        return this.yPos;
    }

    getDirection()
    {
        if (this.isFacingRight)
        {
            return 1;
        }
        else {
            return -1;
        }
    }

}

class Syringe
{
    constructor(xPos,yPos,direction) {

        this.x = xPos;
        this.y = yPos;
        this.direction = direction;
        this.speed = 2*direction;
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }
    updatePos()
    {
        this.x += this.speed;
    }
    getDirection()
    {
        return this.direction;
    }
}

class Virus {

    constructor() {
        this.x =Model.getCanvasWidth();
        this.y = (Math.random()* Model.getCanvasHeight()) + Model.getCanvasHeight()*0.3;

        if(this.y > Model.getCanvasHeight()*0.7)
        {
            this.y = Model.getCanvasHeight()*0.7;
        }
        
        this.speed = Math.random()*3+1;
        this.distance;
    }
    getX() {

        return this.x;
    }

    getY() {
        return this.y;
    }
    updatePos(){
        this.x-=(this.speed) /2;
    }
}