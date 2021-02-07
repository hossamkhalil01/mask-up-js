class Model
{
    static xMove = 10;
    static yMove = 5;

    constructor(initPlayerX, initPlayerY, maxX)
    {
        //init the player object to hold player data
        this.player = {
            xPos : initPlayerX,
            yPos : initPlayerY,
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
