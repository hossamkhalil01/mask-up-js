<?php include "includes/db.php"; ?>
<?php  include "includes/header.php"; ?>

<?php

if($_SERVER['REQUEST_METHOD'] == "POST"){

    $username = escape($_POST['username']);
    $email = escape($_POST['email']);
    $password = escape($_POST['password']);

    $error = [
        'username' =>  '',
        'email' =>  '',
        'password' =>  '',
    ];

    if(strlen($username) < 4){
        $error['username'] = 'Username needs to be longer';
    }
    if($username === ''){
        $error['username'] = 'Username cannot be empty';
    }
    if(username_exists($username)){
        $error['username'] = 'Username already exists, pick another one';
    }


    if($email === ''){
        $error['email'] = 'Email cannot be empty';
    }
    if(email_exists($email)){
        $error['email'] = 'Email already exists, <a href="index.php">Please login </a>';
    }


    if($password === ''){
        $error['password'] = 'Password cannot be empty';
    }

    foreach ($error as $key => $value){
        if (empty($value)){
            unset($error[$key]);
        }
    } // end foreach

    if (empty($error)){
        register_user($username, $email, $password);
        $data['message'] = $username;
        $pusher->trigger('notifications', 'new_user', $data);
        login_user($username, $password);
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

                <table>
                    <tr>
                        <td><label for="username">Username</label></td>
                        <td><input type="text" name="username" id="username"/></td>
                    </tr>
                    <tr>
                        <td><label for="password">Password</label></td>
                        <td><input type="password" name="password" id="password"/></td>
                    </tr>    
                    <br>
                    <tr>
                        <td colspan="2"><input class="button" type="submit" value="Sign in" name="signin" id="signin"></td>
                    </tr>
                </table>
            </form>
            <form action="index.php" id="registerForm" class="form" method="post">
                <table>
                    <tr>
                        <td><label for="username">Username</label></td>
                            <td><input type="text" name="username" id="username"/></td>
                    </tr>

                    <tr>
                        <td><label for="password">Password</label></td>
                        <td><input type="password" name="password" id="password"/></td>
                    <br>
                </tr>

                <tr>
                    <td><label for="cpassword">Confirm Password</label></td>
                   <td> <input type="password" name="cpassword" id="cpassword"/></td>
                </tr>

                <tr>
                <td><label for="nickname">Nickname</label></td>
                <td><input type="text" name="nickname" id="nickname"/></td>
                </tr>

                <tr>
                    <td><label for="avatar">Avatar</label></td>
                    <td><input type="file" name="avatar" id="avatar"/></td>
                </tr>

                <tr>
                    <td colspan="2"><input class="button" type="submit" value="Sign Up" name="signup" id="signup"></td>
                </tr>
            </table>


            </form>

        </div>

        <script src="js/authen.js"></script>
    </body>

</html>