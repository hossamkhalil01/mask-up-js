var account = document.getElementById("accunt");
var accountForm = document.getElementById("accountForm");
var musicForm =  document.getElementById("musicForm");
account.addEventListener("click",accountClicked)
function accountClicked(e)
{
    musicForm.style.display="none"
    accountForm.style.display=""
}
