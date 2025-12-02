  /* 
 Name: Anhie Pham
 File: hw4.js
 Date Created: 2025-12-02
 Date Updated: 2025-12-08
 Purpose: Redisplay/validate data from a form
*/

// Clears the review area
function removedata1() {
  document.getElementById("outputformdata").innerHTML = "(You started over)";
}

function getdata1() {
  const form = document.getElementById("signup");
  const outputArea = document.getElementById("outputformdata");

  // Create a new container div
  const container = document.createElement("div");
  container.className = "form-output";

  // Add a heading
  const heading = document.createElement("h4");
  heading.textContent = "Form Review Summary:";
  container.appendChild(heading);

  // Loop through form elements
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    const name = element.name;
    const value = element.value;
    const type = element.type;

    if (!name) continue;

    let displayValue = "";

    switch (type) {
      case "checkbox":
        if (element.checked) {
          displayValue = "Checked";
        } else {
          continue;
        }
        break;
      case "radio":
        if (element.checked) {
          displayValue = value;
        } else {
          continue;
        }
        break;
      case "button":
      case "submit":
      case "reset":
        continue;
      default:
        displayValue = value;
    }

    // Create a row using spans
    const row = document.createElement("div");
    row.className = "form-row";

    const nameSpan = document.createElement("span");
    nameSpan.className = "form-name";
    nameSpan.textContent = `: ${name} `;

    const typeSpan = document.createElement("span");
    typeSpan.className = "form-type";
    typeSpan.textContent = `: ${type} `;

    const valueSpan = document.createElement("span");
    valueSpan.className = "form-value";
    valueSpan.textContent = `: ${displayValue}`;

    row.appendChild(nameSpan);
    row.appendChild(typeSpan);
    row.appendChild(valueSpan);

    container.appendChild(row);
  }

  // Append the new container to the output area
  outputArea.appendChild(container);
}


// First Name validation
function checkFirstName() {
    const input = document.getElementById("first_name");
    const feedback = document.getElementById("first_name_text");
    const status = document.getElementById("good_count");

    const value = input.value.trim();
    const pattern = /^[A-Za-z'-]{1,30}$/;

    if (value.length < 1) {
      feedback.textContent = "First Name is too short";
      status.textContent = "✗";
    } else if (!pattern.test(value)) {
      feedback.textContent = "Invalid characters in First Name";
      status.textContent = "✗";
    } else {
      feedback.textContent = "";
      status.textContent = "✓";
    }
  }

// Last Name validation
function checkLastName() {
    const input = document.getElementById("last_name");
    const feedback = document.getElementById("last_name_text");
    const status = document.getElementById("good_count_1");

    const value = input.value.trim();
    const pattern = /^[A-Za-z'-]{1,30}$/;

    if (value.length < 1) {
      feedback.textContent = "Last Name is too short";
      status.textContent = "✗";
    } else if (!pattern.test(value)) {
      feedback.textContent = "Invalid characters in Last Name";
      status.textContent = "✗";
    } else {
      feedback.textContent = "";
      status.textContent = "✓";
    }
  }

  // Attach the function to input event
  document.getElementById("last_name").addEventListener("input", checkLastName);


//DOB's constraint
  const DOBinput = document.getElementById("DOB"); DOBinput.addEventListener("change", function () 
  {   
  const selectedDate = new Date (this.value);
  const currentDate = new Date();
  const pastDate = new Date ("1900-01-01");

  // Compare only the date part (ignore time)
  currentDate.setHours(0, 0, 0, 0);
  pastDate.setHours(0, 0, 0, 0);

  if (selectedDate < pastDate) 
  {   this.setCustomValidity("Date of Birth must be after 01/01/1900");
  }
  else if (selectedDate >= currentDate)
  {   this.setCustomValidity("Date of Birth must be in the past");
  }
  else 
  {this.setCustomValidity("");
  }
  });

//DOB Validation
  function validateDOB() {
    const input = document.getElementById("DOB");
    const feedback = document.getElementById("dob_text");

    const selectedDate = new Date(input.value);
    const currentDate = new Date();
    const earliestDate = new Date("1900-01-01");

    // Normalize time to avoid time zone issues
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    earliestDate.setHours(0, 0, 0, 0);

    if (selectedDate < earliestDate) {
      input.setCustomValidity("Date of Birth must be after 01/01/1900");
      feedback.textContent = "Date of Birth must be after 01/01/1900";
    } else if (selectedDate >= currentDate) {
      input.setCustomValidity("Date of Birth cannot be in the future");
      feedback.textContent = "Date of Birth cannot be in the future";
    } else {
      input.setCustomValidity("");
      feedback.textContent = "✓";
    }
  }
// Attach the function to input event
  document.addEventListener("DOMContentLoaded", function () {
    const dobInput = document.getElementById("DOB");
    if (dobInput) {
      dobInput.addEventListener("change", validateDOB);
    }
  });

//Social Security # Validation
function validateSSN() {
  const input = document.getElementById("SSN");
  const feedback = document.getElementById("SSN_text");

  const value = input.value.trim(); 
  const SSNRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;
  
  if (!SSNRegex.test(value)) {
    input.setCustomValidity ("invalid SSN");
    feedback.textContent = "Invalid SSN or format";
  }
  else {
    input.setCustomValidity("");
    feedback.textContent = "✓";
  }
}

// Attach the function to input event
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("SSN");
  if (input) {
    input.addEventListener("input", validateSSN);
  }
});

// Email validation
function validateEmail() {
  const input = document.getElementById("email");
  const feedback = document.getElementById("email_text");

  const value = input.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(value)) {
    input.setCustomValidity("Email must be in the format name@domain.tld");
    feedback.textContent = "Email must be in the format name@domain.tld";
  } else {
    input.setCustomValidity("");
    feedback.textContent = "✓";
  }
}

// Attach the function to input event
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("email");
  if (input) {
    input.addEventListener("input", validateEmail);
  }
});

//Phone Validation
function validatePhone() {
  const input = document.getElementById("phone");
  const feedback = document.getElementById("phone_text");

  const value = input.value.trim(); 
  const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  
  if (!phoneRegex.test(value)) {
    input.setCustomValidity ("invalid phone number");
    feedback.textContent = "Invalid phone number or format";
  }
  else {
    input.setCustomValidity("");
    feedback.textContent = "✓";
  }
}

// Attach the function to input event
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("phone");
  if (input) {
    input.addEventListener("input", validatePhone);
  }
});

//budget_scale's constraint
    const slider = document.getElementById("budget");
    const output = document.getElementById("rangedisplay");
        slider.addEventListener("input", function()
        {output.textContent = Number(this.value).toLocaleString();
});


//User ID Validation   
function validateUser () {
  const input = document.getElementById("userid");
  const feedback = document.getElementById("user_text");

  const value = input.value.trim();
  const userRegex = /^[a-z]{4,}[0-9_-]+$/;

  if (!userRegex.test(value)) {
    input.setCustomValidity ("Invalid userID");
    feedback.textContent = "Invalid";
  }
  else {
    input.setCustomValidity ("");
    feedback.textContent = "✓";
  }
}
//Attach the function to input event
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("userid");
  if (input) {
    input.addEventListener("input", validateUser);
  }
});

// ---Password Validation---
function validatePasswords() {
  const pass = document.getElementById("pass");
  const rePass = document.getElementById("re_pass");
  const userID = document.getElementById("userid").value.toLowerCase();
  const password = pass.value;
  const confirmPassword = rePass.value;

  const feedbackPass = document.getElementById("pass_text");
  const feedbackRePass = document.getElementById("repass_text");


  // Pattern Regex: at least 1 digit, 1 lowercase, 1 uppercase, 1 special char, min 8 chars
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*()\-_=+\\/><.,`~])[^\"]{8,}$/;

  let valid = true;


 // Check if password matches format
  if (!passwordRegex.test(password)) {
    pass.setCustomValidity("Password must meet all requirements");
    feedbackPass.textContent = "Invalid password format";
    valid = false;
  } else if (password.toLowerCase().includes(userID)) {
    pass.setCustomValidity("Password cannot contain your User ID");
    feedbackPass.textContent = "Password contains User ID";
    valid = false;
  } else {
    pass.setCustomValidity("");
    feedbackPass.textContent = "✓";
  }

// Check [re-enter password] matches [password]
  if (password !== confirmPassword) {
    rePass.setCustomValidity("Passwords do not match");
    feedbackRePass.textContent = "Passwords do not match";
    valid = false;
  } else {
    rePass.setCustomValidity("");
    feedbackRePass.textContent = "✓";
  }
  return valid;
}

// Attach the function to input events
document.addEventListener("DOMContentLoaded", function () {
  const pass = document.getElementById("pass");
  const rePass = document.getElementById("re_pass");

  if (pass && rePass) {
    pass.addEventListener("input", validatePasswords);
    rePass.addEventListener("input", validatePasswords);
  }
});
