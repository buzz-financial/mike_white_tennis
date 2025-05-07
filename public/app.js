const { createApp } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

createApp({
  data() {
    return {
      step: 1,
      programs: [
        { label: "Champions (Age ≤12)", value: "champions" },
        { label: "Pee Wee (Age 5–10)", value: "peewee" },
        { label: "Elite (In/Near High School)", value: "elite" },
        { label: "Academy (Invite Only)", value: "academy" },
      ],
      form: {
        agreePolicies: false,
        program: "",
        days: [],
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        responsibleParty: "",
        agreePolicies: false,
        billingFirstName: "",
        billingLastName: "",
        billingAddress: "",
        billingCity: "",
        billingState: "",
        billingPostal: "",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
      },
      showPolicies: false,
      states: [
        "AL",
        "AK",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
      ],
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        phone: (v) => /^\d{10}$/.test(v.replace(/\D/g, "")) || "Enter a 10-digit phone number",
        zip: (v) => /^\d{5}(-\d{4})?$/.test(v) || "ZIP must be 5 digits",
        cardNumber: (v) => /^\d{13,19}$/.test(v.replace(/\s/g, "")) || "Invalid card number",
        expiry: (v) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v) || "Use MM/YY format",
        cvc: (v) => /^\d{3,4}$/.test(v) || "CVC must be 3 or 4 digits",
      },
    };
  },
  computed: {
    programDays() {
      const daysByProgram = {
        champions: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        peewee: ["Monday", "Wednesday"],
        elite: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        academy: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      };
      return daysByProgram[this.form.program] || [];
    },
    priceInfo() {
      const priceMap = {
        champions: [129, 199, 289, 389],
        peewee: [69, 125],
        elite: [189, 269, 389, 499],
        academy: [0, 329, 469, 599], // 2-4 days only
      };
      const count = this.form.days.length;
      const prices = priceMap[this.form.program] || [];
      return prices[count - 1] ? `Total: $${prices[count - 1]}` : "Select valid number of days.";
    },
  },
  methods: {
    toggleDay(day) {
      const index = this.form.days.indexOf(day);
      if (index === -1) {
        this.form.days.push(day);
      } else {
        this.form.days.splice(index, 1);
      }
    },

    submitForm() {
      alert("Processing payment for: " + this.form.billingFirstName + " " + this.form.billingLastName);
    },
  },
})
  .use(vuetify)
  .mount("#app");
