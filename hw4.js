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

// ---Fetch API to submit form data---
async function submitFormData(event) {
  event.preventDefault(); // Prevent default form submission

  const form = document.getElementById("signup");
  
  // Validate all form fields first
  if (!form.checkValidity()) {
    alert("Please fill out all required fields correctly");
    return;
  }

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    // Show loading message
    const outputArea = document.getElementById("outputformdata");
    outputArea.innerHTML = "<p>Submitting form...</p>";

    // Send data to API endpoint (using JSONPlaceholder as mock API)
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: data,
        timestamp: new Date().toLocaleString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Display success message
    outputArea.innerHTML = `
      <div class="success-message">
        <h3>✓ Form Submitted Successfully!</h3>
        <p><strong>Submission ID:</strong> ${result.id}</p>
        <p><strong>Timestamp:</strong> ${data.DOB ? new Date().toLocaleString() : "N/A"}</p>
        <p><strong>Patient Name:</strong> ${data.first_name} ${data.MI_initial} ${data.last_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p style="color: green; font-weight: bold;">Your registration has been received. Redirecting in 3 seconds...</p>
      </div>
    `;

    // Redirect after 3 seconds
    setTimeout(() => {
      window.location.href = "hw4-thankyou.html";
    }, 3000);

  } catch (error) {
    console.error("Error submitting form:", error);
    outputArea.innerHTML = `
      <div class="error-message">
        <h3>✗ Error Submitting Form</h3>
        <p>${error.message}</p>
        <p>Please try again.</p>
      </div>
    `;
  }
}

// Attach form submission handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup");
  if (form) {
    form.addEventListener("submit", submitFormData);
  }
});

// ==================== COOKIE FUNCTIONS ====================
// Set a cookie with days parameter (default 2 days for security)
function setCookie(name, value, days = 2) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
  console.log(`Cookie set: ${name} = ${value}, expires in ${days} days`);
}

// Get a cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

// Delete a cookie
function deleteCookie(name) {
  setCookie(name, "", -1);
}

// ==================== LOCAL STORAGE FUNCTIONS ====================
// Save form data to localStorage (only non-secure fields)
function saveFormToLocalStorage() {
  const rememberMe = document.getElementById("remember_me");
  
  // Only save if Remember Me is checked
  if (rememberMe && !rememberMe.checked) {
    clearAllData();
    return;
  }

  const form = document.getElementById("signup");
  const formData = new FormData(form);
  const data = {};
  
  // Non-secure fields to save (exclude password fields)
  const fieldsToSave = [
    "first_name", "MI_initial", "last_name", "DOB", "email", 
    "phone", "address_1", "address_2", "city", "state", "zip", 
    "symptoms", "gender", "flu_vaccine", "diagnosis"
  ];

  fieldsToSave.forEach(field => {
    const element = form.elements[field];
    if (element) {
      if (element.type === "checkbox") {
        data[field] = element.checked ? element.value : "";
      } else if (element.type === "radio") {
        if (element.checked) {
          data[field] = element.value;
        }
      } else {
        data[field] = element.value;
      }
    }
  });

  localStorage.setItem("patientFormData", JSON.stringify(data));
  localStorage.setItem("lastSaved", new Date().toLocaleString());
  console.log("Form data saved to localStorage");
}

// Load form data from localStorage
function loadFormFromLocalStorage() {
  const savedData = localStorage.getItem("patientFormData");
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      const form = document.getElementById("signup");
      
      for (let key in data) {
        const element = form.elements[key];
        if (element) {
          if (element.type === "checkbox" || element.type === "radio") {
            if (element.value === data[key]) {
              element.checked = true;
            }
          } else {
            element.value = data[key];
          }
        }
      }
      console.log("Form data loaded from localStorage");
      return true;
    } catch (error) {
      console.error("Error loading localStorage data:", error);
      return false;
    }
  }
  return false;
}

// Display last saved time from localStorage
function displayLastSaved() {
  const lastSaved = localStorage.getItem("lastSaved");
  if (lastSaved) {
    const notification = document.createElement("div");
    notification.id = "last-saved-notification";
    notification.style.cssText = "background-color: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 10px; border: 1px solid #28a745;";
    notification.innerHTML = `<strong>✓ Last saved:</strong> ${lastSaved}`;
    
    const body = document.getElementById("body");
    if (body && !document.getElementById("last-saved-notification")) {
      body.insertBefore(notification, body.firstChild);
    }
  }
}

// ==================== IFRAME FUNCTIONS ====================
// ==================== IFRAME FUNCTIONS ====================
// Auto-save form every 30 seconds
function initializeAutoSave() {
  setInterval(function() {
    saveFormToLocalStorage();
    console.log("Auto-save triggered at " + new Date().toLocaleTimeString());
  }, 30000); // 30 seconds
}

// Show a time-based notification at specific times
function initializeTimeBasedNotification() {
  const now = new Date();
  const hour = now.getHours();

  // Show a reminder during business hours (9 AM - 5 PM)
  if (hour >= 9 && hour < 17) {
    const reminder = document.createElement("div");
    reminder.style.cssText = "background-color: #fff3cd; color: #856404; padding: 10px; border-radius: 4px; margin-top: 10px; border: 1px solid #ffc107;";
    reminder.innerHTML = `<strong>⏰ Time Alert:</strong> Business hours reminder - Please complete your registration during business hours for faster processing.`;
    
    const body = document.getElementById("body");
    if (body) {
      body.appendChild(reminder);
    }
  }
}

// ==================== FETCH API FOR SENDING DATA ====================
// Fetch and display related patient information
async function fetchRelatedPatientInfo() {
  const infoContainer = document.getElementById("patient-info-container");
  if (!infoContainer) return;

  try {
    infoContainer.innerHTML = "<p>Loading patient information...</p>";

    // Fetch sample patient data
    const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const patients = await response.json();
    
    let html = "<h4>Related Hospital Staff:</h4>";
    patients.forEach(patient => {
      html += `
        <div style="background-color: #f0f0f0; padding: 8px; margin: 5px 0; border-left: 3px solid #4d311f;">
          <strong>${patient.name}</strong><br>
          Email: ${patient.email} | Phone: ${patient.phone}
        </div>
      `;
    });

    infoContainer.innerHTML = html;
  } catch (error) {
    console.error("Error fetching patient info:", error);
    infoContainer.innerHTML = `<p style="color: red;">Error loading patient info: ${error.message}</p>`;
  }
}

// Fetch and populate State options (uses try/catch)
async function loadStateOptions() {
  const stateSelect = document.getElementById('state');
  const errorDiv = document.getElementById('state-load-error');
  if (!stateSelect) return;

  try {
    // Show a temporary loading option
    const loadingOption = document.createElement('option');
    loadingOption.value = '';
    loadingOption.textContent = 'Loading states...';
    loadingOption.disabled = true;
    loadingOption.selected = true;
    stateSelect.appendChild(loadingOption);

    const response = await fetch('states.html', {cache: 'no-cache'});
    if (!response.ok) throw new Error(`Failed to load states (status ${response.status})`);

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const fragmentSelect = doc.getElementById('state-select-fragment');

    // Remove loading option
    if (loadingOption && loadingOption.parentNode === stateSelect) {
      stateSelect.removeChild(loadingOption);
    }

    if (fragmentSelect) {
      // Replace options (keep the first placeholder if present)
      const placeholder = stateSelect.querySelector('option[value=""]');
      stateSelect.innerHTML = '';
      if (placeholder) stateSelect.appendChild(placeholder);

      // Append options from the fetched fragment
      Array.from(fragmentSelect.options).forEach(opt => {
        // skip the placeholder in fragment (it has empty value)
        if (opt.value === '') return;
        const newOpt = document.createElement('option');
        newOpt.value = opt.value;
        newOpt.textContent = opt.textContent;
        stateSelect.appendChild(newOpt);
      });

      if (errorDiv) errorDiv.style.display = 'none';
    } else {
      throw new Error('States fragment not found in fetched file');
    }
  } catch (err) {
    console.error('Error loading state options:', err);
    if (errorDiv) {
      errorDiv.style.display = 'block';
      errorDiv.textContent = 'Could not load state list. Please select manually.';
    }
  }
}

// ==================== TIME-BASED EVENT ====================
// Update time dynamically in header
function updateLiveTime() {
  const todaySpan = document.getElementById("today");
  if (todaySpan) {
    const now = new Date();
    const timeString = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    todaySpan.innerHTML = timeString;
  }
}

// Session timeout warning (25 minutes)
let sessionTimeoutId;
function initializeSessionTimeout() {
  const timeoutMinutes = 25;
  const timeoutMs = timeoutMinutes * 60 * 1000;

  sessionTimeoutId = setTimeout(function() {
    showSessionTimeoutWarning();
  }, timeoutMs);
}

// Show warning modal when session about to expire
function showSessionTimeoutWarning() {
  const modal = document.createElement("div");
  modal.id = "timeout-modal";
  modal.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;";
  modal.innerHTML = `
    <div style="background: white; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
      <h2 style="color: #dc3545;">⏰ Session Timeout Warning</h2>
      <p>Your session is about to expire in 5 minutes due to inactivity.</p>
      <p>Click "Continue" to keep working or your form will be reset.</p>
      <button onclick="continueSession()" style="padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1em;">Continue</button>
      <button onclick="resetSession()" style="padding: 10px 20px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1em; margin-left: 10px;">Exit & Reset</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Continue the session
function continueSession() {
  const modal = document.getElementById("timeout-modal");
  if (modal) modal.remove();
  clearTimeout(sessionTimeoutId);
  initializeSessionTimeout(); // Restart the timeout
  console.log("Session continued");
}

// Reset session and clear data
function resetSession() {
  const modal = document.getElementById("timeout-modal");
  if (modal) modal.remove();
  clearTimeout(sessionTimeoutId);
  document.getElementById("signup").reset();
  clearAllData();
  console.log("Session reset");
}

// ==================== WELCOME MESSAGE & NAME LOGIC ====================
// Clear all cookies and localStorage
function clearAllData() {
  deleteCookie("firstName");
  localStorage.removeItem("patientFormData");
  localStorage.removeItem("lastSaved");
  console.log("All data cleared");
}

// Display welcome message based on cookie
function displayWelcomeMessage() {
  const firstName = getCookie("firstName");
  
  let welcomeMessage = "";
  if (firstName) {
    welcomeMessage = `Welcome back, <strong>${firstName}</strong>!`;
  } else {
    welcomeMessage = `Welcome, <strong>New User</strong>!`;
  }
  
  const welcomeDiv = document.createElement("div");
  welcomeDiv.id = "welcome-message";
  welcomeDiv.style.cssText = "background-color: #d1ecf1; color: #0c5460; padding: 12px; border-radius: 4px; margin-bottom: 10px; border: 1px solid #bee5eb; font-weight: bold; text-align: center;";
  welcomeDiv.innerHTML = welcomeMessage;
  
  const body = document.getElementById("body");
  if (body && !document.getElementById("welcome-message")) {
    body.insertBefore(welcomeDiv, body.firstChild);
  }
}

// Show "Not [Name]?" link for returning users
function displayNewUserLink() {
  const firstName = getCookie("firstName");
  if (!firstName) return;

  const linkDiv = document.createElement("div");
  linkDiv.id = "new-user-link";
  linkDiv.style.cssText = "background-color: #e7f3ff; color: #004085; padding: 10px; border-radius: 4px; margin-bottom: 10px; border: 1px solid #b8daff; text-align: center;";
  linkDiv.innerHTML = `Not <strong>${firstName}</strong>? <a href="javascript:startAsNewUser()" style="color: #0056b3; text-decoration: underline; font-weight: bold;">Click here to start as a new user</a>`;
  
  const body = document.getElementById("body");
  if (body && !document.getElementById("new-user-link")) {
    body.insertBefore(linkDiv, body.firstChild.nextSibling);
  }
}

// Start as new user - clear everything and reset
function startAsNewUser() {
  if (confirm("Are you sure? This will clear all your saved information.")) {
    clearAllData();
    document.getElementById("signup").reset();
    location.reload();
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
  // Display welcome message
  displayWelcomeMessage();
  displayNewUserLink();

  // Start live time update
  updateLiveTime();
  setInterval(updateLiveTime, 1000); // Update every second

  // Check if first name exists and load form data
  const firstName = getCookie("firstName");
  if (firstName) {
    loadFormFromLocalStorage();
    displayLastSaved();
  }

  // Set a cookie to track visits
  let visitCount = getCookie("visitCount");
  visitCount = visitCount ? parseInt(visitCount) + 1 : 1;
  setCookie("visitCount", visitCount, 2); // 2 day expiry
  
  console.log("Total visits: " + visitCount);

  // Initialize auto-save
  initializeAutoSave();

  // Initialize session timeout
  initializeSessionTimeout();

  // Initialize time-based notification
  initializeTimeBasedNotification();

  // Load iframe content
  loadIFrameContent();

  // Load state options via Fetch (safe with try/catch)
  loadStateOptions();

  // Fetch related patient information
  fetchRelatedPatientInfo();

  // Handle first name field change - save to cookie
  const firstNameInput = document.getElementById("first_name");
  if (firstNameInput) {
    firstNameInput.addEventListener("change", function() {
      if (this.value.trim()) {
        setCookie("firstName", this.value.trim(), 2); // 2 day expiry
        console.log("First name saved to cookie: " + this.value);
        displayNewUserLink(); // Update the link if it was just set
      }
    });
  }

  // Handle Remember Me checkbox
  const rememberMeCheckbox = document.getElementById("remember_me");
  if (rememberMeCheckbox) {
    rememberMeCheckbox.checked = true; // Default to checked
    
    rememberMeCheckbox.addEventListener("change", function() {
      if (!this.checked) {
        // If unchecked, clear all data
        clearAllData();
        document.getElementById("signup").reset();
        console.log("Remember Me unchecked - data cleared");
      } else {
        // If checked, save the form data
        saveFormToLocalStorage();
        console.log("Remember Me checked - data saved");
      }
    });
  }

  // Add event listeners for localStorage saves on field change
  const form = document.getElementById("signup");
  if (form) {
    form.addEventListener("change", function() {
      const rememberMe = document.getElementById("remember_me");
      if (rememberMe && rememberMe.checked) {
        saveFormToLocalStorage();
      }
    });
  }
});
