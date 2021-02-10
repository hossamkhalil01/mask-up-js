let canvas = document.getElementById("mainCanvas");

//create model object
let model = new Model(canvas.width*0.05,canvas.height*0.6, canvas.width*0.85);

//create view object
let view = new View(canvas ,model.getPlayer(), new Girl(canvas)) ;

//create controller object
let controller = new Controller(model);


//create game object 
let game = new Game(model, view);

//create engine object
let engine = new Engine(60, game);