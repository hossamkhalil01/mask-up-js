class Model
{
    //max syringe  at a time
    static maxSyringeCount = 5;
    //define  the kill bonus
    static killBonus = 5;

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
    }

    /************Getters *********/
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
    getIsCharHit()
    {
        return this.isCharHit;
    }

    /****Controller commands****/
    addVirus() {
        this.virusArr.push( new Virus());
    }

    shoot()
    {
        if( this.syringeArr.length < Model.maxSyringeCount)
        {
            this.syringeArr.push(new Syringe(this.player.getX()+View.getCharWidth()*0.4, this.player.getY() + View.getCharHeight()*0.8,this.player.getDirection()));
        }
    }

    /********Update objects states ******/
    removeSyringeOnBoundries(index)
    {
        //check boundries
        if(this.syringeArr[index].getX() < -View.getSyringeWidth() || (this.syringeArr[index].getX() > View.getCanvasWidth()))
        {
            this.syringeArr.splice(index,1);
        }
    }
    removeVirusOnBoundries(virusIndex) {

        if(this.virusArr[virusIndex].getX() < -View.getVirusWidth())
        {
            this.virusArr.splice(virusIndex,1);
        }
    }
    handleSyringes()
    {
        for( var index = 0 ; index < this.syringeArr.length; index++)
        {
            this.syringeArr[index].updatePos();
            if(!this.isSyringeViruseHit(index))
            {
                this.removeSyringeOnBoundries(index);
            }
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

    /*********Collision detection**********/
    isSyringeViruseHit(syringeIndx)
    {
       //define margins for collision
        let widthMargin = View.getSyringeWidth()*0.2;
        let heightMargin = View.getSyringeHeight()*0.2;

        //all measures are relative to the player's position
        let topSideDistance;
        let bottomSideDistance;
        let directionSideDistance;

        //loop through current viruses
        for (let virusIndx = 0 ; virusIndx < this.virusArr.length ; virusIndx++)
        {
            //check collision
            topSideDistance =  this.syringeArr[syringeIndx].getY() - (this.virusArr[virusIndx].getY() + View.getVirusHeight());
            bottomSideDistance = this.virusArr[virusIndx].getY() - (this.syringeArr[syringeIndx].getY() + View.getSyringeHeight());
           
            //assign the right side for collision
            if (this.syringeArr[syringeIndx].getDirection() == 1)
            {   
                directionSideDistance = this.virusArr[virusIndx].getX() - (this.syringeArr[syringeIndx].getX() + View.getSyringeWidth());
            }
            //left direction syringe
            else{
                directionSideDistance = this.syringeArr[syringeIndx].getY() - (this.virusArr[virusIndx].getX() + View.getVirusWidth());
            }

            //check for direction side collision
            if (!(topSideDistance > -heightMargin || directionSideDistance > -widthMargin || bottomSideDistance > -heightMargin))
            {
                this.handleVirusSyringeCollision(syringeIndx,virusIndx);
                return true;
            }
        }
        return false;
    }
    handleVirusSyringeCollision(syringeIndx , virusIndx)
    {
        //remove both from the array
        this.virusArr.splice(virusIndx,1);
        this.syringeArr.splice(syringeIndx,1);

        //update the score
        this.increasePlayerScore();
    }
    detectVirusesCollision(virusIndex)
    {
       if (this.isCharHit)
       {
           return;
       }
       if(this.isVirusPlayerCollision(this.virusArr[virusIndex].getX(), this.virusArr[virusIndex].getY() 
                                , this.player.getX(), this.player.getY()))                
        {
            this.isCharHit = true; 
            this.player.setIsDead();               
        }
    }
    isVirusPlayerCollision(virusXPos, virusYPos, playerXPos, playerYPos)
    {
        //define margins for collision
        let widthMargin = View.getCharWidth()*0.6;
        let heightMargin = View.getCharHeight()*0.2;

        //all measures are relative to the player's position
        let topSideDistance  = playerYPos - (virusYPos + View.getVirusHeight());
        let rightSideDistance = virusXPos - (playerXPos + View.getCharWidth());
        let bottomSideDistance = virusYPos - (playerYPos + View.getCharHeight());
        let leftSideDistance = playerXPos - (virusXPos + View.getVirusWidth());

        if (topSideDistance > -heightMargin || rightSideDistance > -widthMargin || bottomSideDistance > -heightMargin 
            || leftSideDistance > -widthMargin )
        {
            return false;
        }
        else {
            return true;
        }
    }

    /***********Update score**************/
    increasePlayerScore() {
        this.player.setScore(this.player.getScore()+Model.killBonus);
    }
}

/***********Helper Classes*********/
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
    checkLevel() {
        if (this.getScore() >5 && this.getScore() <30)
        {
            return "level2"
        }
        if (this.getScore() >15 && this.getScore() <30)
        {
            return "level3"
        }
        else
        {
            return "level1"
        }
    }

    moveRight()
    {
        this.xPos += this.dx;
        //check the boundires
        if (this.xPos > this.xMaxPos)
        {
            this.xPos = this.xMaxPos;
        }
        console.log("xPos: ",this.xPos);

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
        console.log("xPos: ",this.xPos);
        this.isFacingRight = false;

    }
    moveUp()
    {

        if (this.yPos >= 480)
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
        this.x =View.getCanvasWidth();
        this.y = (Math.random()* View.getCanvasHeight()) + View.getCanvasHeight()*0.3;

        if(this.y > View.getCanvasHeight()*0.7)
        {
            this.y = View.getCanvasHeight()*0.7;
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