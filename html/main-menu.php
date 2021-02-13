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
            Here's our nav bar
        </nav>
        
        <section id="mainWindow" class="main-window">
            <div id="headerSection" class="header-section">
            <?php
            if(mysqli_num_rows($select_img_query) == 1){$row = mysqli_fetch_assoc($select_img_query);?>
                <img id="avatarImg" class="avatar-img" src="data:image/jpg;charset=utf8;base64,<?php echo base64_encode($row['avatar']); ?>"  draggable = false>
                <?php }?>
                <div class="progress-data-container">
                    <h2 id="userNickname" class="nickname"><?php echo $_SESSION["nickname"];?></h2>
                    <h3 class="progress-data">Score</h3>
                    <span id="userScore"><?php echo $_SESSION["score"];?> </span>
                    <h3 class="progress-data">Level</h3>
                    <span id="userLevel"><?php echo $_SESSION["level"];?> </span>
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

            <div id="playSection" class="play-section" style="display: none;">


                
            </div>
            <div id="selectCharactersection" class="selectCharacter-section"  style="display: none;">


                <svg viewBox="0 0 1000 400">
                <symbol id="s-text"> <text text-anchor="middle" x="50%" y="80%">choose your character</text> </symbol>

                <g class = "g-ants">
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                    
                </g>
                </svg>

                <div id="aliaadiv"  class=""  draggable = false>
                <img src="../images/main-menu/girl.png" class="character" id="aliaa" draggable = false >

                </div>
                <div id="alidiv"   class="" draggable = false >
                    <img src="../images/main-menu/boy.png" class="character" id="ali" draggable = false >
                </div>
            </div>


            <div id="selectlevel" style="display: none;" >
                <h2>Select your level</h2>
                <div class="start-game">
                    <div class="option" id="newGame">
                        <a href="game.html">New Game</a>
                    </div>
                    <div  class="option" id="continueGame">
                        <a href="game.html">Continue last level</a>
                    </div>
                </div>
            </div>

            <div id="settingsSection" class="settings-section" style="display: none;">

                <div class="iconsContainer">
                <div class="musicContainer" id="music">
                    <img class="musicIcon" src="../images/main-menu/music-icon.png" alt="" draggable="false">
                </div>
                <div class="accountContainer" id="accunt">
                    <img class="accountIcon" src="../images/main-menu/account-icon.png" alt="" draggable="false">
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
                    <div>
                    </div>
                </div>
                
            </div>

            <div id="instructionsSection" class="instructions-section" style="display: none;">
            <div id= "instructions_s">
                    <h1>instructions for playing </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec lacinia at sem nec porttitor.
                        Ut gravida dui in mauris congue imperdiet. Vestibulum a quam tempor, 
                        suscipit erat sed, mattis arcu. Sed consequat dapibus eros eu consectetur.
                         Nulla facilisi. Morbi tellus nibh, maximus sit amet erat vel, pulvinar pharetra elit.
                         Mauris porta leo nisi, ac condimentum nulla volutpat ut.
                        Aliquam egestas eget neque eget laoreet. Sed non consequat diam, nec sagittis sem.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec lacinia at sem nec porttitor.
                        Ut gravida dui in mauris congue imperdiet. Vestibulum a quam tempor, 
                        suscipit erat sed, mattis arcu. Sed consequat dapibus eros eu consectetur.
                        Nulla facilisi. Morbi tellus nibh, maximus sit amet erat vel, pulvinar pharetra elit.
                        Mauris porta leo nisi, ac condimentum nulla volutpat ut.
                        Aliquam egestas eget neque eget laoreet. Sed non consequat diam, nec sagittis sem.</p>
                </div >
    

            </div>
            <div id="creditsSection" class="credits-section" style="display: none;">
                <div id= "credits_s">
                    <h1>Credits</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec lacinia at sem nec porttitor.
                        Ut gravida dui in mauris congue imperdiet. Vestibulum a quam tempor, 
                        suscipit erat sed, mattis arcu. Sed consequat dapibus eros eu consectetur.
                         Nulla facilisi. Morbi tellus nibh, maximus sit amet erat vel, pulvinar pharetra elit.
                         Mauris porta leo nisi, ac condimentum nulla volutpat ut.
                        Aliquam egestas eget neque eget laoreet. Sed non consequat diam, nec sagittis sem.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec lacinia at sem nec porttitor.
                        Ut gravida dui in mauris congue imperdiet. Vestibulum a quam tempor, 
                        suscipit erat sed, mattis arcu. Sed consequat dapibus eros eu consectetur.
                        Nulla facilisi. Morbi tellus nibh, maximus sit amet erat vel, pulvinar pharetra elit.
                        Mauris porta leo nisi, ac condimentum nulla volutpat ut.
                        Aliquam egestas eget neque eget laoreet. Sed non consequat diam, nec sagittis sem.</p>
       

                            



                </div >
    
            </div>
            
            <div id="mainMenuSection" class="main-menu-section">

				<div id="playOption" class="option">
					Play
                </div>
                <div id="settingsOption" class="option">
					Settings
                </div>

                <div id="instructionsOption" class="option">
					Instructions
                </div>

                <div id="creditsOption" class="option">
					Credits
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
