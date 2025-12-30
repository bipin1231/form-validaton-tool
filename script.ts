
type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  age?: string;
};

const form = document.getElementById("signupForm") as HTMLFormElement;

const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;
const ageInput = document.getElementById("age") as HTMLInputElement;

const nameError = document.getElementById("nameError") as HTMLElement;
const emailError = document.getElementById("emailError") as HTMLElement;
const passwordError = document.getElementById("passwordError") as HTMLElement;
const confirmPasswordError = document.getElementById("confirmPasswordError") as HTMLElement;
const ageError = document.getElementById("ageError") as HTMLElement;


function setupPasswordToggle(
  input: HTMLInputElement,
  btn: HTMLButtonElement,
  eyeOpen: SVGElement,
  eyeClosed: SVGElement
) {
  btn.addEventListener("click", () => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    eyeOpen.style.display = isPassword ? "none" : "inline";
    eyeClosed.style.display = isPassword ? "inline" : "none";
  });
}


const togglePasswordBtn = document.getElementById("togglePassword") as HTMLButtonElement;


const toggleConfirmBtn = document.getElementById("toggleConfirmPassword") as HTMLButtonElement;
const eyeOpenElement = document.getElementById("eyeOpen");
if (!(eyeOpenElement instanceof SVGElement)) throw new Error("eyeOpen not found");

const eyeOpen = eyeOpenElement;

const eyeClosedElement = document.getElementById("eyeClosed");
if (!(eyeClosedElement instanceof SVGElement)) throw new Error("eyeClosed not found");

const eyeClosed = eyeClosedElement;

const eyeOpenConfirmElement = document.getElementById("eyeOpenConfirm");
if (!(eyeOpenConfirmElement instanceof SVGElement)) throw new Error("eyeOpenConfirm not found");

const eyeOpenConfirm = eyeOpenConfirmElement;

const eyeClosedConfirmElement = document.getElementById("eyeClosedConfirm");
if (!(eyeClosedConfirmElement instanceof SVGElement)) throw new Error("eyeClosedConfirm not found");

const eyeClosedConfirm = eyeClosedConfirmElement;


setupPasswordToggle(passwordInput, togglePasswordBtn, eyeOpen, eyeClosed);
setupPasswordToggle(confirmPasswordInput, toggleConfirmBtn, eyeOpenConfirm, eyeClosedConfirm);


function validate(data: SignUpFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!data.email.includes("@")) errors.email = "Invalid email address";

  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 8) errors.password = "Password must be at least 8 characters";

  if (!data.confirmPassword) errors.confirmPassword = "Confirm password is required";
  else if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match";

  if (!data.age) errors.age = "Age is required";
  else if (data.age < 0) errors.age = "Age must be a positive number";
  else if (data.age < 10) errors.age = "You must be at least 10 years old";

  return errors;
}


function showErrors(errors: FormErrors) {
  nameError.textContent = errors.name ?? "";
  emailError.textContent = errors.email ?? "";
  passwordError.textContent = errors.password ?? "";
  confirmPasswordError.textContent = errors.confirmPassword ?? "";
  ageError.textContent = errors.age ?? "";
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data: SignUpFormData = {
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
