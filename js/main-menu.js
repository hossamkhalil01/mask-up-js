//define all sections (windows)
const mainMenuSection = document.getElementById("mainMenuSection");
const playSection = document.getElementById("playSection");
const settingsSection = document.getElementById("settingsSection");
const instructionsSection = document.getElementById("instructionsSection");
const creditsSection = document.getElementById("creditsSection");
//-------
const selectCharactersection = document.getElementById("selectCharactersection");

//define the main menu options
const playOption = document.getElementById("playOption");
const settingssOption = document.getElementById("settingsOption");
const instructionsOption = document.getElementById("instructionsOption");
const creditsOption = document.getElementById("creditsOption");
const logoutOption = document.getElementById("logoutOption");
//define the  options inside play option 
const newGameOption = document.getElementById("newGameOption");
const selectCharacterOtion = document.getElementById("selectCharacterOtion");
const selectlevel = document.getElementById("selectlevel");




//define the back to home button
const backBtn = document.getElementById("backBtn");
console.log(backBtn) ;

// selectCharacterOtion.addEventListener("click", function (){
//     fromGameOptionsTo(selectCharactersection);
// });

//attach listeners
playOption.addEventListener("click", function (){
    fromMainMenuTo(selectCharactersection);
});

settingssOption.addEventListener("click", function(){
    fromMainMenuTo(settingsSection);
});

instructionsOption.addEventListener("click", function(){
    fromMainMenuTo(instructionsSection);
});

creditsOption.addEventListener("click", function(){
    fromMainMenuTo(creditsSection);
});

logoutOption.addEventListener("click", logout);

// backBtn.addEventListener("click", backToMainMenu);
backBtn.addEventListener("click", fromCurrentToPrevious);
// backBtn.addEventListener("click", function(event){
//     if (currWindow = selectlevel ) 
//     {
        
//         currWindow.style.display= "none" ;
//         fromMainMenuTo(selectCharactersection) ;
        

//     }
//     else 
//     {

//         fromCurrentToMainMenu ;
//     }

// } );


//eventlistener on selecting the character 
selectCharactersection.addEventListener("click", function(event){
    // event.preventDefault() ;
    if ((event.target.id == "ali") || (event.target.id == "aliaa")  )
    {
        alert(event.target.id) ;
        fromselectCharacterTo (selectlevel) ;

    }

    

});



//variable to keep track of the current window
let currWindow = mainMenuSection;
// let previousWindow  ; 
const stage1 = mainMenuSection ; 
const stage2 =  selectCharactersection ; 

const stage3 = selectlevel ;  




//change from main menu to another window
function fromMainMenuTo (otherWindow)
{    
    //hide the main menu
    mainMenuSection.style.display = "none";
    
    //display the other window
    otherWindow.style.display = "block";

    currWindow = otherWindow;

    //display the back button
    backBtn.style.display = "inline-block";
}

function fromselectCharacterTo (otherWindow)
{    
     //hide the main menu
    //  mainMenuSection.style.display = "none";
     //hide playsection 
     selectCharactersection.style.display = "none";

     //display the other window
     otherWindow.style.display = "block";
   
      currWindow = otherWindow;
     //display the back button
     backBtn.style.display = "block";
}
//change from current back to main menu
function fromCurrentToMainMenu()
{
    //hide the current menu
    currWindow.style.display = "none";
    
    //display the main menu window
    mainMenuSection.style.display = "block";

    currWindow = mainMenuSection;

    //hide the back button
    backBtn.style.display = "none";
}
function fromCurrentToPrevious()
{
    //hide the current menu
    // previousWindow = currWindow ; 
    if (currWindow == stage2 ) 
    {
        currWindow.style.display = "none";
    
        //display the main menu window
        mainMenuSection.style.display = "block";
    
        currWindow = mainMenuSection;
             backBtn.style.display = "none";



    }
    else if (currWindow == stage3)
    {
        currWindow.style.display = "none"; 
        stage2.style.display = "block" ; 
        currWindow = stage2 ; 


    }
    
    else
    {

        fromCurrentToMainMenu() ; 

    } 


    
    //hide the back button
    // backBtn.style.display = "none";
}


//perform logout action
function logout()
{

}


