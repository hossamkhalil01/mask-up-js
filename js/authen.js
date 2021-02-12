<<<<<<< HEAD
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



var registerBtn = document.getElementById("signup");

registerBtn.addEventListener("click", validate);

function validate(e){

    let regitserUsername = document.getElementById("registerUsername").value;
    let registerPassword = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("cpassword").value;
    
    
    if(regitserUsername === "" || regitserUsername.length < 4 || registerPassword === "" || registerPassword.length < 6  || registerPassword !== confirmPassword){
        
        e.preventDefault();

        let registerUsernameErrBlock = document.getElementById("registerUsernameErr");
        registerUsernameErrBlock.innerHTML = "";

        let registerPasswordErrBlock = document.getElementById("registerPasswordErr");
        registerPasswordErrBlock.innerHTML = "";

        let cpassword = document.getElementById("ConfirmPasswordErr");
        cpassword.innerHTML = "";


        
        if (regitserUsername === "") {

            registerUsernameErrBlock.innerHTML = `<p class="errorMsg"> Username cannot be empty </p>`;

        }
        else if (regitserUsername.length < 4) {

            registerUsernameErrBlock.innerHTML = `<p class="errorMsg"> Username length must be more than 4 chars </p>`;
        }

        if (registerPassword.length == "") {

            registerPasswordErrBlock.innerHTML = `<p class="errorMsg"> Password cannot be empty </p>`;
        }

        else if (registerPassword.length < 6) {

            registerPasswordErrBlock.innerHTML = `<p class="errorMsg"> Password must be 6 chars at least </p>`;
        }

        if (registerPassword.length >= 6 && registerPassword !== confirmPassword) {

            cpassword.innerHTML = `<p class="errorMsg"> Passwords do not match </p>`;

        }
    }
}




||||||| d7e590c
=======
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



var registerBtn = document.getElementById("signup");

registerBtn.addEventListener("click", validate);

function validate(e){

    let regitserUsername = document.getElementById("registerUsername").value;
    let registerPassword = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("cpassword").value;
    
    
    if(regitserUsername === "" || regitserUsername.length < 4 || registerPassword === "" || registerPassword.length < 6  || registerPassword !== confirmPassword){
        e.preventDefault();

        let registerUsernameErrBlock = document.getElementById("registerUsernameErr");
        registerUsernameErrBlock.innerHTML = "";

        let registerPasswordErrBlock = document.getElementById("registerPasswordErr");
        registerPasswordErrBlock.innerHTML = "";

        let cpassword = document.getElementById("ConfirmPasswordErr");
        cpassword.innerHTML = "";


        
        if (regitserUsername === "") {
           registerUsernameErrBlock.innerHTML = `<p class="errorMsg"> Username cannot be empty </p>`;
        }else if (regitserUsername.length < 4) {
            registerUsernameErrBlock.innerHTML = `<p class="errorMsg"> Username length must be more than 4 chars </p>`;
        }
        if (registerPassword.length == "") {
            registerPasswordErrBlock.innerHTML = `<p class="errorMsg"> Password cannot be empty </p>`;
        }else if (registerPassword.length < 6) {
            registerPasswordErrBlock.innerHTML = `<p class="errorMsg"> Password must be 6 chars at least </p>`;
        }if (registerPassword.length >= 6 && registerPassword !== confirmPassword) {
            cpassword.innerHTML = `<p class="errorMsg"> Passwords do not match </p>`;
        }

    }
}




>>>>>>> e43217b31966f3561cd78a571e4d6da2d570b392
