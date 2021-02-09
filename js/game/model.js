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
    constructor(initPlayerX, initPlayerY, maxX ,xFrame =0 ,yFrame =0 )
    {

        this.virusArray=[]
        this.virus = {

        }
        //init the player object to hold player data
        this.player = new Player(initPlayerX, initPlayerY ,maxX,xFrame ,yFrame );

    }

    addVirus() {
        this.virusArray.push( new Virus());
    }
    handleViruses() {
        for( var index = 0 ; index < this.virusArray.length; index++)
        {
            this.virusArray[index].update();
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
    constructor(initPlayerX, initPlayerY , maxX,xFrame =0 ,yFrame =0 ) {
            this.xPos = initPlayerX;
            this.yPos =initPlayerY;
            this.xFrame=xFrame ;
            this.yFrame =yFrame;
            this.dy = 0 ; // speed
            this.drag = 0.99; // the drag is 0.01
            this.grav = 0.1;
            this.isFacingRight = true;
            this.isJumping= false;
            this.isDown= false;
            this.xMaxPos = maxX;
            this.xMinPos = initPlayerX;
    }

    moveRight()
    {
        this.xPos += Model.xMove;
        //check the boundires
        if (this.xPos > this.xMaxPos)
        {
            this.xPos = this.xMaxPos;
        }

        this.isFacingRight = true;
    }
    moveLeft()
    {
        this.xPos -= Model.xMove;

        //check the boundires
        if (this.xPos < this.xMinPos)
        {
            this.xPos = this.xMinPos;
        }

        this.isFacingRight = false;

    }
    moveUp()
    {
        this.dy = -5;
        this.dy *= this.drag;

    }
    moveDown()
    {
        this.yPos-=1;
        this.isDown = true;
        this.isJumping = false;
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
        this.y = Model.getCanvasHeight()*0.8;
        this.speed = Math.random()*5+1;
        this.radius= 50;
        this.distance;
    }
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
    update(){
        this.x-=10;
    }
}