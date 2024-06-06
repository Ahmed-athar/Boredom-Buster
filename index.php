<?php 
include "connect.php";  // Include the database connection settings
include "register.php"; // Include the registration and login handling script
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./Styling/login.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
    <title>Sign Up and Sign In</title>
</head>

<body>
    <div class="navbar">
        <h1>Boredom Buster</h1>
    </div>
    <div class="background-svg">
        <!-- Adjusted SVG viewBox and positioning -->
        <svg viewBox="0 0 1200 800">
            <circle cx="1000" cy="200" r="200" fill="rgba(218, 112, 214, 0.3)" />
            <circle cx="200" cy="600" r="150" fill="rgba(255, 121, 198, 0.3)" />
            <circle cx="1000" cy="600" r="100" fill="rgba(93, 173, 226, 0.3)" />
        </svg>
    </div>
    <div class="container">
        <!-- Sign-Up Form -->
        <div id="signup">
            <h2>Sign Up</h2>
            <form method="POST" action="login.php">
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email" required />
                    <label for="email">Email</label>
                </div>
                <div class="form-group">
                    <input type="tel" name="phone" placeholder="Phone Number" required pattern="[0-9]{10}"
                        title="Ten digits code" />
                    <label for="phone">Phone Number</label>
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="Password" required />
                    <label for="password">Password</label>
                </div>
                <input type="submit" value="Sign Up" name="signUp">
            </form>
            <button id="showSignIn" onclick="showSignIn()">Already registered? Sign In</button>
            <div class="social-links">
                <a href="google-oauth.php"><i class="fa-brands fa-google"></i></a>
            </div>
        </div>

        <!-- Sign-In Form -->
        <div id="signin" class="hidden">
            <h2>Sign In</h2>
            <form method="POST" action="login.php">
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email" required />
                    <label for="email">Email</label>
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="Password" required />
                    <label for="password">Password</label>
                </div>
                <input type="submit" value="Sign In" name="signIn">
            </form>
            <button id="showSignUp" onclick="showSignUp()">New here? Sign Up</button>
            <div class="social-links">
                <a href="google-oauth.php"><i class="fa-brands fa-google"></i></a>
            </div>
        </div>
    </div>
    <script src="./scripts/login.js"></script>
</body>

</html>