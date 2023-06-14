<script setup="">
import {ref} from 'vue'
import {useUsersStore} from '../stores/counter.js'
import UsersComponent from '../components/AdminPanelComponents/usersComponent.vue'
import InstrumentComponent from '../components/AdminPanelComponents/instrumentComponent.vue'
import {FailLogin, ProccesingSuccessfuly, SuccesfullLogin} from '../notification/toasting.js'

const {filterAdminUser} = useUsersStore()

localStorage.setItem("userInAdmin", JSON.stringify(false))
localStorage.setItem("formInAdmin", JSON.stringify(true))
const trueOrFalse = JSON.parse(localStorage.getItem("userInAdmin"))
const trueOrFalseForm = JSON.parse(localStorage.getItem("formInAdmin"))


const username = ref('')
const password = ref('')

const login = async () => {
  await filterAdminUser(username.value, password.value)
}

const componentCheck = ref(['Пользователей'])
const trueOrFalseUsers = ref(false)
const trueOrFalseInstrument = ref(true)
const clickCounter = ref(0)
const clickInCheck = () => {
  clickCounter.value = clickCounter.value + 1
  if (clickCounter.value % 2 === 0) {
    componentCheck.value[0] = 'Пользователей'
  } else {
    componentCheck.value[0] = 'Инструмент'
  }
  if (componentCheck.value[0] === 'Пользователей') {
    ProccesingSuccessfuly('Вкладка пользователи')
    trueOrFalseUsers.value = true
    trueOrFalseInstrument.value = false
  } else if (componentCheck.value[0] === 'Инструмент') {
    ProccesingSuccessfuly('Вкладка инструмент')
    trueOrFalseUsers.value = false
    trueOrFalseInstrument.value = true
  }
}

</script>

<template>
  <div class="form-container"
       v-if="trueOrFalseForm">
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <v-btn type="submit">Login</v-btn>
    </form>
  </div>
  <div class="blockTrueOrFalse"
       v-else>
    <v-btn @click="clickInCheck()">Показать: {{ componentCheck[0] }}</v-btn>
    <div class="blockUsersOrInstrument">
      <UsersComponent v-if="trueOrFalseUsers"></UsersComponent>
      <InstrumentComponent v-if="trueOrFalseInstrument"></InstrumentComponent>
    </div>

  </div>

</template>

<style lang="scss" scoped>

</style>
