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
        this.updatePlayerView();
        this.addVirus(this.model);
    }
    getModel()
    {
        return this.model;
    }

    //handle key presses
    keyDownHandler(event){
        console.log(event.keyCode);
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

            this.moveup()
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
    moveup() {
        this.model.getPlayer().moveUp();
    }
    moveRight()
    {
        //update the player object in model
        this.model.getPlayer().moveRight();
        this.model.getPlayer().xFrame=0;
        this.model.getPlayer().yFrame=0;
        //update the player drawing in view
        this.updatePlayerView();
    }
    moveLeft()
     {
        //update the player object in model
        this.model.getPlayer().moveLeft();
        this.model.getPlayer().xFrame=2;
        this.model.getPlayer().yFrame=0;
        //update the player drawing in view
        this.updatePlayerView();
    }
    updatePlayerView()
    {
        this.view.setPlayer(this.model.getPlayer());

    }

    addVirus() {

        let count =0;
        setInterval(function(){

            count++;

            if (count% 50 ==0)
            {
                this.model.addVirus();
            }

            this.model.getPlayer().dy += this.model.getPlayer().grav;
            this.model.getPlayer().yPos += this.model.getPlayer().dy;

            this.model.handleViruses(this.view.getCanvas());
            this.view.setViruses(this.model.getViruses())
            this.view.drawGame()
            
        }.bind(this)
        , 30);
    }
}
