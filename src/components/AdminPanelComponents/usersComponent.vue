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

const processingInAccept = async (user, orderId, _id) => {
  try {
    await acceptedUser(user, orderId, _id)
  } catch (error) {
    console.log(error)
  }
}
const processingInRefusal = async (user, orderId, _id) => {
  try {
    await refusalUser(user, orderId, _id)
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
        newIdL: {{ user.newId }}
        Имя: {{ user.name }} <br>
        Номер телефона: {{ user.phone }} <br>
        Почта: {{ user.email }} <br>
        <div class="vForBlock" v-for="item in user.instrumentArraySecond">
          <h1>Заказ под номером {{ item.orderId }}</h1>
          Дата нажатия на кнопку "подтвердить заказ": {{ item.dateClick }} <br>
          Время нажатия на кнопку "подтвердить заказ": {{ item.timeClick }} <br>
          Тип доставки: {{ item.deliveryType[0] }} <br>
          Адрес: {{ item.address }} <br>
          Время доставки: {{ item.dayAndTime }} <br>
          <h3>Инструменты пользователя</h3>
          <span v-for="i in item.instrumentArray">
          Название: {{ i.name }} -
          Цена за шт: {{ i.price }} -
          Кол-во шт: {{ i.orderSum }} -
          Общая сумма: {{ i.priceOrder }} -
          <br>
        </span>
          <br>
          Обработка: {{ item.processing }}
          <v-btn @click="processingInAccept(user, item.orderId, item._id)">Добавить в обработку {{ item.orderId }}</v-btn>
          <v-btn @click="processingInRefusal(user, item.orderId, item._id)">Отказать в обработке {{ item.orderId }}</v-btn>
        </div>

      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

.userLi {
  list-style-type: none;
}

</style>
