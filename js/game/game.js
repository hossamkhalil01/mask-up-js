class Game
{

    constructor(model , view)
    {
        this.model = model;
        this.view = view;
        this.virusWaitCount = 0;

        this.gameOver = false;

        //start the game engine
        this.engine = new Engine(60, this);
    }

    updateFrame()
    {
        //render the view
        this.view.render();
    }

    updatePlayerJump() {

        if (this.model.getPlayer().isJumping == false )
        {
        this.model.getPlayer().dy += this.model.getPlayer().grav;
        this.model.getPlayer().dy *= this.model.getPlayer().drag;
        // this.model.getPlayer().yPos += this.model.getPlayer().dy;
        this.model.getPlayer().yPos += 1;
        }
        else
        {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
            // this.model.getPlayer().dy += this.model.getPlayer().grav;
            // this.model.getPlayer().dy *= this.model.getPlayer().drag;
            // this.model.getPlayer().yPos += this.model.getPlayer().dy;
            this.model.getPlayer().yPos -= 1;
            console.log(this.model.getPlayer().yPos + "ypos")
            if(this.model.getPlayer().yPos <= 200 )
            {
                this.model.getPlayer().isJumping=false;
            }
        }
        if (this.model.getPlayer().yPos > 480) {
            this.model.getPlayer().yPos =480;
            this.model.getPlayer().dy = 0;
        } 
    }
    updateLogic()
    {
        this.checkGameOver();
        this.updateModel();
        this.updateView();
        this.updatePlayerJump();
    }
    checkGameOver()
    {
        if(model.isCharHit)
        {
            this.gameOver = true;
            alert("gameOver");
            this.engine.stopLogicInterval();
        }
    }

    updateView()
    {
        
        //update the player state
        this.view.setPlayer(this.model.getPlayer());
        //update the particles state
        this.addVirus();
        
    }
    updateModel()
    {
    }

    updateGame()
    {

    }

    addVirus() {
        this.virusWaitCount ++;

        if (this.virusWaitCount% 250 == 0)
        {
            this.model.addVirus();
        }

        this.model.handleViruses(this.view.getCanvas());
        this.view.viruses.setVirusesArray(this.model.getViruses())

        if(this.virusWaitCount >= 1000000)
        {
            this.virusWaitCount = 0;
        }
        
    }
}