<script setup="">
import {onMounted, ref} from 'vue'
import axios from "axios";
import {useUsersStore} from '../../stores/counter.js'
import {ProccesingSuccessfuly, ProcessingError} from "../../notification/toasting";

const {fetchingInstrumentType, fetchingInstrumentTypeThis, filterId, patchInstrument, filterNameById} = useUsersStore()

// Counter True or False
const counterTrueOrFalse = ref(true)
const counterClickBtnPush = ref(0)
// Object
const toolObject = ref({})
const productsFilterType = ref([])
// _ID
const vAutocompleteIdArray = ref([])
const vAutocompleteIdText = ref([])
const vAutocompleteIdTextSecond = ref([])
const vAutocompleteIdTextThird = ref('')
//
const vBtnOpenAndClose = ref(false)
const vBtnOpenAndCloseSecond = ref(false)

const filterNameByIdMain = async (_id) => {
  if (await filterNameById(_id)) {
    vAutocompleteIdTextThird.value = JSON.parse(localStorage.getItem("name_instrument_filtered_by_id"))
  }
}
const openAndCloseFeature = () => {
  vBtnOpenAndClose.value = !vBtnOpenAndClose.value
}
const openAndCloseImg = () => {
  vBtnOpenAndCloseSecond.value = !vBtnOpenAndCloseSecond.value
}

const funcOnMounted = async () => {
  vAutocompleteIdArray.value = JSON.parse(localStorage.getItem("_id"))
}
funcOnMounted()
</script>

<template>

  <div class="titleBlock">
    <h1>Выберите ID инструмента который хотите изменить!!!</h1>

    <v-autocomplete
        label="Выберите ID для того чтобы узнать название инструмента"
        v-model="vAutocompleteIdTextSecond"
        clearable
        focused
        :items="vAutocompleteIdArray"
        variant="underlined"
        @update:search="filterNameByIdMain(vAutocompleteIdTextSecond)"
    ></v-autocomplete>
    <br>

  </div>

  <div class="instrument" v-for="item in [vAutocompleteIdTextThird]">
    <h2 class="title">Название: {{ item.name }}</h2>
    <p class="text">ID для поиска: {{ item.id }}</p>
    <p class="text">Тип: {{ item.type }}</p>
    <p class="text">Подкатегория: {{ item.typeThis }}</p>
    <p class="text">Brand: {{ item.brand }}</p>
    <p class="text">Заголовок характеристик: {{ item.featureTop }}</p>
    <br>
    <v-btn @click="openAndCloseFeature()"
    >Показать характеристики
    </v-btn>
    <div v-if="vBtnOpenAndClose">
      <br>
      <h2 class="text">Характеристики макс 6</h2>
      <ul>
        <li v-for="i in item.featureTopTitle">{{ i.featureTopTitleInfoTitle }} --- {{ i.featureTopTitleInfoText }}</li>
      </ul>
      <br>
      <h2 class="text">Характеристики аппарата ---</h2>
      <ul>
        <li v-for="i in item.featureMiddle">{{ i.feature }} {{ i.featureValue }}</li>
      </ul>
      <br>
      <h2 class="text">Преимущества аппарата ---</h2>
      <ul>
        <li v-for="i in item.featureDownArray">{{ i.featureDown }}</li>
      </ul>
      <br>
    </div>
    <br>
    <br>
    <p class="text">Кол-во на складе: {{ item.availability }}</p>
    <p class="text">Ссылка на главное фото: {{ item.imgTitle }}</p>
    <br>
    <v-btn @click="openAndCloseImg()">Показать все фото</v-btn>
    <div v-if="vBtnOpenAndCloseSecond">
      <br>
      <h2 class="text">Все фото</h2>
      <ul>
        <li v-for="i in item.imgArray">{{ i.src }}</li>
      </ul>
      <br>
    </div>
    <br>
    <br>

    <p class="text">Цена за шт: {{ item.price }}</p>
    <p class="text">Родина бренда: {{ item.homeOfTheBrand }}</p>
    <p class="text">Страна производитель: {{ item.countryOfOrigin }}</p>
    <h2 class="text">Комплектация:</h2>
    <ul>
      <li v-for="i in item.equipmentArray">{{ i }}</li>
    </ul>
  </div>


</template>

<style lang="scss" scoped>

</style>