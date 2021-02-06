class Controller {

    //define keys object
    static keysCodes = {left:37, up:38, right:39, down:40};

    constructor (viewObj , modelObj)
    {
        //define the view and the model objects
        this.view = viewObj;
        this.model = modelObj;

        //define thee flags
        this.isUpPressed = false;
        this.isRightPressed = false;
        this.isLeftPresed = false;  
        this.isDownPressed = false;
        
        //attach the listeners
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    }
    //handle key presses
    keyDownHandler(event){

        if(event.keyCode == keysCodes.right) {
            this.isRightPressed = true;
        }
        else if(event.keyCode == keysCodes.left) {
            this.isLeftPresed = true;
        }
        if(event.keyCode == keysCodes.down) {
            this.isDownPressed = true;
        }
        else if(event.keyCode == keysCodes.up) {
            this.isUpPressed = true;
        }

        //call the update function
        this.update();
    }

    keyUpHandler(event)
    {
        if(event.keyCode == keysCodes.right) {
            this.isRightPressed = false;
        }
        else if(event.keyCode == keysCodes.left) {
            this.isLeftPresed = false;
        }
        if(event.keyCode == keysCodes.down) {
            this.isDownPressed = false;
        }
        else if(event.keyCode == keysCodes.up) {
            this.isUpPressed = false;
        }

        //call the update function
        this.update();
    }

    //update the state
    update()
    {
        //jump action
        if(this.isUpPressed){

        }
        else if (this.isDownPressed){

        }
        else if (this.isLeftPresed){

        }
        else if (this.isRightPressed){

        }
    }
}