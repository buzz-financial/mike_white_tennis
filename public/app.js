const sectionOrder = [
    'section-welcome',
    'section-program',
    'section-details',
    'section-info'
  ];

  function goToSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
  }

  function goToNext(currentId) {
    const index = sectionOrder.indexOf(currentId);
    if (index !== -1 && index < sectionOrder.length - 1) {
      if (validateSection(currentId)) {
        goToSection(sectionOrder[index + 1]);
      }
    }
  }

  function goToPrevious(currentId) {
    const index = sectionOrder.indexOf(currentId);
    if (index > 0) {
      goToSection(sectionOrder[index - 1]);
    }
  }

  function validateSection(sectionId) {
    let isValid = true;

    switch (sectionId) {
      case 'section-welcome':
        const checkbox = document.querySelector('input[type="checkbox"]:checked');
        if (!checkbox) {
          alert("You must agree to the policies before continuing.");
          isValid = false;
        }
        break;

      case 'section-program':
        const programSelect = document.getElementById("program");
        if (!programSelect.value) {
          alert("Please select a program.");
          isValid = false;
        }
        break;

      case 'section-details':
        const programDays = document.querySelectorAll('.program-days input[type="checkbox"]:checked');
        if (programDays.length === 0) {
          alert("You must select at least one day for the program.");
          isValid = false;
        }
        break;

      case 'section-info':
        const name = document.getElementById("participantName").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const initials = document.getElementById("initials").value;

        if (!name || !phone || !email || !initials) {
          alert("Please fill out all the required fields.");
          isValid = false;
        }
        break;
    }

    return isValid;
  }

  function togglePolicies(event) {
    event.preventDefault(); // prevent link navigation
    const policiesText = document.getElementById("policies-text");
    policiesText.classList.toggle("hidden");
  }

  function showProgramDetails(value) {
    const programSections = document.querySelectorAll(".program-days");
    programSections.forEach(sec => sec.classList.add("hidden"));

    if (value) {
      document.getElementById(`${value}-days`).classList.remove("hidden");
      const priceText = {
        champions: "1 day: $129 | 2 days: $199 | 3 days: $289 | 4 days: $389",
        peewee: "1 day: $69 | 2 days: $125",
        elite: "1 day: $189 | 2 days: $269 | 3 days: $389 | 4 days: $499",
        academy: "2 days: $329 | 3 days: $469 | 4 days: $599"
      };
      document.getElementById("price-blurb").textContent = priceText[value] || '';
    }
  }