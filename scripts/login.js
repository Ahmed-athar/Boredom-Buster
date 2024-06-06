document.addEventListener("DOMContentLoaded", function () {
  var showSignInBtn = document.getElementById("showSignIn");
  var showSignUpBtn = document.getElementById("showSignUp");
  var signInForm = document.getElementById("signin");
  var signUpForm = document.getElementById("signup");
  var circles = document.querySelectorAll(".background-svg .circle-bg");

  if (showSignInBtn && signInForm && signUpForm && circles) {
    showSignInBtn.onclick = function () {
      signInForm.style.display = "block";
      signUpForm.style.display = "none";
      circles.forEach((circle) => {
        circle.style.transform = "translateX(-50px)";
      });
    };
  }

  if (showSignUpBtn && signInForm && signUpForm && circles) {
    showSignUpBtn.onclick = function () {
      signUpForm.style.display = "block";
      signInForm.style.display = "none";
      circles.forEach((circle) => {
        circle.style.transform = "translateX(50px)";
      });
    };
  }
});
