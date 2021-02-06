class Model
{
    static xMove = 5;
    static yMove = 5;

    constructor(initPlayerX, initPlayerY)
    {
        //init the player object to hold player data
        this.player = {
            xPos : initPlayerX,
            yPos : initPlayerY,
            isFacingRight : true,
            isJumping: false,
            isDown: false
        }
    }

    moveRight()
    {
        this.player.xPos += xMove;
        this.player.isFacingRight = true;
    }
    moveLeft()
    {
        this.player.xPos -= xMove;
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
    getPlayerState()
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