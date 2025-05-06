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
