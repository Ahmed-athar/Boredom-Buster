<?php
include "./connect.php";

session_start();

// Handling Sign Up
if (isset($_POST['signUp'])) {
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $password = md5($password); // Hashing the password using MD5 algorithm

    // Check if the user already exists
    $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        header("Location: login.php?error=email_exists");  // Adjust if necessary
    } else {
        $insert = $conn->prepare("INSERT INTO users (email, pnum, password) VALUES (?, ?, ?)");
        $insert->bind_param("sss", $email, $phone, $password);
        if ($insert->execute()) {
            $_SESSION['email'] = $email; // Set session variable
            header("Location: home.html"); // Redirect to main page
            exit;
        } else {
            header("Location: index.php?error=signup_failed");
            exit;
        }
    }
}

// Handling Sign In
if (isset($_POST['signIn'])) {
    $email = $_POST['email'];
    $password = $_POST['password']; // Password entered by the user
$password = md5($password); // Hashing the password using MD5 algorithm
    // Prepared statement to avoid SQL Injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email=? AND password=?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['id'] = $row['id']; // Storing user's id in session variable
        $_SESSION['user_id'] = $row['id']; // Storing user's ID in session variable
        header("Location: home.html"); // Redirecting user to the homepage after successful sign-in
        exit(); // Exiting the script    
    } 
    else {
        // Redirect back to the sign-in page with an error message
        header("Location: index.php?error=invalid_password");
        exit;
    }
}
?>