const loginSectionBtn =  document.getElementById("loginSection");
const registerSectionBtn =  document.getElementById("registerSection");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginSectionBtn.addEventListener("click", signinBtnEvent);

registerSectionBtn.addEventListener("click", signupBtnEvent);

let selectedSection;

selectForm(loginForm, loginSectionBtn);

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




