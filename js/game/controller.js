class Controller {

    //define keys object
    static keysCodes = {left:37, up:38, right:39, down:40};

    constructor (viewObj , modelObj )
    {
        //define the view and the model objects
        this.model = modelObj;
        this.view = viewObj;

        //define thee flags
        this.isUpPressed = false;
        this.isRightPressed = false;
        this.isLeftPresed = false;  
        this.isDownPressed = false;
        
        //attach the listeners
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);

        //init the character position
        console.log("ana hna ")
        this.updatePlayerView();
        this.addVirus(modelObj);
    }
    getModel()
    {
        return this.model;
    }
    //handle key presses
    keyDownHandler(event){
        switch (event.keyCode)
        {
            case Controller.keysCodes.right:
                this.isRightPressed = true;
                break;

            case Controller.keysCodes.left:
                this.isLeftPresed = true;
                break;

            case Controller.keysCodes.down:
                this.isDownPressed = true;
                break;

            case Controller.keysCodes.up:
                this.isUpPressed = true;
                break; 
            default:
                return;
        }
        //call the update function
        this.updatePlayerPosition();
    }
    keyUpHandler(event)
    {
        switch (event.keyCode)
        {
            case Controller.keysCodes.right:
                this.isRightPressed = false;
                break;

            case Controller.keysCodes.left:
                this.isLeftPresed = false;
                break;

            case Controller.keysCodes.down:
                this.isDownPressed = false;
                break;

            case Controller.keysCodes.up:
                this.isUpPressed = false;
                break; 
            default:
                return;
        }

        //call the update function
        this.updatePlayerPosition();
    }
    //update the state
    updatePlayerPosition()
    {
        //jump action
        if(this.isUpPressed){

        }
        else if (this.isDownPressed){

        }
        else if (this.isLeftPresed){
            this.moveLeft();
        }
        else if (this.isRightPressed){
            this.moveRight();
        }
    }
    moveRight()
    {
        //update the player object in model
        modelObj.moveRight();
        modelObj.getPlayer().xFrame=0;
        modelObj.getPlayer().yFrame=0;
        //update the player drawing in view
        this.updatePlayerView();
    }
    moveLeft()
     {
        //update the player object in model
        modelObj.moveLeft();
         modelObj.getPlayer().xFrame=2;
         modelObj.getPlayer().yFrame=0;
        //update the player drawing in view
        this.updatePlayerView();
    }
    updatePlayerView()
    {
        viewObj.setPlayer(modelObj.getPlayer().xPos, modelObj.getPlayer().yPos ,modelObj.getPlayer().xFrame,modelObj.getPlayer().yFrame);
        //update the player drawing in view
        // viewObj.drawPlayer(modelObj.getPlayer().xPos, modelObj.getPlayer().yPos ,modelObj.getPlayer().xFrame,modelObj.getPlayer().yFrame);
        // viewObj.drawGame();
    }

    addVirus() {
        var that = this;
        var count =0;
        setInterval(function(){
            count++;
            if (count% 50 ==0)
            {
               viewObj.addVirus();
            }
                viewObj.handleViruses(that.view.getCanvas());
                viewObj.drawGame()

            }
        , 60);

    }
}
