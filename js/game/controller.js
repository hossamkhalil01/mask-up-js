class Controller {

    //define keys object
    static keysCodes = {left:37, up:38, right:39, shoot:32};

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
        document.addEventListener('keypress', this.shootHandler.bind(this), false)
    }

    //handle key presses
    keyDownHandler(event){
        
        switch (event.keyCode)
        {
            case Controller.keysCodes.right: case 68:
                this.isRightPressed = true;
                break;

            case Controller.keysCodes.left: case 65:
                this.isLeftPresed = true;
                break;

            case Controller.keysCodes.up: case 87:
                this.isUpPressed = true;
                break; 

            default:
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
            case Controller.keysCodes.right: case 68:
                this.isRightPressed = false;
                break;

            case Controller.keysCodes.left: case 65:
                this.isLeftPresed = false;
                break;

            case Controller.keysCodes.up: case 87:
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
    
    //handle the shoot objects
    shootHandler(event)
    {
        //detect space bar
        if(event.keyCode == Controller.keysCodes.shoot)
        {
            this.model.shoot();
        }
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