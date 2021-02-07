let canvas = document.getElementById("mainCanvas");

//create view object
let viewObj = new View(canvas);

//create model object
let modelObj = new Model(canvas.width*0.05,canvas.height*0.6, canvas.width*0.85);

//create controller object
let controllerObj = new Controller(viewObj,modelObj);

//create engine object
let engineObj = new Engine();