class Model
{
    static xMove = 10;
    static yMove = 5;
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
        this.virusArray=[];
        this.virus;
        //init the player object to hold player data
        this.player = new Player(initPlayerX, initPlayerY ,maxX);

        this.isCharHit = false;
    }

    addVirus() {
 
        this.virusArray.push( new Virus());
    }

    removeFromVirusesArray(virusIndex) {

        if(this.virusArray[virusIndex].x < -View.virusWidth )
        {
            this.virusArray.splice(virusIndex,1);
        }
    }
    
    detectVirusesCollision(virusIndex)
    {
       let xDistanceFromPlayer = this.virusArray[virusIndex].x - (this.player.xPos + View.charWidth)
       this.virusArray[virusIndex].y >= this.player.yPos 

       if (this.isCharHit)
       {
           return;
       }
       if(this.isVirusPlayerCollision(this.virusArray[virusIndex].x, this.virusArray[virusIndex].y 
                                , this.player.xPos, this.player.yPos))
                                
        {
            this.isCharHit = true;                
        }
        
    //    if(xDistanceFromPlayer <= -View.virusWidth)
    //     {
    //         if (this.virusArray[virusIndex].y  >= this.player.yPos  && 
    //             this.virusArray[virusIndex].y + View.virusHeight  <= this.player.yPos+View.charHeight)
    //             {

    //                 this.isCharHit = true;
    //                 console.log("virus y: "+this.virusArray[virusIndex].y);
    //                 console.log("virus hieght: "+ View.virusHeight);
    //                 console.log("char y: "+this.player.yPos);
    //                 console.log("char hieght: "+ View.charHeight);
    //             }
    //     }
    
    }

    calcDistanceBetweenTwoPoints(point1, point2)
    {

        let tmp = Math.pow((point1.x - point2.x),2) + Math.pow((point1.y - point2.y),2);
        return Math.sqrt(tmp);
    }

    getCenterPoint(xPos,yPos,width,height)
    {
        return {
            x: xPos + 0.5 * width,
            y: yPos + 0.5 * height
        }
    }

    isVirusPlayerCollision(virusXPos, virusYPos, playerXPos, playerYPos)
    {
        
        let playerCenter =this.getCenterPoint(playerXPos,playerYPos,View.charWidth,View.charHeight);
        let virusCenter = this.getCenterPoint(virusXPos,virusYPos,View.virusWidth,View.virusHeight);

        let playerHalfDiagonal = this.calcDistanceBetweenTwoPoints(playerCenter,{x:playerXPos,y:playerYPos});
        let virusHalfDiagonal = this.calcDistanceBetweenTwoPoints(virusCenter,{x:virusXPos,y:virusYPos});

        let fromPlayerToVirus = this.calcDistanceBetweenTwoPoints(virusCenter,playerCenter);
        


        if (fromPlayerToVirus-(playerHalfDiagonal+virusHalfDiagonal) <= -150)
        {
            return true;
        }
        else {
            return false;
        }
    }

    handleViruses() {
        for( var index = 0 ; index < this.virusArray.length; index++)
        {
            this.virusArray[index].updateXPos();
            this.detectVirusesCollision(index);
            this.removeFromVirusesArray(index);
        }
    }

    getViruses() {
        return this.virusArray;
    }

    getPlayer() {
        return this.player;
    }

}
class Player{

    constructor(initPlayerX, initPlayerY , maxX) {

        this.xPos = initPlayerX;
        this.yPos =initPlayerY;

        this.dx = 15//speed in x direction
        this.dy = 0 ; // speed
        this.drag = 0.99; // the drag is 0.01
        this.grav = 0.1;
        this.isFacingRight = true;
        this.isJumping= false;
        this.isDown= false;
        this.xMaxPos = maxX;
        this.xMinPos = initPlayerX;
        this.isIdle = true;
        this.onGround = true;
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
        if ( this.onGround )
        {
            this.yPos -=300;
            this.onGround=false;
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
        this.radius= 50;
        this.distance;
    }
    getX() {

        return this.x;
    }

    getY() {
        return this.y;
    }
    updateXPos(){
        this.x-=(this.speed) /2;
    }
}