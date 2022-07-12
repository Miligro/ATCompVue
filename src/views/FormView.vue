<template>
  <alert-dialog @close="closeAlertDialog" :open="invalidInputAlert">
    <div>
      <div class="row-center">
        <span class="error-icon"> ! </span>
      </div>
      <div class="row-center">
        <h1>Niepoprawne {{ msg }}</h1>
      </div>
      <div class="row-end">
        <button @click="closeAlertDialog">Zamknij</button>
      </div>
    </div>
  </alert-dialog>
  <div class="main" id="main">
    <div class="container">
      <h1>Formularz</h1>
      <hr />
      <form @submit.prevent="onSubmit">
        <div v-for="el in toValid">
          <label for="first-name">{{ el.label }}:</label>
          <input
            type="text"
            name="first-name"
            v-model="el.value"
            :class="{ errorBorder: el.invalid }"
            @blur="el.checkFunction"
          />
          <p class="error-msg" v-if="el.invalid">Niepoprawne imię</p>
        </div>
        <div class="row-end">
          <button>Zapisz</button>
        </div>
      </form>
      <div class="disabled-inputs">
        <input type="text" disabled v-model="dateOfBirth" />
        <input type="text" disabled v-model="gender" />
      </div>
      <FormResult
        v-if="result"
        :result="{
          firstName: toValid.firstName.value,
          lastName: toValid.lastName.value,
          email: toValid.email.value,
          description: toValid.description.value,
          pesel: toValid.pesel.value,
        }"
      ></FormResult>
    </div>
  </div>
</template>

<script>
import {
  checkFunction,
  validatePesel,
  validateInputs,
} from "../scripts/validation.js";
import FormResult from "../components/FormResult.vue";
export default {
  components: {
    FormResult,
  },
  data() {
    return {
      dateOfBirth: "Data urodzenia: ",
      gender: "Płeć: ",
      invalidInputAlert: false,
      msg: "",
      result: false,
      toValid: {
        firstName: {
          label: "imię",
          value: "",
          invalid: false,
          regex: /^[a-zA-Z]+$/,
          checkFunction: this.checkFirstName,
        },
        lastName: {
          label: "nazwisko",
          value: "",
          invalid: false,
          regex: /^[a-zA-Z]+$/,
          checkFunction: this.checkLastName,
        },
        email: {
          label: "email",
          value: "",
          invalid: false,
          regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          checkFunction: this.checkEmail,
        },
        description: {
          label: "opis",
          value: "",
          invalid: false,
          regex: "",
          checkFunction: this.checkDescription,
        },
        pesel: {
          label: "pesel",
          value: "",
          invalid: false,
          checkFunction: this.checkPesel,
        },
      },
    };
  },
  mounted() {
    for (let el in this.toValid) {
      let key = "toValid." + el + ".value";
      this.$watch(key, () => {
        if (el !== "pesel") {
          this.toValid[el].invalid = !checkFunction(
            this.toValid[el].value,
            this.toValid[el].regex
          );
        } else {
          this.toValid[el].invalid = !validatePesel(this.toValid[el].value);
        }
      });
    }
  },
  methods: {
    closeAlertDialog() {
      this.msg = "";
      this.invalidInputAlert = false;
    },
    checkFirstName() {
      this.toValid.firstName.invalid = !checkFunction(
        this.toValid.firstName.value,
        this.toValid.firstName.regex
      );
    },
    checkLastName() {
      this.toValid.lastName.invalid = !checkFunction(
        this.toValid.lastName.value,
        this.toValid.lastName.regex
      );
    },
    checkEmail() {
      this.toValid.email.invalid = !checkFunction(
        this.toValid.email.value,
        this.toValid.email.regex
      );
    },
    checkDescription() {
      this.toValid.description.invalid = !checkFunction(
        this.toValid.description.value,
        this.toValid.description.regex
      );
    },
    checkPesel() {
      this.toValid.pesel.invalid = !validatePesel(this.toValid.pesel.value);
    },
    onSubmit() {
      this.result = false;
      this.msg = validateInputs(this.toValid);
      if (this.msg) {
        this.invalidInputAlert = true;
        return;
      }
      this.getPeselData();
      this.appendData();
    },
    getPeselData() {
      this.dateOfBirth = "";
      const yearTemp = +this.toValid.pesel.value.slice(0, 2);
      let year =
        1900 + yearTemp + Math.floor(+this.toValid.pesel.value[2] / 2) * 100;
      let month = +this.toValid.pesel.value.slice(2, 4);
      month = month % 20;
      const day = this.toValid.pesel.value.slice(4, 6);
      this.dateOfBirth = `Data urodzenia: ${day}-${
        month < 10 ? "0" + month : month
      }-${year}`;

      this.gender = `Płeć: ${
        +this.toValid.pesel.value.slice(9, 10) % 2 == 0
          ? "Kobieta"
          : "Mężczyzna"
      }`;
    },
    appendData() {
      this.result = true;
    },
  },
};
</script>

<style scoped>
form {
  width: 100%;
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
  width: 100%;
}

.error-msg {
  font-size: small;
  color: red;
}
</style>
