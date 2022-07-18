<template>
  <div class="main">
    <div class="container">
      <div class="row-center">
        <h1>Rejestracja</h1>
      </div>
      <div class="row-center">
        <hr />
      </div>
      <form @submit.prevent="register">
        <div v-for="elem in Object.keys(toValid)" :key="elem">
          <label :for="elem">{{ toValid[elem].label }} </label>
          <input
            v-model="toValid[elem].value"
            :type="toValid[elem].type"
            :name="elem"
            :class="{ errorBorder: toValid[elem].invalid }"
            required
            @blur="checkInput(toValid[elem])"
          />
          <div
            v-if="elem === 'password'"
            :class="{
              'password-msg': true,
              'error-msg': toValid[elem].invalid,
            }"
          >
            <p>Hasło powinno zawierać:</p>
            <ul>
              <li>Co najmniej 8 znaków</li>
              <li>Co najmniej 1 wielką literę</li>
              <li>Co najmniej 1 znak specjalny</li>
              <li>Co najmniej 1 cyfrę</li>
            </ul>
          </div>
          <p v-else-if="toValid[elem].invalid" class="error-msg">
            Proszę podać {{ toValid[elem].label }}
          </p>
        </div>
        <div class="row-end">
          <button type="submit" :disabled="isDisabled">Zarejestruj</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { checkFunction, validateInputs } from '../../scripts/validation'
import { useDialogStore } from '../../stores/dialog'
export default {
  data() {
    return {
      isDisabled: false,
      dialogStore: useDialogStore(),
      toValid: {
        login: {
          label: 'Login',
          value: '',
          invalid: false,
          regex: /^.{6,}$/,
          type: 'text',
        },
        email: {
          label: 'Email',
          value: '',
          invalid: false,
          regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          type: 'text',
        },
        password: {
          label: 'Hasło',
          value: '',
          invalid: false,
          regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          type: 'password',
        },
        repeatedPassword: {
          label: 'Powtórz Hasło',
          value: '',
          invalid: false,
          regex: '',
          type: 'password',
        },
      },
    }
  },
  methods: {
    register() {
      const resValidation = validateInputs(this.toValid)
      if (resValidation) {
        this.dialogStore.setInformationDialog(
          `Podano niepoprawną wartość: ${resValidation}`,
          'fa-solid fa-exclamation',
          'error-icon'
        )
        return
      } else if (this.toValid.password.value !== this.toValid.repeatedPassword.value) {
        this.dialogStore.setInformationDialog(
          `Podane hasła nie są takie same`,
          'fa-solid fa-exclamation',
          'error-icon'
        )
        return
      }
      console.log('rejestrowanie')
      // rejestracja
    },

    checkInput(el) {
      el.invalid = !checkFunction(el.value, el.regex)
      this.isDisabled = el.invalid
    },
  },
}
</script>

<style scoped>
form {
  width: 100%;
}

label {
  margin-top: 10px;
  display: block;
}

ul {
  list-style-position: inside;
}

textarea {
  margin-top: 5px;
  padding: 5px;
  width: 100%;
  display: block;
}

input {
  padding: 8px;
  margin-top: 8px;
  display: block;
  width: 100%;
  border: none;
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

.password-msg {
  font-size: small;
}

button:disabled {
  background-color: rgb(170, 170, 170);
  color: gray;
}

button {
  color: white;
  padding: 8px;
  font-size: 16px;
  margin-top: 15px;
}

label {
  font-weight: bold;
}
</style>
