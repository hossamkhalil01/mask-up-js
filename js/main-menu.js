//define all sections (windows)
const mainMenuSection = document.getElementById("mainMenuSection");
const playSection = document.getElementById("playSection");
const settingsSection = document.getElementById("settingsSection");
const instructionsSection = document.getElementById("instructionsSection");
const creditsSection = document.getElementById("creditsSection");

//define the main menu options
const playOption = document.getElementById("playOption");
const settingssOption = document.getElementById("settingsOption");
const instructionsOption = document.getElementById("instructionsOption");
const creditsOption = document.getElementById("creditsOption");
const logoutOption = document.getElementById("logoutOption");

//define the back to home button
const backBtn = document.getElementById("backBtn");
console.log(backBtn) ;

//attach listeners
playOption.addEventListener("click", function (){
    fromMainMenuTo(playSection);
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
backBtn.addEventListener("click", fromCurrentToMainMenu);



//variable to keep track of the current window
let currWindow = mainMenuSection;


//change from main menu to another window
function fromMainMenuTo (otherWindow)
{    
    //hide the main menu
    mainMenuSection.style.display = "none";
    
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

//perform logout action
function logout()
{

}


