class View
{
    static canvas = document.getElementById("mainCanvas");
    static playerHeight = 504;
    static playerWidth = 603;
    static gameFrame =0;


    getCanvas() {
        return canvas.getContext("2d");
    }
    constructor(canvasElement , xPos,yPos ,xFrame,yFrame)
    {
        this.virusArray= [];
        this.canvas = canvasElement;
        this.context = canvas.getContext("2d");
        //define canvas dimensions
        this.canvasWidth = View.canvas.width;
        this.canvasHeight = View.canvas.height;
        //define player dimensions
        this.playerHeight = this.canvasHeight*0.3;
        this.playerWidth = this.canvasWidth*0.2;
        this.xFrame=xFrame;
        this.yFrame=yFrame;
        this.xPos=xPos;
        this.yPos=yPos;
    }
    addVirus() {
        this.virusArray.push( new Virus());
        console.log(this.virusArray.length);
    }
    setPlayer(xPos, yPos ,xFrame ,yFrame)
    {
        this.xFrame=xFrame;
        this.yFrame=yFrame;
        this.xPos=xPos;
        this.yPos=yPos;
    }

    drawGame() {
        this.clearScreen();
        this.drawPlayer();
        this.drawViruses();
    }
    drawPlayer()
    {
        var img = new Image();
        img.src="../images/girlS.png";
        console.log("xpos"+this.xPos + "yPos"+this.yPos);
        console.log(View.playerWidth*this.xFrame);
        this.context.drawImage(img,View.playerWidth*this.xFrame,View.playerHeight*this.yFrame, View.playerWidth ,View.playerHeight  ,this.xPos,this.yPos, this.playerWidth,this.playerHeight);
        console.log("why you here ");
    }
    drawVirus(virus){
        this.context.fillStyle='green';
        this.context.beginPath();
        this.context.arc(virus.getX(),virus.getY(),50,0,Math.PI*2);
        this.context.fill();
        this.context.closePath();
        this.context.stroke();

    }
    handleViruses() {
        for( var index = 0 ; index < this.virusArray.length; index++)
        {
            this.virusArray[index].update();
        }
    }
    drawViruses() {
        for( var index = 0 ; index < this.virusArray.length; index++)
        {
            this.drawVirus(this.virusArray[index]);
        }
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

