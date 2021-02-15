class AccountSetting {

    static formErrors;
    static setformErrors(formErrors){
        this.formErrors= formErrors;
    }
    constructor() {
        this.errorMessages = document.getElementById("errorMessage");
        this.userName = document.getElementById("userName");
        this.account = document.getElementById("accunt");
        this.accountForm = document.getElementById("accountForm");
        this.musicForm =  document.getElementById("musicForm");
        this.update = document.getElementById("update");
    }
    getErrorMessages() {
        return this.errorMessages;
    }
    defineListeners( ) {
        this.account.addEventListener("click",this.accountClicked)
        this.update.addEventListener("click",this.validateContact.bind(this));
    }
    
    accountClicked(e)
    {
        document.getElementById("musicForm").style.display="none"
        document.getElementById("accountForm").style.display="" ;
        document.querySelector(".fifth").style.backgroundColor = "red" ;
        document.querySelector(".fourth").style.backgroundColor = "" ;

    }
     resetRegestirationErrors() {
        errorMessages.innerHTML="";
        errorMessages.style.display = "none";
    }

    validateContact () 
    {

        this.errorMessages.innerHTML="";
        this.errorMessages.style.display = "none";
        var formErrors = {};
            
        if(this.userName.value == ""  )
        {
            formErrors.nameError = " please enter userName";
        }
        if ( document.getElementById("nickname").value =="" )
        {
            formErrors.emailError = " please enter nickname"
        }
        if ( document.getElementById("password").value =="" )
        {
            formErrors.password = " please enter password"
        }
        if  ( document.getElementById("cPassword").value != document.getElementById("password").value )
        {
            formErrors.cPassword = " confirm passowrd wrong "
        }
        if (Object.keys(formErrors).length != 0 )
        {
            AccountSetting.setformErrors(formErrors);

            this.errorMessages.style.display = "block";
            var liError;
            var textnode;
            for (var k in formErrors) {
                liError= document.createElement("li")
                textnode = document.createTextNode(formErrors[k]);
                liError.appendChild(textnode);
                this.errorMessages.appendChild(liError)
            }
            event.preventDefault();
        }
    }
}

var accountSetting = new AccountSetting();
accountSetting.defineListeners();
