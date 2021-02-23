class Game
{
    constructor(model , view)
    {
        this.model = model;
        this.view = view;
        this.virusWaitCount = 0;

        this.gameOver = false;

        //start the game engine
        this.engine = new Engine(30, this);

        //define window resize event
        window.addEventListener("resize",this.windowResizeEvent.bind(this));

        //update the current sizing
        this.windowResizeEvent();
    }

    getGameOver() {
        return this.gameOver;
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
            this.model.getPlayer().yPos += 2;
        }
        else
        {
            this.model.getPlayer().yPos -= 2;
            if(this.model.getPlayer().yPos <= Model.playerMinYFactor*View.canvas.height)
            {
                this.model.getPlayer().isJumping=false;
            }
        }

        if (this.model.getPlayer().yPos > Model.playerMaxYFactor*View.canvas.height) {
            this.model.getPlayer().yPos = Model.playerMaxYFactor*View.canvas.height;
            this.model.getPlayer().dy = 0;
        }
    }

    updateLogic()
    {
        this.view.updateLevel(this.model.getLevel());
        this.checkGameOver();
        this.updateModel();
        this.updateView();
        this.updatePlayerJump();
    }

    checkGameOver()
    {
        this.gameOver = (this.model.getIsCharHit());
        if (this.gameOver) {
            this.endGame();
        }
    }

    updateView()
    {
        //update the player state
        this.view.setPlayer(this.model.getPlayer());

        //update the score
        this.view.setScore(this.model.getScore(), this.model.getMaxScore());

        //update the viruses
        this.view.updateViruses(this.model.getViruses())

        //update the syignes
        this.view.updateSyringes(this.model.getSyringes());

        //update syringes ratio
        this.view.setSyringeRatio (Model.maxSyringeCount - this.model.getSyringes().length , this.model.getMaxSyringeCount());
    }

    updateModel()
    {
        //add the particles
        this.addVirus();

        //update the viruses state
        this.model.handleViruses();

        //update the syringes state
        this.model.handleSyringes()
    }

    updateGame()
    {

    }

    endGame() {

        this.engine.stopEngine();
        let saveScore = document.getElementById("saveButton");

        saveScore.href = `../includes/updateProgress.php?newScore=${this.model.getScore()}&newLevel=${this.model.getLevel()}`;
        document.getElementById("endGameContainer").style = "display : inline-block";
    }

    addVirus() {

        this.virusWaitCount ++;

        if (this.virusWaitCount >= (250 - this.model.getLevel()*20))
        {
            this.model.addVirus();
            this.virusWaitCount = 0;
        }
    }

    windowResizeEvent()
    {
        //update sizes on the view
        this.view.canvasResize();

        //update model dimensions
        this.model.updateDimensions();
    }
}