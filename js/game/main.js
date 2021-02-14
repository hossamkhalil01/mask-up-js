//select canvas
const canvas = document.getElementById("mainCanvas");

//create model object
let model = new Model(canvas.width*0.02,canvas.height*0.9, canvas.width*0.85);

//create view object
let view = new View(model.getPlayer(), new Girl() , "level1");

//create controller object
let controller = new Controller(model);

//create game object 
let game = new Game(model, view);