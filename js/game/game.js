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

    updateLogic()
    {
        this.updateModel();
        this.updateView();
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