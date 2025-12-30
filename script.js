"use strict";
const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const ageInput = document.getElementById("age");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const ageError = document.getElementById("ageError");
function setupPasswordToggle(input, btn, eyeOpen, eyeClosed) {
    btn.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        eyeOpen.style.display = isPassword ? "none" : "inline";
        eyeClosed.style.display = isPassword ? "inline" : "none";
    });
}
const togglePasswordBtn = document.getElementById("togglePassword");
const toggleConfirmBtn = document.getElementById("toggleConfirmPassword");
const eyeOpenElement = document.getElementById("eyeOpen");
if (!(eyeOpenElement instanceof SVGElement))
    throw new Error("eyeOpen not found");
const eyeOpen = eyeOpenElement;
const eyeClosedElement = document.getElementById("eyeClosed");
if (!(eyeClosedElement instanceof SVGElement))
    throw new Error("eyeClosed not found");
const eyeClosed = eyeClosedElement;
const eyeOpenConfirmElement = document.getElementById("eyeOpenConfirm");
if (!(eyeOpenConfirmElement instanceof SVGElement))
    throw new Error("eyeOpenConfirm not found");
const eyeOpenConfirm = eyeOpenConfirmElement;
const eyeClosedConfirmElement = document.getElementById("eyeClosedConfirm");
if (!(eyeClosedConfirmElement instanceof SVGElement))
    throw new Error("eyeClosedConfirm not found");
const eyeClosedConfirm = eyeClosedConfirmElement;
setupPasswordToggle(passwordInput, togglePasswordBtn, eyeOpen, eyeClosed);
setupPasswordToggle(confirmPasswordInput, toggleConfirmBtn, eyeOpenConfirm, eyeClosedConfirm);
function validate(data) {
    const errors = {};
    if (!data.name.trim())
        errors.name = "Full name is required";
    if (!data.email.trim())
        errors.email = "Email is required";
    else if (!data.email.includes("@"))
        errors.email = "Invalid email address";
    if (!data.password)
        errors.password = "Password is required";
    else if (data.password.length < 8)
        errors.password = "Password must be at least 8 characters";
    if (!data.confirmPassword)
        errors.confirmPassword = "Confirm password is required";
    else if (data.password !== data.confirmPassword)
        errors.confirmPassword = "Passwords do not match";
    if (!data.age)
        errors.age = "Age is required";
    else if (data.age < 0)
        errors.age = "Age must be a positive number";
    else if (data.age < 10)
        errors.age = "You must be at least 10 years old";
    return errors;
}
function showErrors(errors) {
    var _a, _b, _c, _d, _e;
    nameError.textContent = (_a = errors.name) !== null && _a !== void 0 ? _a : "";
    emailError.textContent = (_b = errors.email) !== null && _b !== void 0 ? _b : "";
    passwordError.textContent = (_c = errors.password) !== null && _c !== void 0 ? _c : "";
    confirmPasswordError.textContent = (_d = errors.confirmPassword) !== null && _d !== void 0 ? _d : "";
    ageError.textContent = (_e = errors.age) !== null && _e !== void 0 ? _e : "";
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value,
        age: Number(ageInput.value),
    };
    const errors = validate(data);
    showErrors(errors);
    if (Object.keys(errors).length === 0) {
        alert("Registration successful!");
        form.reset();
    }
});
