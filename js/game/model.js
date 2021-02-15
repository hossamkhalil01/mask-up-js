class Model
{
    //max syringe  at a time
    static maxSyringeCount = 5;
    //define  the kill bonus
    static killBonus = 5;
    //init positions factors
    static playerMinXFactor = 0.02;
    static playerMaxXFactor = 0.9;
    static playerMaxYFactor = 0.7;
    static playerMinYFactor = 0.4;
    //init speed factors
    static syringeSpeedFactor = 0.0015;

    constructor(level = 1)
    {
        //create viruses
        this.virusArr = [];

        //init the player object to hold player data
        this.player = new Player( Model.playerMinXFactor*View.canvas.width, Model.playerMaxYFactor*View.canvas.height ,
            Model.playerMaxXFactor*View.canvas.width);

        //detect player hit
        this.isCharHit = false;

        //init syringe object
        this.syringeArr = [];

        //variable to hold the level
        this.level = parseInt(level);
        //init the score
        this.score = 0 ;
        //points needed for this level 
        this.requiredPoints = 70;
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
    getScore()
    {
        return this.score;
    }
    getLevel()
    {
        return this.level;
    }
    getMaxSyringeCount()
    {
        return Model.maxSyringeCount;
    }
    getMaxScore()
    {
        return this.requiredPoints;
    }
    
    /****Controller commands****/
    addVirus() {
        this.virusArr.push(new Virus(this.level));
    }

    shoot()
    {
        if( this.syringeArr.length < Model.maxSyringeCount)
        {
            this.syringeArr.push(new Syringe(this.player.getX()+View.getCharWidth()*0.4, this.player.getY() + View.getCharHeight()*0.5, 
            View.canvas.width*Model.syringeSpeedFactor, this.player.getDirection())) ;   
        }
    }

    updateDimensions()
    {
        this.player.setNewBoundries( Model.playerMinXFactor*View.canvas.width, Model.playerMaxYFactor*View.canvas.height ,
                                    Model.playerMaxXFactor*View.canvas.width);

        this.player.updateSpeeds();
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

        //update the score
        this.score += Model.killBonus;
        //check for the level 
        if (this.score >= this.requiredPoints)
        {
            this.levelUp();
        }
    }

    levelUp()
    {
        this.level += 1;
        this.score = 0;

        //increase required points for the new level
        this.requiredPoints += Math.floor(this.requiredPoints*0.3);

        //increase syringes every 2 levels (limit at 15)
        if (this.level %2 == 0)
        {
            if (Model.maxSyringeCount < 15)
            {
                Model.maxSyringeCount += 1;
            }
        }
    }
}

/***********Helper Classes*********/
class Player{

    static speedXFactor = 0.01;
    static speedYFactor = 0.01;

    constructor(initPlayerX, initPlayerY , maxPlayerX) {

        this.xPos = initPlayerX;
        this.yPos =initPlayerY;

        //speeds in x direction
        this.updateSpeeds();
        this.drag = 0.5;
        this.grav = 0.7;
        this.isFacingRight = true;
        this.isJumping= false;
        this.isDown = false;
        this.isDead = false;
        this.xMaxPos = maxPlayerX;
        this.xMinPos = initPlayerX;
        this.isIdle = true;
        this.onGround = false;
        this.score = 0;
    }
    setInitPlayerX(xPos)
    {
        this.xMinPos = xPos;
    }
    setInitPlayerY(yPos)
    {
        this.yPos = yPos;
    }
    setMaxPlayerX(xPos)
    {
        this.xMaxPos = xPos;
    }
    updateSpeeds()
    {
        this.dx = Player.speedXFactor * View.canvas.width;
        this.dy = Player.speedYFactor * View.canvas.height;
    }

    setNewBoundries(initPlayerX,initPlayerY,maxPlayerX)
    {
        this.xMinPos = initPlayerX;
        this.yPos = initPlayerY;
        this.xMaxPos = maxPlayerX;
    }

    setScore(score) {
        this.score = score;
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

        if (this.yPos >=  Model.playerMaxYFactor*View.canvas.height)
        {
            this.isJumping = true;
        }
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
    constructor(xPos,yPos,speed,direction) {

        this.x = xPos;
        this.y = yPos;
        this.direction = direction;
        this.speed = speed*direction;
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

    constructor(level) {

        this.x =View.canvas.width;
        this.y = Math.floor((Math.random() * (View.canvas.height*0.75 - View.canvas.height*0.4) + View.canvas.height*0.4));
        
        this.speed = Math.floor((Math.random()*level*1.5*Math.floor(Model.syringeSpeedFactor*View.canvas.width))+1);
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