function loginMessage() {
    document.getElementById("loginResult").innerHTML = "Login successful!";
    return false; 
}

function validateSignup() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let result = document.getElementById("signupResult");

    if (password !== confirmPassword) {
        result.innerHTML = "Passwords do not match!";
        result.style.color = "red";
        return false;
    }

    result.innerHTML = "Account created successfully!";
    result.style.color = "green";
    return false;
}
function showWelcome() {
    alert("Welcome to StudySync! Let's start studying!");
}