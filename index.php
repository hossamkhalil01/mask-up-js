<?php  include "includes/functions.php"; ?>

<?php

if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['signup'])){

    $username = escape($_POST['username']);
    $password = escape($_POST['password']);
    $cpassword = escape($_POST['cpassword']);
    $nickname = escape($_POST['nickname']);
    $avatar = escape($_POST['avatar']);
    

    $errorSignUp = [
        'username' =>  '',
        'password' =>  '',
        'cpassword' =>  '',
        'nickname' =>  '',
        'avatar' =>  '',
    ];

    $errorSignUp = validateRegister($errorSignUp, $username, $password, $cpassword, $nickname, $avatar);    

    if (empty($errorSignUp)){
        register_user($username, $password, $nickname, $avatar);
        
    }
}else if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['signin'])){
    $errorSignIn = [
        'username' =>  '',
        'password' =>  '',
        'cpassword' =>  '',
        'nickname' =>  '',
        'avatar' =>  '',
    ];

    if (isset($_POST['username']) && isset($_POST['password'])) {
        if(login_user($_POST['username'], $_POST['password'])){
            
            redirect ("html/main-menu.html");
        }
        else{
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
        <div class="container">
            <div class="buttons-container">
                <button class="button form-header-section" id="loginSection" autofocus>Login</button>
                <button class="button form-header-section" id="registerSection">Register</button>
            </div>
            <form action="index.php" id="loginForm" class="form" method="post">

                <table class="sign-in-table">
                    <tr>
                        <td><label for="username">Username</label></td>
                        <td><input type="text" name="username" id="username"/></td>
                    </tr>
                    <tr><td colspan="2"> <p <?php if(isset ($errorSignIn['username'])){echo 'class="errorMsg"';} ?>><?php echo isset($errorSignIn['username']) ? $errorSignIn['username'] : '' ?></p></td></tr>
                    <tr>
                        <td><label for="password">Password</label></td>
                        <td><input type="password" name="password" id="password"/></td>
                    </tr>
                    <tr><td colspan="2"><p <?php if(isset ($errorSignIn['password'])){echo 'class="errorMsg"';} ?>> <?php echo isset($errorSignIn['password']) ? $errorSignIn['password'] : '' ?> </p></td></tr>
                    <tr>
                        <td class="submit-container" colspan="2"><input class="button" type="submit" value="Sign in" name="signin" id="signin" class="submit-button"></td>
                    </tr>
                </table>
            </form>

            <form action="index.php" id="registerForm" class="form" method="post">
                <table class="sign-up-table">
                    <tr>
                        <td><label for="username">Username</label></td>
                            <td><input type="text" name="username" id="username"/></td>
                    </tr>
                    
                    <tr><td colspan="2"> <p <?php if(isset ($errorSignUp['username'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>><?php echo isset($errorSignUp['username']) ? $errorSignUp['username'] : '' ?></p></td></tr>
                    <tr>
                        <td><label for="password">Password</label></td>
                        <td><input type="password" name="password" id="password"/></td>
                    </tr>
                    <tr><td colspan="2"><p <?php if(isset ($errorSignUp['password'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>> <?php echo isset($errorSignUp['password']) ? $errorSignUp['password'] : '' ?> </p></td></tr>

                    <tr>
                        <td><label for="cpassword">Confirm Password</label></td>
                    <td> <input type="password" name="cpassword" id="cpassword"/></td>
                    </tr>
                    <tr><td colspan="2"><p <?php if(isset ($errorSignUp['cpassword'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>> <?php echo isset($errorSignUp['cpassword']) ? $errorSignUp['cpassword'] : '' ?> </p></td></tr>


                    <tr>
                    <td><label for="nickname">Nickname</label></td>
                    <td><input type="text" name="nickname" id="nickname"/></td>
                    </tr>
                    <tr><td colspan="2"><p <?php if(isset ($errorSignUp['nickname'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>> <?php echo isset($errorSignUp['nickname']) ? $errorSignUp['nickname'] : '' ?> </p></td></tr>

                    <tr>
                        <td><label for="avatar">Avatar</label></td>
                        <td><input type="file" name="avatar" id="avatar"/></td>
                    </tr>
                    <tr><td colspan="2"><p <?php if(isset ($errorSignUp['avatar'])){echo 'class="errorMsg SignUpErrorMsg"';} ?>> <?php echo isset($errorSignUp['avatar']) ? $errorSignUp['avatar'] : '' ?> </p></td></tr>
            
                    <tr>
                        <td class="submit-container" colspan="2"><input class="button" type="submit" value="Sign Up" name="signup" id="signup"></td>
                    </tr>
                </table>


            </form>

        </div>

        <script src="js/authen.js"></script>
    </body>

</html>