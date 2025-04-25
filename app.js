function goToSection(sectionId) {
  const allSections = document.querySelectorAll(".section, #section-payment, #section-registration-information");
  allSections.forEach((section) => section.classList.add("hidden"));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
  }

  if (sectionId === "section-payment") {
    updatePaymentSummary();
  }
}

function showFullForm() {
  document.getElementById("section-payment").classList.add("hidden");
  document.getElementById("section-registration-information").classList.remove("hidden");

  // Only re-show sections user already completed
  const programSelected = document.getElementById("program").value;
  if (programSelected) {
    document.getElementById("section-details").classList.remove("hidden");
  }

  const anyDaySelected = Array.from(document.querySelectorAll('.program-days input[type="checkbox"]:checked')).some((cb) => cb.checked);
  if (anyDaySelected) {
    document.getElementById("section-info").classList.remove("hidden");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Program selection
document.getElementById("program").addEventListener("change", function () {
  const program = this.value;
  if (!program) return;

  document.getElementById("section-details").classList.remove("hidden");
  showProgramDetails(program);
});

// Show participant info once a day is checked
document.querySelectorAll('.program-days input[type="checkbox"]').forEach((cb) => {
  cb.addEventListener("change", () => {
    const anyDaySelected = Array.from(document.querySelectorAll('.program-days input[type="checkbox"]:checked')).length > 0;
    const infoSection = document.getElementById("section-info");

    if (anyDaySelected) {
      infoSection.classList.remove("hidden");
    } else {
      infoSection.classList.add("hidden");
      document.getElementById("checkout-button")?.classList.add("hidden");
    }
  });
});

// Enable checkout button once all participant fields are filled
document.getElementById("section-info").addEventListener("input", () => {
  const fields = ["firstName", "lastName", "phone", "responsibleParty", "email"];
  const allFilled = fields.every((id) => document.getElementById(id)?.value.trim() !== "");
  const agreed = document.querySelector("#section-info input[type='checkbox']")?.checked;

  if (allFilled && agreed) {
    document.getElementById("checkout-button")?.classList.remove("hidden");
  }
});

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
    document.getElementById(`${value}-days`)?.classList.remove("hidden");
    const priceText = {
      champions: "1 day: $129 | 2 days: $199 | 3 days: $289 | 4 days: $389",
      peewee: "1 day: $69 | 2 days: $125",
      elite: "1 day: $189 | 2 days: $269 | 3 days: $389 | 4 days: $499",
      academy: "2 days: $329 | 3 days: $469 | 4 days: $599",
    };
    const priceBlurb = document.getElementById("price-blurb");
    if (priceBlurb) {
      priceBlurb.textContent = priceText[value] || "";
    }
  }
}

function updatePaymentSummary() {
  const program = document.getElementById("program");
  const programText = program?.options[program.selectedIndex]?.text || "-";
  document.getElementById("summary-program").textContent = programText;

  const visibleDaysSection = document.querySelector(".program-days:not(.hidden)");
  const checkedDays = visibleDaysSection ? visibleDaysSection.querySelectorAll('input[type="checkbox"]:checked') : [];
  const daysSelected = Array.from(checkedDays).map((cb) => cb.value);
  document.getElementById("summary-days").textContent = daysSelected.join(", ") || "-";

  const priceInfo = visibleDaysSection ? visibleDaysSection.querySelector(".price-info")?.textContent : "";
  let totalPrice = "-";
  if (priceInfo) {
    const matches = priceInfo.match(/\$\d+/g);
    if (matches && daysSelected.length > 0) {
      totalPrice = matches[daysSelected.length - 1];
    }
  }
  document.getElementById("summary-price").textContent = totalPrice;
}

// Form submission
document.getElementById("tennisForm").addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateSection("section-card-info")) {
    const billingFirstName = document.getElementById("billing-first-name").value.trim();
    const billingLastName = document.getElementById("billing-last-name").value.trim();
    const billingAddress = document.getElementById("billing-address").value.trim();
    const billingCity = document.getElementById("billing-city").value.trim();
    const billingState = document.getElementById("billing-state").value.trim();
    const billingPostal = document.getElementById("billing-postal").value.trim();
    const fullName = document.getElementById("full-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const cvc = document.getElementById("cvc").value.trim();
    const saveCard = document.getElementById("save-card")?.checked || false;

    console.log("Billing First Name:", billingFirstName);
    console.log("Billing Last Name:", billingLastName);
    console.log("Billing Address:", billingAddress);
    console.log("Billing City:", billingCity);
    console.log("Billing State:", billingState);
    console.log("Billing Postal:", billingPostal);
    console.log("Name on Card:", fullName);
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVC:", cvc);
    console.log("Save Card:", saveCard);

    window.location.href = "payment-confirmation.html";
  }
});

// Form Validation
function validateSection(sectionId) {
  let isValid = true;

  if (sectionId === "section-card-info") {
    const billingFields = ["billing-first-name", "billing-last-name", "billing-address", "billing-city", "billing-state", "billing-postal"];

    const cardFields = ["full-name", "card-number", "expiry-date", "cvc"];

    billingFields.forEach((id) => {
      if (!document.getElementById(id)?.value.trim()) {
        isValid = false;
      }
    });

    cardFields.forEach((id) => {
      if (!document.getElementById(id)?.value.trim()) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please complete all billing and card information correctly.");
    }
  }

  return isValid;
}
