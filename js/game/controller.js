class Controller {

    //define keys object
    static keysCodes = {left:37, up:38, right:39, down:40};

    constructor (modelObj)
    {
        //define the view and the model objects
        this.model = modelObj;

        //define thee flags
        this.isUpPressed = false;
        this.isRightPressed = false;
        this.isLeftPresed = false;  
        this.isDownPressed = false;

        this.isIdle = true;

        this.playerModel = this.model.getPlayer();
        
        //attach the listeners
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
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
                this.isIdle = false;
                return;
        }
        
        this.isIdle = false;

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

        this.isIdle = true;

        //call the update function
        this.updatePlayerPosition();
    }
    //update the state
    updatePlayerPosition()
    {
        //jump action
        if(this.isUpPressed){

            this.moveUp()
        }
        else if (this.isDownPressed){

        }
        else if (this.isLeftPresed){
            this.moveLeft();
        }
        else if (this.isRightPressed){
            this.moveRight();
        }

        //update player idle status
        this.playerModel.setIdle(this.isIdle);
    }

    moveUp() {
        this.playerModel.moveUp();
    }

    moveRight()
    {
        //update the player object in model
        this.playerModel.moveRight();

    }

    moveLeft()
     {
        //update the player object in model
        this.playerModel.moveLeft();
    }

    getIsIdle()
    {
        return this.isIdle;
    }

}