<template>
  <div id="main" class="main">
    <div class="container">
      <div class="row-center">
        <h1>Formularz</h1>
      </div>
      <div class="row-center">
        <hr />
      </div>
      <form @submit.prevent="onSubmit">
        <div v-for="(el, name) in toValid" :key="name">
          <label :for="name">{{ el.label }}:</label>
          <input
            v-model="el.value"
            :type="el.type"
            :name="name"
            :class="{ errorBorder: el.invalid }"
            @blur="el.checkFun(el)"
          />
          <p v-if="el.invalid" class="error-msg">Niepoprawna wartość {{ el.label }}</p>
        </div>
        <div class="row-end">
          <button>Zapisz</button>
        </div>
      </form>
      <div class="disabled-inputs">
        <input type="text" disabled :value="dateOfBirth ? `Data urodzenia: ${dateOfBirth}` : ''" />
        <input type="text" disabled :value="gender ? `Płeć: ${gender}` : ''" />
      </div>
      <FormResult v-if="result" :result="result" />
    </div>
  </div>
</template>

<script>
import { checkFunction, validatePesel, validateInputs } from '../scripts/validation.js'
import FormResult from '../components/FormResult.vue'
import { useDialogStore } from '../stores/dialog.js'
export default {
  components: {
    FormResult,
  },
  data() {
    return {
      dateOfBirth: null,
      gender: null,
      dialogStore: useDialogStore(),
      result: false,
      toValid: {
        firstName: {
          label: 'Imię',
          value: '',
          invalid: false,
          regex: /^[a-zA-Z]+$/,
          type: 'text',
          checkFun: this.checkInput,
        },
        lastName: {
          label: 'Nazwisko',
          value: '',
          invalid: false,
          regex: /^[a-zA-Z]+$/,
          type: 'text',
          checkFun: this.checkInput,
        },
        email: {
          label: 'Email',
          value: '',
          invalid: false,
          regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          type: 'email',
          checkFun: this.checkInput,
        },
        description: {
          label: 'Opis',
          value: '',
          invalid: false,
          regex: '',
          type: 'text',
          checkFun: this.checkInput,
        },
        pesel: {
          label: 'PESEL',
          value: '',
          invalid: false,
          type: 'text',
          checkFun: this.checkPesel,
        },
      },
    }
  },
  mounted() {
    for (const el in this.toValid) {
      let key = 'toValid.' + el + '.value'
      this.$watch(key, () => {
        this.toValid[el].checkFun(this.toValid[el])
      })
    }
  },
  methods: {
    checkInput(el) {
      el.invalid = !checkFunction(el.value, el.regex)
    },
    checkPesel(el) {
      el.invalid = !validatePesel(el.value)
    },
    onSubmit() {
      this.result = false
      this.msg = validateInputs(this.toValid)
      if (this.msg) {
        this.msg = 'Niepoprawna wartość: ' + this.msg
        this.dialogStore.setInformationDialog(this.msg, 'fa-solid fa-exclamation', 'error-icon')
        return
      }
      this.getPeselData()
      this.appendData()
    },
    getPeselData() {
      this.dateOfBirth = null
      const yearTemp = +this.toValid.pesel.value.slice(0, 2)
      let year = 1900 + yearTemp + Math.floor(+this.toValid.pesel.value[2] / 2) * 100
      let month = +this.toValid.pesel.value.slice(2, 4)
      month = month % 20
      const day = this.toValid.pesel.value.slice(4, 6)
      this.dateOfBirth = `${day}-${month < 10 ? '0' + month : month}-${year}`

      this.gender = +this.toValid.pesel.value.slice(9, 10) % 2 == 0 ? 'Kobieta' : 'Mężczyzna'
    },
    appendData() {
      const data = this.toValid
      this.result = {
        [data.firstName.label]: data.firstName.value,
        [data.lastName.label]: data.lastName.value,
        [data.email.label]: data.email.value,
        [data.description.label]: data.description.value,
        [data.pesel.label]: data.pesel.value,
      }
    },
  },
}
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

input.errorBorder:focus {
  outline: 1px solid red;
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
