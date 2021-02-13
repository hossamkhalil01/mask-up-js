//select canvas
const canvas = document.getElementById("mainCanvas");
//resize canvas
canvasResize();
//attach listner to resize the canvas
window.addEventListener("resize",canvasResize);

//create model object
let model = new Model(canvas.width*0.05,canvas.height*0.6, canvas.width*0.85);

//create view object
let view = new View(canvas ,model.getPlayer(), new Boy(canvas) , "level1");

//create controller object
let controller = new Controller(model);

//create game object 
let game = new Game(model, view);

//function to resize the canvas
function canvasResize()
{
    canvas.setAttribute("width", window.innerWidth*0.95);
    canvas.setAttribute("height",window.innerHeight*0.95);
}