let canvas = document.getElementById("mainCanvas");

//create model object
let modelObj = new Model(canvas.width*0.05,canvas.height*0.6, canvas.width*0.85);


//create view object
let viewObj = new View(canvas ,modelObj.getPlayer().xPos, modelObj.getPlayer().yPos ,modelObj.getPlayer().xFrame,modelObj.getPlayer().yFrame) ;

//create controller object
let controllerObj = new Controller(viewObj,modelObj);

//create engine object
let engineObj = new Engine();