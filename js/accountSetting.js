class AccountSetting {
    static formErrors;
    static setformErrors(formErrors){
        this.formErrors= formErrors;
    }
    constructor() {
        this.userName = document.getElementById("userName");
        this.account = document.getElementById("accunt");
        this.accountForm = document.getElementById("accountForm");
        this.musicForm =  document.getElementById("musicForm");
        this.update = document.getElementById("update");
    }
    defineListeners( ) {
        this.account.addEventListener("click",this.accountClicked)
        this.update.addEventListener("click",this.validateContact)
    }
      accountClicked(e)
    {
        document.getElementById("musicForm").style.display="none"
        document.getElementById("accountForm").style.display=""
    }
     resetRegestirationErrors() {
         console.log('there')
        document.getElementById("error-messages").innerHTML="";
        document.getElementById("error-messages").style.display = "none";
    }
     validateContact (event) {
         document.getElementById("error-messages").innerHTML="";
         document.getElementById("error-messages").style.display = "none";         var formErrors = {};
        if(userName.value == ""  )
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
             formErrors.cPassword = " confirm password must be exact to password"
         }
        if (Object.keys(formErrors).length != 0 )
        {
            AccountSetting.setformErrors(formErrors);
            console.log("heeeeeeeereeeeeeeeee")
            console.log(formErrors)
            var errorsUl = document.getElementById("error-messages");
            errorsUl.style.display = "block";
            var liError;
            var textnode;
            for (var k in formErrors) {
                liError= document.createElement("li")
                textnode = document.createTextNode(formErrors[k]);
                liError.appendChild(textnode);
                errorsUl.appendChild(liError)
            }            event.preventDefault();
        }
        else {
           alert("Not working yet")
        }

    }

}
var accountSetting = new AccountSetting();
accountSetting.defineListeners();
// console.log(accountSetting)