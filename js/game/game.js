class Game
{
    constructor(model , view)
    {
        this.model = model;
        this.view = view;
        this.virusWaitCount = 0;

        this.gameOver = false;

        //start the game engine
        this.engine = new Engine(20, this);
        this.timer=0;
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
            if(this.model.getPlayer().yPos <= 250)
            {
                this.model.getPlayer().isJumping=false;
            }
        }
        if (this.model.getPlayer().yPos > 480) {
            this.model.getPlayer().yPos = 480;
            this.model.getPlayer().dy = 0;
        }
    }

    updateLogic()
    {
        this.view.updateLevel(this.checkLevel());
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
    checkLevel()
    {
      return   this.model.getPlayer().checkLevel();
    }

    updateView()
    {
        //update the player state
        this.view.setPlayer(this.model.getPlayer());

        //update the score
        View.setScore(model.getPlayer().getScore());

        //update the viruses
        this.view.updateViruses(this.model.getViruses())

        //update the syignes
        this.view.updateSyringes(this.model.getSyringes());
        View.SyringesRatio = `${Model.maxSyringeCount - this.model.getSyringes().length} X`;

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
        
        let newScore = game.model.getPlayer().getScore();
        let newLevel = View.getPlayerLevel();

        let saveScore = document.getElementById("saveButton");

        saveScore.href = `../includes/updateProgress.php?newScore=${newScore}&newLevel=${newLevel}`;

        document.getElementById("endGameContainer").style = "display : inline-block";
        
    }

    addVirus() {
        this.virusWaitCount ++;
         this.timer = 270 - View.getPlayerLevel()*50;
        if (this.virusWaitCount% this.timer  == 0)
        {
            this.model.addVirus();
        }
        

        if(this.virusWaitCount >= 1000000)
        {
            this.virusWaitCount = 0;
        }  
    }
}