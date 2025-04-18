const sectionOrder = ["section-welcome", "section-program", "section-details", "section-info", "section-payment"];

function goToSection(sectionId) {
  const allSections = document.querySelectorAll(".section");
  allSections.forEach((section) => section.classList.remove("active"));

  const currentSection = document.getElementById(sectionId);
  currentSection.classList.add("active");
}

function goToNext(currentId) {
  const index = sectionOrder.indexOf(currentId);
  if (index !== -1 && index < sectionOrder.length - 1) {
    if (validateSection(currentId)) {
      const nextId = sectionOrder[index + 1];

      if (nextId === "section-payment") {
        updatePaymentSummary(); // call a dedicated function
      }

      goToSection(nextId);
    }
  } else if (index === sectionOrder.length - 1) {
    document.getElementById("tennisForm").submit();
  }
}

function goToPrevious(currentId) {
  const index = sectionOrder.indexOf(currentId);
  if (index > 0) {
    goToSection(sectionOrder[index - 1]);
  }
}

function togglePolicies(event, elementId) {
  event.preventDefault();
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.toggle("hidden");
  }
}

function showProgramDetails(value) {
  const programSections = document.querySelectorAll(".program-days");
  programSections.forEach((sec) => sec.classList.add("hidden"));

  if (value) {
    document.getElementById(`${value}-days`).classList.remove("hidden");
    const priceText = {
      champions: "1 day: $129 | 2 days: $199 | 3 days: $289 | 4 days: $389",
      peewee: "1 day: $69 | 2 days: $125",
      elite: "1 day: $189 | 2 days: $269 | 3 days: $389 | 4 days: $499",
      academy: "2 days: $329 | 3 days: $469 | 4 days: $599",
    };
    document.getElementById("price-blurb").textContent = priceText[value] || "";
  }
}

function updatePaymentSummary() {
  // Program
  const program = document.getElementById("program");
  const programText = program.options[program.selectedIndex].text;
  document.getElementById("summary-program").textContent = programText || "-";

  // Days Selected
  const visibleDaysSection = document.querySelector(".program-days:not(.hidden)");
  const checkedDays = visibleDaysSection ? visibleDaysSection.querySelectorAll('input[type="checkbox"]:checked') : [];

  const daysSelected = Array.from(checkedDays).map((cb) => cb.value);
  document.getElementById("summary-days").textContent = daysSelected.join(", ") || "-";

  // Total Price (from .price-info under visible section)
  const priceInfo = visibleDaysSection ? visibleDaysSection.querySelector(".price-info").textContent : "";

  let totalPrice = "-";
  if (priceInfo) {
    const matches = priceInfo.match(/\$\d+/g);
    if (matches && daysSelected.length > 0) {
      totalPrice = matches[daysSelected.length - 1];
    }
  }

  document.getElementById("summary-price").textContent = totalPrice;
}

// payment.js
document.getElementById("payment-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const cardNumber = document.getElementById("card-number").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const cvc = document.getElementById("cvc").value;
  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const saveCard = document.getElementById("save-card").checked;

  // Handle form submission (this is where Stripe API integration goes)
  console.log("Card Number:", cardNumber);
  console.log("Expiry Date:", expiryDate);
  console.log("CVC:", cvc);
  console.log("Full Name:", fullName);
  console.log("Email:", email);
  console.log("Save Card:", saveCard);

  // Redirect to a confirmation page (for example)
  window.location.href = "payment-confirmation.html";
});

if (sectionOrder[index + 1] === "section-payment") {
  // Program
  const program = document.getElementById("program").value;
  document.getElementById("summary-program").textContent = program || "-";

  // Days
  const dayCheckboxes = document.querySelectorAll('.program-days input[type="checkbox"]:checked');
  const daysSelected = Array.from(dayCheckboxes).map((cb) => cb.value);
  document.getElementById("summary-days").textContent = daysSelected.join(", ") || "-";

  // Pricing logic
  let priceText = document.getElementById("price-blurb").textContent;
  let total = "N/A";

  const numDays = daysSelected.length;

  if (program && numDays > 0) {
    const priceMatch = priceText.match(/\$\d+/g);
    if (priceMatch && priceMatch[numDays - 1]) {
      total = priceMatch[numDays - 1];
    }
  }

  document.getElementById("summary-price").textContent = total;
}

if (!cardNumber.match(/^\d{4} \d{4} \d{4} \d{4}$/)) {
  document.getElementById("card-number").style.border = "1px solid red";
}

// Optional: Handle "Save Card" button separately if you want it to function differently
document.getElementById("save-card-button").addEventListener("click", function () {
  alert("Your card information will be saved.");
  // Handle the saving logic (for future integration with Stripe or backend)
});

// Function to validate the form sections including card information
function validateSection(sectionId) {
  let isValid = true;

  switch (sectionId) {
    case "section-welcome":
      const checkbox = document.querySelector('input[type="checkbox"]:checked');
      if (!checkbox) {
        alert("You must agree to the policies before continuing.");
        isValid = false;
      }
      break;

    case "section-program":
      const programSelect = document.getElementById("program");
      if (!programSelect.value) {
        alert("Please select a program.");
        isValid = false;
      }
      break;

    case "section-details":
      const programDays = document.querySelectorAll('.program-days input[type="checkbox"]:checked');
      if (programDays.length === 0) {
        alert("You must select at least one day for the program.");
        isValid = false;
      }
      break;

    case "section-info":
      const name = document.getElementById("participantName").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const initials = document.getElementById("initials").value;

      if (!name || !phone || !email || !initials) {
        alert("Please fill out all the required fields.");
        isValid = false;
      }
      break;

    case "section-card-info":
      const cardNumber = document.getElementById("card-number").value;
      const expiryDate = document.getElementById("expiry-date").value;
      const cvc = document.getElementById("cvc").value;

      if (!cardNumber || !expiryDate || !cvc) {
        alert("Please fill out your card information.");
        isValid = false;
      }
      break;
  }

  return isValid;
}

// Function to submit payment (Add your actual payment processing logic here)
document.getElementById("tennisForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Validate the entire form before submission
  if (validateSection("section-card-info")) {
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvc = document.getElementById("cvc").value;
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const saveCard = document.getElementById("save-card").checked;

    // Handle the form submission logic (e.g., with Stripe or backend)
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVC:", cvc);
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Save Card:", saveCard);

    // After submission, you can redirect or show confirmation
    window.location.href = "payment-confirmation.html";
  }
});
