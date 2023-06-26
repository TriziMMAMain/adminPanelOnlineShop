<script setup="">
import {onMounted, ref} from 'vue'
import {useUsersStore} from '../stores/counter.js'
import UsersComponent from '../components/AdminPanelComponents/usersComponent.vue'
import InstrumentComponent from '../components/AdminPanelComponents/instrumentComponent.vue'
import UpdateInstrument from '../components/AdminPanelComponents/updateInstrument.vue'
import FetchingInstrumentById from '../components/AdminPanelComponents/fetchingInstrumentById.vue'
import {FailLogin, ProccesingSuccessfuly, SuccesfullLogin} from '../notification/toasting.js'

const {filterAdminUser, visitsInSite, filterId} = useUsersStore()

const tab = ref('four')
// form
onMounted(async () => {
  await visitsInSite()
  await filterId()
})
const trueOrFalse = JSON.parse(localStorage.getItem("userInAdmin"))
const trueOrFalseForm = JSON.parse(localStorage.getItem("formInAdmin"))
const username = ref('')
const password = ref('')
const login = async () => {
  await filterAdminUser(username.value, password.value)
}
//

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
    <v-tabs
        v-model="tab"
        bg-color="primary"
        class="mb-10"
    >
      <v-tab value="one">Пользователи</v-tab>
      <v-tab value="two">Добавить инструмент</v-tab>
      <v-tab value="three">Обновить инструмент</v-tab>
      <v-tab value="four">Узнать инструмент по ID</v-tab>
    </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="one">
          <UsersComponent></UsersComponent>
        </v-window-item>

        <v-window-item value="two">
          <InstrumentComponent></InstrumentComponent>
        </v-window-item>

        <v-window-item value="three">
          <UpdateInstrument></UpdateInstrument>
        </v-window-item>
        <v-window-item value="four">
          <FetchingInstrumentById></FetchingInstrumentById>
        </v-window-item>
      </v-window>

  </div>

</template>

<style lang="scss" scoped>

</style>
