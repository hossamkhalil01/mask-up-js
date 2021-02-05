const loginSectionBtn =  document.getElementById("loginSection");
const registerSectionBtn =  document.getElementById("registerSection");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const signUperrorMsgs = document.getElementsByClassName("SignUpErrorMsg");
loginSectionBtn.addEventListener("click", signinBtnEvent);
registerSectionBtn.addEventListener("click", signupBtnEvent);

let selectedSection;

if (signUperrorMsgs.length > 0)
{
    selectForm(registerForm, registerSectionBtn);
    deSelect(loginForm, loginSectionBtn);
}
else{

    selectForm(loginForm, loginSectionBtn);
    deSelect(registerForm, registerSectionBtn);
}


function signinBtnEvent(event){
    if (selectedSection !== loginSectionBtn ) {
        selectForm(loginForm, loginSectionBtn);
        deSelect(registerForm, registerSectionBtn);
    }
}

function signupBtnEvent(event){
    if (selectedSection !== registerSectionBtn) {
        selectForm(registerForm, registerSectionBtn);
        deSelect(loginForm, loginSectionBtn);
    }
}

function selectForm(form, btn){
    form.style.display="block";
    btn.classList.add("highlighted");
    selectedSection = form;
}

function deSelect(form, btn){
    form.style.display="none";
    btn.classList.remove("highlighted");
}




