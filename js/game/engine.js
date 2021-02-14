class Engine{

    constructor(refreshRate ,gameObj)
    {
        this.renderInterval = 1/refreshRate;
        this.logicInterval = this.renderInterval / 2;

        this.game = gameObj;

        this.isEngineOn = false;

        this.startEngine();
    }
    
    updateFrame()
    {
        //update the game frames
        this.game.updateFrame();
    }

    updateLogic()
    {
        //update the game logic
        this.game.updateLogic();
    }

    startEngine()
    {
        if(!this.isEngineOn)
        {
            this.renderInterval = setInterval(this.updateFrame.bind(this), this.renderInterval);
            this.logicInterval = setInterval(this.updateLogic.bind(this), this.logicInterval);
 
            this.isEngineOn = true;
        }

    }

    stopLogicInterval()
    {
        clearInterval(this.logicInterval);
    }

    stopEngine()
    {
        if(this.isEngineOn)
        {
            clearInterval(this.renderInterval);
            clearInterval(this.logicInterval);
            this.isEngineOn = false;
        }
    }
}

