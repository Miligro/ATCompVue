<template>
  <alert-dialog @close="closeAlertDialog" :open="invalidInputAlert">
    <div>
      <div class="row-center">
        <span class="error-icon"> ! </span>
      </div>
      <div class="row-center">
        <h1>{{ msg }}</h1>
      </div>
      <div class="row-end">
        <button @click="closeAlertDialog">Zamknij</button>
      </div>
    </div>
  </alert-dialog>
  <div class="main" id="main">
    <h1>Formularz</h1>
    <hr />
    <form @submit.prevent="onSubmit">
      <label for="first-name">Imię:</label>
      <input
        type="text"
        name="first-name"
        v-model="firstName"
        :class="{ errorBorder: invalidFirstName }"
        @blur="checkFirstName"
      />
      <p class="error-msg" v-if="invalidFirstName">Niepoprawne imię</p>

      <label for="last-name">Nazwisko:</label>
      <input
        type="text"
        name="last-name"
        v-model="lastName"
        :class="{ errorBorder: invalidLastName }"
        @blur="checkLastName"
      />
      <p class="error-msg" v-if="invalidLastName">Niepoprawne nazwisko</p>

      <label for="email">Email:</label>
      <input
        type="email"
        name="email"
        v-model="email"
        :class="{ errorBorder: invalidEmail }"
        @blur="checkEmail"
      />
      <p class="error-msg" v-if="invalidEmail">Niepoprawny email</p>

      <label for="description">Opis:</label>
      <textarea
        name="description"
        v-model="description"
        rows="5"
        :class="{ errorBorder: invalidDescription }"
        @blur="checkDescription"
      ></textarea>
      <p class="error-msg" v-if="invalidDescription">Niepoprawny opis</p>

      <label for="pesel">PESEL:</label>
      <input
        type="text"
        name="pesel"
        v-model="pesel"
        :class="{ errorBorder: invaliPesel }"
        @blur="checkPesel"
      />
      <p class="error-msg" v-if="invaliPesel">Niepoprawny pesel</p>
      <div class="row-end">
        <button>Zapisz</button>
      </div>
    </form>
    <div class="disabled-inputs">
      <input type="text" disabled v-model="dateOfBirth" />
      <input type="text" disabled v-model="gender" />
    </div>
  </div>
</template>

<script>
import { checkFunction, validatePesel } from "../scripts/validation.js";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      description: "",
      pesel: "",
      invalidFirstName: false,
      invalidLastName: false,
      invalidEmail: false,
      invalidDescription: false,
      invaliPesel: false,
      dateOfBirth: "Data urodzenia: ",
      gender: "Płeć: ",
      invalidInputAlert: false,
      msg: "",
    };
  },
  watch: {
    firstName() {
      this.invalidFirstName = !checkFunction(this.firstName, /^[a-zA-Z]+$/);
    },
    lastName() {
      this.invalidLastName = !checkFunction(this.lastName, /^[a-zA-Z]+$/);
    },
    email() {
      this.invalidEmail = !checkFunction(
        this.email,
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      );
    },
    description() {
      this.invalidDescription = !checkFunction(this.description, "");
    },
    pesel() {
      this.invaliPesel = !validatePesel(this.pesel);
    },
  },
  methods: {
    closeAlertDialog() {
      this.msg = "";
      this.invalidInputAlert = false;
    },
    checkFirstName() {
      this.invalidFirstName = !checkFunction(this.firstName, /^[a-zA-Z]+$/);
    },
    checkLastName() {
      this.invalidLastName = !checkFunction(this.lastName, /^[a-zA-Z]+$/);
    },
    checkEmail() {
      this.invalidEmail = !checkFunction(
        this.email,
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      );
    },
    checkDescription() {
      this.invalidDescription = !checkFunction(this.description, "");
    },
    checkPesel() {
      this.invaliPesel = !validatePesel(this.pesel);
    },
    onSubmit() {
      if (!this.firstName.trim() || this.invalidFirstName) {
        console.log("sds");
        this.msg = "Niepoprawne imie!";
      } else if (!this.lastName.trim() || this.invalidLastName) {
        this.msg = "Niepoprawne nazwisko!";
      } else if (!this.email.trim() || this.invalidEmail) {
        this.msg = "Niepoprawny email!";
      } else if (!this.description.trim() || this.invalidDescription) {
        this.msg = "Niepoprawny opis!";
      } else if (!this.pesel.trim() || this.invaliPesel) {
        this.msg = "Niepoprawny pesel!";
      }
      if (this.msg) {
        this.invalidInputAlert = true;
        return;
      }

      const elem = document.getElementById("data");
      if (elem) {
        elem.remove();
      }

      this.getPeselData();
      this.appendData();
    },
    getPeselData() {
      this.dateOfBirth = "";
      const yearTemp = +this.pesel.slice(0, 2);
      let year = 1900 + yearTemp + Math.floor(+this.pesel[2] / 2) * 100;
      let month = +this.pesel.slice(2, 4);
      month = month % 20;
      const day = this.pesel.slice(4, 6);
      this.dateOfBirth = `Data urodzenia: ${day}-${
        month < 10 ? "0" + month : month
      }-${year}`;

      this.gender = `Płeć: ${
        +this.pesel.slice(9, 10) % 2 == 0 ? "Kobieta" : "Mężczyzna"
      }`;
    },
    appendData() {
      const el = document.createElement("div");
      el.setAttribute("id", "data");

      const firstNameEl = document.createElement("p");
      firstNameEl.innerText = `Imię: ${this.firstName}`;
      const lastNameEl = document.createElement("p");
      lastNameEl.innerText = `Nazwisko: ${this.lastName}`;
      const emailEl = document.createElement("p");
      emailEl.innerText = `Email: ${this.email}`;
      const descriptionEl = document.createElement("p");
      descriptionEl.innerText = `Opis: ${this.description}`;
      const peselEl = document.createElement("p");
      peselEl.innerText = `PESEL: ${this.pesel}`;
      el.appendChild(firstNameEl);
      el.appendChild(lastNameEl);
      el.appendChild(emailEl);
      el.appendChild(descriptionEl);
      el.appendChild(peselEl);

      const mainEl = document.getElementById("main");
      mainEl.appendChild(el);
    },
  },
};
</script>

<style scoped>
.main {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form {
  width: 30%;
}

label {
  margin-top: 5px;
  display: block;
}

textarea {
  margin-top: 5px;
  padding: 5px;
  width: 100%;
  display: block;
}

input {
  padding: 5px;
  margin-top: 8px;
  display: block;
  width: 100%;
}

.errorBorder {
  border: 1px solid red;
}

.disabled-inputs {
  width: 30%;
}

.error-msg {
  font-size: small;
  color: red;
}
</style>
