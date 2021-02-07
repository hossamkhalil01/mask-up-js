class View
{
    static canvas = document.getElementById("mainCanvas");
    static playerHeight = 504;
    static playerWidth = 603;

    constructor(canvasElement)
    {
        this.canvas = canvasElement;
        this.context = canvas.getContext("2d");
        // this.context.imageSmoothingQuality;
        // this.context.imageSmoothingEnabled =false;
        //define canvas dimensions
        this.canvasWidth = View.canvas.width;
        this.canvasHeight = View.canvas.height;

        //define player dimensions
        this.playerHeight = this.canvasHeight*0.3;
        this.playerWidth = this.canvasWidth*0.2;
        // this.playerHeight =504
        // this.playerWidth = 603/2;
        // this.drawPlayer();
    }

    drawPlayer(xPos, yPos ,xFrame ,yFrame)
    {
        console.log(xPos + " , "+yPos);
        console.log("am i here  ")
        this.clearScreen();
        var img = new Image();
        img.src="../images/girlS.png";
        console.log("are you here ");
        this.context.drawImage(img,View.playerWidth*xFrame,View.playerHeight*yFrame, View.playerWidth ,View.playerHeight  ,xPos, yPos,this.playerWidth,this.playerHeight );

        console.log("why you here ");

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

