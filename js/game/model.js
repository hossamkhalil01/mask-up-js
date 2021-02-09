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
        console.log(initPlayerX);
        console.log(initPlayerY);
        //init the player object to hold player data
        this.player = {
            xPos : initPlayerX,
            yPos : initPlayerY,
            xFrame:xFrame ,
            yFrame: yFrame,
            isFacingRight : true,
            isJumping: false,
            isDown: false
        }



        this.xMaxPos = maxX;
        this.xMinPos = initPlayerX;
    }



    moveRight()
    {
        this.player.xPos += Model.xMove;

        //check the boundires
        if (this.player.xPos > this.xMaxPos)
        {
            this.player.xPos = this.xMaxPos;
        }

        this.player.isFacingRight = true;
    }
    moveLeft()
    {
        this.player.xPos -= Model.xMove;

        //check the boundires
        if (this.player.xPos < this.xMinPos)
        {
            this.player.xPos = this.xMinPos;
        }

        this.player.isFacingRight = false;

    }
    moveUp()
    {
        this.player.isJumping = true;
        this.player.isDown = false;
    }
    moveDown()
    {
        this.player.isDown = true;
        this.player.isJumping = false;
    }
    getPlayer()
    {
        return this.player;
    }
    
    setPlayerX(xPos)
    {
        this.player.xPos = xPos;
    }

    setPlayerY(yPos)
    {
        this.player.yPos = yPos;
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
    draw(ctx) {
        // ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.fillStyle='green';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        // ctx.closePath();
        ctx.stroke();
    }
}