<?php// ob_start();?>
<?php include '../includes/functions.php';?>

<?php 
	if(!isset($_SESSION['username']))
			header("Location: ../index.php");
?>

<?php 

$username = $_SESSION['username'];
// Get image data from database
$query = "SELECT * FROM `player` WHERE `username` = '$username'"; 
$select_img_query = query($query);



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

            <div id="settingsSection" class="settings-section" style="display: none;">

                <div class="iconsContainer">
                <div class="musicContainer" id="music">
                    <img class="musicIcon" src="../images/music-512.png" alt="" draggable="false">
                </div>
                <div class="accountContainer" id="accunt">
                    <img class="accountIcon" src="../images/account3.png" alt="" draggable="false">
                </div>
                </div>
                <div class="accountForm" id="accountForm" style="display: none" >
                    <div class="formGroup">
                    <label class="formElement" >Username</label>
                    <input class="formElement" disabled  id="userName" type="text" value="Mahmoud">
                    </div>
        
        
                    <div class="formGroup">
                        <label class="formElement" >Nickname</label>
                        <input class="formElement"  id="nickname" type="text" value="">
                    </div>
        
                    <div class="formGroup">
                        <label class="formElement" >Password</label>
                        <input class="formElement"  id="password" type="password">
                    </div>
        
                    <div class="formGroup">
                        <label class="formElement" >Confirm Password</label>
                        <input class="formElement" id="cPassword" type="password">
                    </div>
                    <div class="parent">

                        <div class="formGroup" class="updatebtn">
                            <input  class="formButton" type="submit" id="update" value="update">
                        </div>
                        <div class="formErrors">
                            <ul class="errors" id="errorMessage" style="display:none">
                            </ul>
                     </div>
            


                    </div>
                   
                    
                </div>

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

    </body>
</html>