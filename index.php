<?php  include "includes/functions.php"; ?>

<?php

if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['signup'])){

    $username = escape($_POST['registerUsername']);
    $password = escape($_POST['registerPassword']);
    $cpassword = escape($_POST['cpassword']);
    $nickname = escape($_POST['nickname']);
    

    $errorSignUp = [
        'username' =>  '',
        'password' =>  '',
        'cpassword' =>  '',
        'nickname' =>  '',
        'image' =>  '',
    ];

    $errorSignUp = validateRegister($errorSignUp, $username, $password, $cpassword, $nickname);    

    if (empty($errorSignUp)){
        if(register_user($username, $password, $nickname)){
            $registered = true;
        }    
    }

}else if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['signin'])){

    if (isset($_POST['loginUsername']) && isset($_POST['loginPassword'])) {
        $errorSignIn = [
            'username' =>  '',
            'password' =>  '',
            'cpassword' =>  '',
            'nickname' =>  '',
            'avatar' =>  '',
        ];

        $username = escape($_POST['loginUsername']);
        $password = escape($_POST['loginPassword']);
        
        $errorSignIn = validateLogin($errorSignIn, $username, $password);
        

        if (empty($errorSignUp)){
            if(login_user($username, $password)){
                redirect ("html/main-menu.php");
            }
        }
    } 
}

?>

<!DOCTYPE html>

<html>
    <head>
        <link rel="stylesheet" href="css/authen.css"/>
    </head>

    <body>
    <?php if(isset($registered)){?> <span <?php if($registered == true){echo 'class="success"';}else{echo 'class="failed"';} ?>> <?php if($registered == true){echo "User registered successfully";}else{ echo "User registration failed";}?> </span> <?php }?>
        <div class="container">
            <div class="buttons-container">
                <button class="button form-header-section" id="loginSection" autofocus>Login</button>
                <button class="button form-header-section" id="registerSection">Register</button>
            </div>
            <form action="index.php" id="loginForm" class="form" method="post">

                <table class="sign-in-table">
                    <tr>
                        <td><label for="loginUsername">Username</label></td>
                        <td><input type="text" name="loginUsername" id="loginUsername" /></td>
                    </tr>
                    <tr><td id="loginUsernameErr" colspan="2"> <p <?php if(isset ($errorSignIn['username'])){echo 'class="errorMsg"';} ?>><?php echo isset($errorSignIn['username']) ? $errorSignIn['username'] : '' ?></p></td></tr>
                    <tr>
                        <td><label for="loginPassword">Password</label></td>
                        <td><input type="password" name="loginPassword" id="loginPassword" /></td>
                    </tr>
                    <tr><td id="loginPasswordErr" colspan="2"><p <?php if(isset ($errorSignIn['password'])){echo 'class="errorMsg"';} ?>> <?php echo isset($errorSignIn['password']) ? $errorSignIn['password'] : '' ?> </p></td></tr>
                    <tr>
                        <td class="submit-container" colspan="2"><input class="button" type="submit" value="Sign in" name="signin" id="signin" class="submit-button"></td>
                    </tr>
                </table>
            </form>

            <form action="index.php" id="registerForm" class="form" method="post" enctype="multipart/form-data">
                <table class="sign-up-table">
                    <tr>
                        <td><label for="registerUsername">Username</label></td>
                            <td><input type="text" name="registerUsername" id="registerUsername" /></td>
                    </tr>
                    
                    <tr><td id="registerUsernameErr" colspan="2"> <p <?php if(isset ($errorSignUp['username'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>><?php echo isset($errorSignUp['username']) ? $errorSignUp['username'] : '' ?></p></td></tr>
                    <tr>
                        <td><label for="registerPassword">Password</label></td>
                        <td><input type="password" name="registerPassword" id="registerPassword" /></td>
                    </tr>
                    <tr><td id="registerPasswordErr" colspan="2"><p <?php if(isset ($errorSignUp['password'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>> <?php echo isset($errorSignUp['password']) ? $errorSignUp['password'] : '' ?> </p></td></tr>

                    <tr>
                        <td><label for="cpassword">Confirm Password</label></td>
                    <td> <input type="password" name="cpassword" id="cpassword" /></td>
                    </tr>
                    <tr><td id="ConfirmPasswordErr" colspan="2"><p <?php if(isset ($errorSignUp['cpassword'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>> <?php echo isset($errorSignUp['cpassword']) ? $errorSignUp['cpassword'] : '' ?> </p></td></tr>


                    <tr>
                    <td><label for="nickname">Nickname</label></td>
                    <td><input type="text" name="nickname" id="nickname"/></td>
                    </tr>
                    <tr><td colspan="2"><p <?php if(isset ($errorSignUp['nickname'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>> <?php echo isset($errorSignUp['nickname']) ? $errorSignUp['nickname'] : '' ?> </p></td></tr>

                    <tr>
                        <td><label for="image">Avatar</label></td>
                        <td><input type="file" name="image" id="image"/></td>
                    </tr>
                    <tr><td colspan="2"><p <?php if(isset ($errorSignUp['image'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>> <?php echo isset($errorSignUp['image']) ? $errorSignUp['image'] : '' ?> </p></td></tr>
            
                    <tr>
                        <td class="submit-container" colspan="2"><input class="button" type="submit" value="Sign Up" name="signup" id="signup"></td>
                    </tr>
                </table>
            </form>

        </div>

        <script src="js/authen.js"></script>
    </body>

</html>