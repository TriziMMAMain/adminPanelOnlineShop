<script setup="">
import {onMounted, ref} from 'vue'
import interceptors  from '../../api.js';
import {ProccesingSuccessfuly, ProcessingError} from '../../notification/toasting.js'
import {useUsersStore} from '../../stores/counter.js'
// Получаем пользователей
const { fetchingUsers, acceptedUser, refusalUser } = useUsersStore()


let users = ref([])


onMounted(async () => {
  if (await fetchingUsers()) {
    users.value = JSON.parse(localStorage.getItem("users"))
  }
})

const processingInAccept = async (user) => {
  try {
    await acceptedUser(user)
    ProccesingSuccessfuly('Обработка успешна')
  } catch (error) {
    ProcessingError(`Ошибка: ${error}`)
    console.log(error)
  }
}

const processingInRefusal = async (user) => {
  try {
    await refusalUser(user)
    ProccesingSuccessfuly('Обработка успешна')
  } catch (error) {
    ProcessingError(`Ошибка: ${error}`)
    console.log(error)
  }
}

</script>

<template>
  <div>
    <h2>Пользователи которые выбрали товар</h2>
    <ul>
      <li class="userLi"
          v-for="user in users" :key="user._id">
        <br>
        <v-divider
            :thickness="4"
            class="border-opacity-25"
            color="primary"
        ></v-divider>
        <br>
        ID: {{ user._id }} <br>
        Имя: {{ user.name }} <br>
        Номер телефона: {{ user.phone }} <br>
        Почта: {{ user.email }} <br>
        Дата нажатия на кнопку "подтвердить заказ": {{ user.dateClick }} <br>
        Время нажатия на кнопку "подтвердить заказ": {{ user.timeClick }} <br>
        Тип доставки: {{ user.deliveryType[0] }} <br>
        Адрес: {{ user.address }} <br>
        Время доставки: {{ user.dayAndTime }} <br>
        <h3>Инструменты пользователя</h3>
        <span v-for="i in user.instrumentArray">
          Название: {{ i.name }} -
          Цена за шт: {{ i.price }} -
          Кол-во шт: {{ i.orderSum }} -
          Общая сумма: {{ i.priceOrder }} -
          <br>
        </span>
        <br>
        Обработка: {{ user.processing }}
        <v-btn @click="processingInAccept(user)">Добавить в обработку {{ user.newId }}</v-btn>
        <v-btn @click="processingInRefusal(user)">Отказать в обработке {{ user.newId }}</v-btn>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

.userLi {
  list-style-type: none;
}

</style>
