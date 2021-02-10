class Game
{

    constructor(model , view)
    {
        this.model = model;
        this.view = view;
        this.virusWaitCount = 0;
        // this.playerFrameWaitCount = 0;
    }

    updateFrame()
    {

        //render the view
        this.view.render();
    }
    updatePlayerJump() {
        this.model.getPlayer().dy += this.model.getPlayer().grav;
        this.model.getPlayer().dy *= this.model.getPlayer().drag;
        // this.model.getPlayer().yPos += this.model.getPlayer().dy;
        this.model.getPlayer().yPos += 1;
        if (this.model.getPlayer().yPos > 480) {
            this.model.getPlayer().yPos =480;
            this.model.getPlayer().dy = 0;
            this.model.getPlayer().onGround = true;
        } else {
            this.model.getPlayer().onGround = false;
        }
    }
    updateLogic()
    {
        this.updateModel();
        this.updateView();
        this.updatePlayerJump();
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

    // updatePlayerPosition()
    // {
    //     //check to change the player frame or wait
    //     if(this.playerFrameWaitCount > 10)
    //     {
    //         view.changePlayerFrame();
    //         this.playerFrameWaitCount = 0;
    //     }
    //     else{
    //         this.playerFrameWaitCount++;
    //     }
        
    // }

    addVirus() {
        this.virusWaitCount ++;

        if (this.virusWaitCount% 250 == 0)
        {
            if(!this.model.virusArray.length ==1)
                this.model.addVirus();
        }

        this.model.handleViruses(this.view.getCanvas());
        this.view.setViruses(this.model.getViruses())

        if(this.virusWaitCount >= 1000000)
        {
            this.virusWaitCount = 0;
        }
        
    }

}