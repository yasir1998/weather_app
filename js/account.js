document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle the visibility of the account section and forms
  function toggleAccountSection() {
    const accountSection = document.getElementById("account-section");
    const serchbox = document.querySelector(".searchBox");
    if (
      accountSection.style.display === "none" ||
      accountSection.style.display === ""
    ) {
      accountSection.style.display = "flex";
      // Show the sign-in form by default when the account section is displayed
      document.getElementById("signin-form").style.display = "block";
      document.getElementById("signup-form").style.display = "none";
      serchbox.style.display = "none";
      document.getElementById("home").style.display = "none";
      document.getElementById("w-product").style.display = "none";
      document.getElementById("popup").style.display = "none";
      document.getElementById("product-overlay").style.display = "none";
      document.getElementById("footer").style.display = "none";
      document.getElementById("client").style.display = "none";
      document.getElementById("wrold-enviroment").style.display = "none";
    } else {
      accountSection.style.display = "none";
    }
  }

  // Event listener for the account button
  document
    .querySelector(".account-icon")
    .addEventListener("click", toggleAccountSection);

  // Function to toggle the visibility of sign-in and sign-up forms
  function toggleForms() {
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");
    if (signinForm.style.display === "none") {
      signinForm.style.display = "block";
      signupForm.style.display = "none";
    } else {
      signinForm.style.display = "none";
      signupForm.style.display = "block";
    }
  }

  // Event listener for toggling between sign-in and sign-up forms
  document
    .getElementById("toggle-signin")
    .addEventListener("click", toggleForms);
  document
    .getElementById("toggle-signup")
    .addEventListener("click", toggleForms);

  // Function to check if a string contains at least one special character
  function hasSpecialCharacter(str) {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharacters.test(str);
  }

  // Function to display success message inside the sign-up form
  function showSignUpSuccessMessage() {
    const signUpForm = document.getElementById("signup-form");
    const successMessage = document.createElement("p");
    successMessage.textContent = "Sign-up successful!";
    signUpForm.appendChild(successMessage);
  }

  // Function to display success message inside the sign-in form
  function showSignInSuccessMessage() {
    const signInForm = document.getElementById("signin-form");
    const successMessage = document.createElement("p");
    successMessage.textContent = "Sign-in successful!";
    signInForm.appendChild(successMessage);
  }

  // Function to  sign-in
  function signIn() {
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    const users = [{ email: "example@example.com", password: "password" }];

    // Check if a user with the provided email and password exists
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Successful sign-in, navigate to the product page
      // For testing purposes, just log a message
      console.log("Sign-in successful for user: ", user.email);
      // Show success message
      showSignInSuccessMessage();
    } else {
      // Display error message if no matching user is found
      const signInForm = document.getElementById("signin-form");
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Invalid email or password. Please try again.";
      signInForm.appendChild(errorMessage);
    }
  }

  // Event listener for sign-in form submission
  document.getElementById("signin-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting
    signIn(); // Call the signIn function to handle sign-in
  });

  // Event listener for sign-up form submission
  document.getElementById("signup-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const passwordInput = document.getElementById("signup-password");
    const password = passwordInput.value;

    // Check if the password contains at least one special character
    if (!hasSpecialCharacter(password)) {
      // If the password doesn't contain a special character, display an error message
      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        "Password must contain at least one special character.";
      document.getElementById("signup-form").appendChild(errorMessage);
      return; // Exit the function to prevent form submission
    }

    // If the password meets the condition,then proceed with form submission or any other action
    console.log("Password meets the requirement.");
    // Show success message
    showSignUpSuccessMessage();
  });

  // Hide the account section and forms when the page loads
  const accountSection = document.getElementById("account-section");
  accountSection.style.display = "none";

  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  signinForm.style.display = "none";
  signupForm.style.display = "none";
});
