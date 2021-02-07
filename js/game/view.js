class View
{
    static canvas = document.getElementById("mainCanvas");
    static playerHeight = 200;
    static playerWidth = 300;

    constructor(canvasElement)
    {
        this.canvas = canvasElement;
        this.context = canvas.getContext("2d");

        //define canvas dimensions
        this.canvasWidth = View.canvas.width;
        this.canvasHeight = View.canvas.height;

        //define player dimensions
        this.playerHeight = this.canvasHeight*0.2;
        this.playerWidth = this.canvasWidth*0.1;

    }

    drawPlayer(xPos, yPos)
    {
        //clear previous state
        this.clearScreen();
        
        //draw the player
        this.context.beginPath();
        this.context.fillStyle = "#FF0000";
        console.log("xPos: "+xPos+ "yPos: "+yPos);
        this.context.fillRect(xPos,yPos,this.playerWidth,this.playerHeight);

    }
    clearScreen()
    {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    renderCurrentFrame()
    {

    }
    updateFrame()
    {

    }
}

