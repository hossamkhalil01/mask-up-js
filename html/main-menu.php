<?php include '../includes/functions.php';?>

<?php
	if(!isset($_SESSION['username'])){
		header("Location: ../index.php");
    }else{
        $username = $_SESSION['username'];
        $nickname = $_SESSION['nickname'];
        $score = $_SESSION['score'];
        $level = $_SESSION['level'];

        // Get image data from database
        $query = "SELECT * FROM `player` WHERE `username` = '$username'";
        $select_img_query = query($query);
    }
?>

<?php
if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['update'])){

    $password = escape($_POST['password']);
    $cpassword = escape($_POST['cpassword']);
    $nickname = escape($_POST['nickname']);

    $errorUpdate = [
        'password' =>  '',
        'cpassword' =>  '',
        'nickname' =>  '',
    ];

    $errorUpdate = validateUpdate($errorUpdate, $nickname,  $password, $cpassword);

    if (empty($errorUpdate)){
        if(update_user($_SESSION["username"], $password, $nickname)){
            $updated = true;
        }
    }

}
?>


<!Doctype html>

<html lang="en">

    <head>
        <meta charset="utf-8">
        <title>Mask Up</title>
        <meta name="description" content="Mask Up online game">
        <meta name="author" content="Hossam Khalil">

        <link rel="stylesheet" href="../css/main-menu.css">
        <link rel="stylesheet" href="../css/settings-menu.css">
    </head>

    <body>
        <nav>
        </nav>
        
        <section id="mainWindow" class="main-window">
            <div id="headerSection" class="header-section">
            <?php
            if(mysqli_num_rows($select_img_query) == 1){$row = mysqli_fetch_assoc($select_img_query);?>
                <img id="avatarImg" class="avatar-img" src="data:image/jpg;charset=utf8;base64,<?php echo base64_encode($row['avatar']); ?>"  draggable = false>
                <?php }?>
                <div class="progress-data-container">
                    <h2 id="userNickname" class="nickname"><?php echo $_SESSION["nickname"];?></h2>
                    <h3 class="progress-data">Highst Score:</h3>
                    <span id="userScore" style="color: white;"><?php echo $_SESSION["score"];?> </span>
                    <br>
                    <h3 class="progress-data">Highst Level:</h3>
                    <span id="userLevel" style="color: white;"><?php echo $_SESSION["level"];?> </span>
                    
                </div>
                <p id="clear"></p>

                <div>
                    <input type="button" value="back" id="backBtn"   style="display: none;">
                    <h2>Protect Yourself and Mask Up!!</h2>
                </div>
                
                <div class="animatediv"> 
                    <img class ="covid-icon" src="https://atheistiran.com/wp-content/uploads/2020/03/corona-virus.png"  draggable = false>
                </div>
                <div class="animatediv2"> 
                    <img class ="covid-icon" src="https://atheistiran.com/wp-content/uploads/2020/03/corona-virus.png"  draggable = false>
                </div>

            </div>

            <div id="playSection" class="play-section" style="display: none;"></div>

            <div id="selectCharactersection" class="selectCharacter-section"  style="display: none;">
                <br>
                <h1  class="selectchartext">select you character</h1>

                <div id="aliaadiv"  class=""  draggable = false>
                    <img src="../images/main-menu/girl.png" class="character" id="aliaa" draggable = false >

                </div>
                <div id="alidiv"   class="" draggable = false >
                    <img src="../images/main-menu/boy.png" class="character" id="ali" draggable = false >
                </div>
            </div>


            <div id="selectlevel" style="display: none;" >
                <div class="start-game">
                    <div class="option" id="newGame">
                        <a href="game.php">New Game</a>
                    </div>
                    <div  class="option" id="continueGame">
                        <a href="game.php">Continue From Highest Level</a>
                    </div>
                </div>
            </div>

            <div id="settingsSection" class="settings-section" style="display: none;">

                <div class="iconsContainer">
                <div class="musicContainer" id="music">
                    <button class="btn fourth">MP3 MUSIC</button>
                </div>
                <div class="accountContainer" id="accunt">
                <button class="btn fifth">Settings</button>

                </div>
                </div>

                <form class="accountForm" id="accountForm" style="display: none"  method="POST">
                    <div class="formGroup">
                    <label class="formElement" >Username</label>
                    <input class="formElement" disabled name="username"  id="userName" type="text" value="<?php echo $_SESSION["username"] ?>">
                    </div>
        
        
                    <div class="formGroup">
                        <label class="formElement" >Nickname</label>
                        <input class="formElement" name="nickname"  id="nickname" type="text" value="<?php echo $_SESSION["nickname"] ?>">
                    </div>
        
                    <div class="formGroup">
                        <label class="formElement" >Password</label>
                        <input class="formElement" value="" name="password"  id="password" type="password">
                    </div>
        
                    <div class="formGroup">
                        <label class="formElement" >Confirm Password</label>
                        <input class="formElement" value="" name="cpassword" id="cPassword" type="password">
                    </div>
                    <div class="parent">

                        <div class="formGroup" class="updatebtn">
                            <input  class="formButton" name="update" type="submit" id="update" value="update">
                        </div>
                        <div class="formErrors">
                            <ul class="errors" id="errorMessage" style="display:none">

                            </ul>
                     </div>
                    </div>
                </form>

                <div class="musicForm" id="musicForm">
                    <audio controls  id="theAud" class="musicItem">
                        <source id="currentSong" src="" type="audio/ogg">
                    </audio>
                    <br>
                    <div class="musicButtonsContainer">
                        <button id="shuffle" class="musicButtons">Shuffle</button>
                        <button id="repeat" class="musicButtons">Repeat</button>
                        <button id="play" class="musicButtons">Play Next</button>
                        <button id="pause-reusme" currentType="resume" class="musicButtons">Reusme</button>
                    </div>
                    <div class="existedMusic">
                        <ul id="musicAlbum">
                        </ul>
                    </div>
                </div>
            </div>

            <div id="instructionsSection" class="instructions-section" style="display: none;">
                <div id= "instructions_s">
                    <h1 >instructions for playing </h1>
                    <h2>You are in a real danger, viruses are everywhere , you have to survive.</h2>
                    <div class="instructionsContainer">
                        <div style="display: inline-block">
                            <img src="../images/main-menu/controllers/wasd-keys.png" alt="" width="60" height="80">
                            <br>
                            <img class="arrows" src="../images/main-menu/controllers/arrows.png" alt="" width="90" height="150">
                        </div>
                        <div style="display: inline">
                            <img src="../images/main-menu/controllers/space-button.png" width="60" height="80" alt="">
                        </div>
                        <div style="display: inline-block">
                            <span>to jump &nbsp;&nbsp;&nbsp;&nbsp;	&nbsp;&nbsp;&nbsp;	&nbsp;	press on arrow  up or W</span>
                            <br>
                            <br>
                            <span>to run right &nbsp;&nbsp; &nbsp;&nbsp;press on arrow right or D</span>
                            <br>
                            <br>
                            <span>to run left &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;	 press on arrow left or A</span>
                            <br>
                            <br>
                            <span>to kill viruses &nbsp; press on space</span>
                        </div>
                    </div>
                </div>
                <h2>please care there are many waves for corona </h2>
            </div>

            <div id="creditsSection" class="credits-section" style="display: none;">
                <div id="fly-in">  
                    <div><span>mask up  </span>Credits</div>
                        <div><span>developed by </span>OSAD </div>
                        <div>Ahmed Mamdouh<span>Do not give up, the beginning is always the hardest</span></div>
                        <div>Hossam Hassan <span>The journey of thousands miles begins with a step</span></div>
                        <div> Mahmoud Atef<span>Don’t hurry,And be sure to smell the flowers along the way</span></div>
                        <div>Mohamed Kaoud<span>a person who never made mistakes, never tried anything</span></div>
                        <div>Thanks for your time  <span></span></div>
                    </div >
                </div>
            </div> 
    
            <div id="mainMenuSection" class="main-menu-section">

				<div id="playOption" class="option">
					Play
                </div>
                
                <div id="instructionsOption" class="option">
					Instructions
                </div>

                <div id="creditsOption" class="option">
					Credits
                </div>
                <div id="settingsOption" class="option">
					Settings
                </div>
                <div id="logoutOption" class="option">
                    <a href="../includes/logout.php">Logout</a>
				</div>

            </div>
            
        </section>

        <footer >
            This is our contact info
        </footer>

    <script src="../js/main-menu.js"></script>
    <script src="../js/music-settings.js"></script>
    <script src="../js/account-settings.js"></script>
    <script src="../js/main-menu-local-storage.js" ></script>

    </body>
</html>