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
// Type
const vSelectType = ref('')
const vSelectTypeArray = ref(['Аккумуляторный инструмент', 'Бензоинструмент', 'Сетевой инструмент', 'Пневмоинструмент'])
// TypeThis
const vSelectTypeThis = ref('')
const vSelectTypeThisArray = ref([])
//
// Brand
const vSelectBrand = ref('')
const vSelectBrandArray = ref(['ADA', 'AEG', 'AL-CO', 'ALUMET', 'AT-S', 'AURORA', 'AV Steel', 'Baumesser',
  'Benetech', 'BIRMIX', 'Black mask', 'BOHRER', 'Bosch', 'BRAIT', 'BRIMA', 'CANDAN', 'CARVER', 'CARVER HOBBY', 'CHAMPION',
  'CONCORDE', 'DAEWOO', 'DAMAN', 'DEKO', 'DEKO ', 'DENZEL', 'DeWalt', 'Distar', 'DON', 'DREAM CAR', 'DWT', 'EDGE', 'EDON', 'EGA',
  'Einhell', 'ELECTROLITE', 'ELEGANT', 'ELITECH', 'ELTI', 'FAVORITE', 'Feelisatti', 'FELLER', 'FERM', 'FORTE', 'Forza',
  'FoxWeld', 'FUBAG', 'Garage', 'General', 'GIGANT', 'Gigant Grad', 'Graff/Termit', 'GROSS', 'Grunda PROline', 'HANSKONNER',
  'Hardax', 'HARDEN', 'HiTACHI', 'Htools', 'Husqvarna', 'HUTER', 'Hyundai', 'Hyundai', 'INFORCE', 'IRWIN', 'JET', 'KAISER',
  'KENDE', 'Kraftool', 'KRAUSE', 'KRAUSE', 'KT', 'LIFAN', 'LOM', 'LONCIN', 'LugaAbrasiv', 'Makita', 'Maktec', 'Matrix',
  'MAXWELD', 'Metabo', 'MetalMaster', 'Milwaukee', 'NEETTOOL', 'NGK', 'OASIS', 'Ombra', 'OPTIMA', 'ORIGON', 'P.I.T.',
  'PARTNER', 'PATRIOT', 'PERTNER for Garden', 'PIT', 'PRIORITET', 'PROCRAFT', 'PROFIPOWER', 'PRORAB', 'Rebir', 'Record',
  'Red Chili', 'RedVerg', 'REMEZA', 'Rezer', 'RING', 'RYOBI', 'SEB', 'Semin Roller', 'SIGMA', 'SKOLE', 'SPARTA', 'Spitce',
  'STAIRS', 'STANLEY', 'STATUS', 'Stayer', 'STAYER Prof', 'Steel Core', 'STERN', 'STIHL', 'strong', 'STURM', 'Swissnox',
  'TEXAC', 'TIGARBO', 'TOTAL', 'Trio-Diamond', 'TSS', 'TSUNAMI', 'Tundra', 'Ultra Pro', 'VALKOR', 'VEGA', 'Vertex', 'Verto',
  'Vistec', 'Vodotok', 'Wagner', 'WBR', 'Weildmaster', 'WERT', 'Whirlpower', 'WOMBAT', 'WUFU', 'YAMATO', 'ZUBR', 'АГАТ',
  'АМА', 'Атака', 'Атаман', 'Байкал', 'Беларусь', 'ВЕКТОР', 'ВИТЯЗЬ', 'Высота', 'Гудэл', 'Дружба-2', 'ЕРМАК', 'ЖУК', 'ЗУБР',
  'ИжМаш', 'ИНТЕРСКОЛ', 'КАЛИБР', 'КАРБОН', 'КВТ', 'Китай', 'КРАСНОДАР', 'Кратон', 'Лепсе', 'ЛУГА', 'Люцерна', 'Метеорит',
  'МИНСК', 'МОГИЛЕВ', 'МогилевЛифтМаш', 'Монолит', 'Озон', 'Оптима', 'ПАРМА',
  'ПРАКТИКА', 'ПТК', 'ПЦ-2200', 'Резолюкс', 'Рекорд', 'РЕСАНТА', 'Ростов', 'Ручеек-Технопр', 'Салют',
  'Сварог', 'Сибртех', 'СОЮЗ', 'СТАВР', 'Строймаш', 'СТРОНГ', 'ТАЙГА', 'ТЕХНИК', 'Технониколь', 'Технорез',
  'ТОМСКИЙ', 'УРАЛ', 'УСАДЬБА', 'Фиолент', 'Центроинструмент', 'Чеглок', 'Эксперт', 'ЭЛЕКТРОПРИБОР',
  'Энергопром', 'ЭНКОР', 'ЭШМ', 'Китай'])
// Name
const vTextFieldName = ref('')
// featureTop
const vTextFieldFeatureTop = ref('')
// featureTopTitle
const featureTopTitleArray = ref([])
const featureTopTitleObject = ref({
  featureTopTitleInfoTitle: '',
  featureTopTitleInfoText: ''
})
const vTextFieldFeatureTopTitleInfoTitle = ref('')
const vTextFieldFeatureTopTitleInfoText = ref('')
// featureMiddle
const featureMiddleArray = ref([])
const featureMiddleObject = ref({
  feature: '',
  featureValue: ''
})
const vTextFieldFeatureMiddleFeature = ref('')
const vTextFieldFeatureMiddleFetureValue = ref('')
const vTextFieldFeatureMiddleFeatureArray = ref([])
// featureDown
const featureDownArray = ref([])
const featureDownObject = ref({
  featureDown: ''
})
const vTextFieldFeatureDownFeatureDown = ref('')
// Availability
const vTextFieldAvailability = ref('')
// Img Title
const vTextFieldImgTitle = ref('')
// Img photo array
const photoArray = ref([])
const photoObject = ref({
  src: ''
})
const vTextFieldPhotoText = ref('')
// Price
const vTextFieldPrice = ref('')
// Home of the brand and country
const vTextFieldHomeOfTheBrand = ref('')
const vTextFieldCountryOf = ref('')
// Equipment
const vTextFieldEquipmentArray = ref([])
const vTextFieldEquipment = ref('')


// Axios

const postInBackendType = async () => {
  counterTrueOrFalse.value = false
  if (await fetchingInstrumentType(vSelectType.value)) {
    vSelectTypeThisArray.value = JSON.parse(localStorage.getItem("instrument_type"))
  }
}
// Axios

const filterTypeArray = async (products, instrumentTypeText) => {
  if (await fetchingInstrumentTypeThis(instrumentTypeText)) {
    vTextFieldFeatureMiddleFeatureArray.value = JSON.parse(localStorage.getItem("instrument_type_this"))
  }
}

const pushTitleInfo = () => {
  counterClickBtnPush.value = counterClickBtnPush.value + 1
  if (counterClickBtnPush.value <= 6) {
    const newFeatureTopTitleObject = {
      featureTopTitleInfoTitle: vTextFieldFeatureTopTitleInfoTitle.value + ':',
      featureTopTitleInfoText: vTextFieldFeatureTopTitleInfoText.value,
    };
    featureTopTitleObject.value = newFeatureTopTitleObject;
    featureTopTitleArray.value.push(newFeatureTopTitleObject)
    ProccesingSuccessfuly('Данные успешно загруженны!')
    console.log(`array`, featureTopTitleArray.value)
    vTextFieldFeatureTopTitleInfoTitle.value = ''
    vTextFieldFeatureTopTitleInfoText.value = ''
  } else if (counterClickBtnPush.value >= 7) {
    ProcessingError('Максимальное кол-во строк --- 6')
    console.log(`array`, featureTopTitleArray.value)
  }
}
const deleteTitleInfo = () => {
  featureTopTitleArray.value = []
  console.log(`array`, featureTopTitleArray.value)
  counterClickBtnPush.value = 0
  ProcessingError('Данные успешно удалены!')
}
// FeatureMiddle
const pushFeatureMiddle = () => {
  const newFeatureMiddleObject = {
    feature: vTextFieldFeatureMiddleFeature.value + ':',
    featureValue: vTextFieldFeatureMiddleFetureValue.value,
  };
  featureMiddleArray.value.push(newFeatureMiddleObject);
  ProccesingSuccessfuly('Данные успешно загруженны!')
  console.log(`array`, featureMiddleArray.value);
  vTextFieldFeatureMiddleFeature.value = ''
  vTextFieldFeatureMiddleFetureValue.value = ''
};
const deleterFeatureMiddle = () => {
  featureMiddleArray.value = []
  ProcessingError('Данные успешно удалены!')
  console.log(`array`, featureMiddleArray.value)
}
// FeatureDown
const pushFeatureDown = () => {
  const newFeatureDownObject = {
    featureDown: vTextFieldFeatureDownFeatureDown.value,
  };
  featureDownArray.value.push(newFeatureDownObject);
  ProccesingSuccessfuly('Данные успешно загруженны!')
  console.log(`array`, featureDownArray.value);
  vTextFieldFeatureDownFeatureDown.value = ''
};
const deleterFeatureDown = () => {
  featureDownArray.value = []
  ProcessingError('Данные успешно удалены!')
  console.log(`array`, featureDownArray.value)
}
// Img photo Array
const pushPhotoArray = () => {
  const newPhotoObject = {
    src: vTextFieldPhotoText.value
  };
  photoArray.value.push(newPhotoObject);
  ProccesingSuccessfuly('Фотографии успешно загруженны!')
  console.log(`array: `, photoArray.value);
  vTextFieldPhotoText.value = ''
};
const deletePhotoArray = () => {
  photoArray.value = []
  ProcessingError('Фотографии успешно удалены!')
  console.log(`array`, photoArray.value)
}
// Equipment
const pushEquipmentArray = () => {
  const newPhotoObject = vTextFieldEquipment.value;
  vTextFieldEquipmentArray.value.push(newPhotoObject);
  ProccesingSuccessfuly('Комплектация успешно загруженна!')
  console.log(`array: `, vTextFieldEquipmentArray.value);
  vTextFieldEquipment.value = ''
};
const deleteEquipmentArray = () => {
  vTextFieldEquipmentArray.value = []
  ProcessingError('Комплектация успешно удалена!')
  console.log(`array`, vTextFieldEquipmentArray.value)
}


const submitForm = async () => {
  if (vSelectType.value === "") {
  } else {
    toolObject.value.type = vSelectType.value
  }
  if (vSelectTypeThis.value === "") {
  } else {
    toolObject.value.typeThis = vSelectTypeThis.value
  }
  if (vSelectBrand.value === "") {
  } else {
    toolObject.value.brand = vSelectBrand.value
  }
  if (vTextFieldName.value === "") {
  } else {
    toolObject.value.name = vTextFieldName.value
  }
  if (vTextFieldFeatureTop.value === "") {
  } else {
    toolObject.value.featureTop = vTextFieldFeatureTop.value
  }
  if (featureTopTitleArray.value.length === 0) {
  } else {
    toolObject.value.featureTopTitle = featureTopTitleArray.value
  }
  if (featureMiddleArray.value.length === 0) {
  } else {
    toolObject.value.featureMiddle = featureMiddleArray.value
  }
  if (featureDownArray.value.length === 0) {
  } else {
    toolObject.value.featureDownArray = featureDownArray.value
  }
  if (vTextFieldAvailability.value === "") {
  } else {
    toolObject.value.availability = vTextFieldAvailability.value
  }
  if (vTextFieldImgTitle.value === "") {
  } else {
    toolObject.value.imgTitle = vTextFieldImgTitle.value
  }
  if (photoArray.value.length === 0) {
  } else {
    toolObject.value.imgArray = photoArray.value
  }
  if (vTextFieldPrice.value === "") {
  } else {
    toolObject.value.price = vTextFieldPrice.value
  }
  if (vTextFieldPrice.value === "") {
  } else {
    toolObject.value.priceOrder = vTextFieldPrice.value
  }
  if (vTextFieldEquipmentArray.value.length === 0) {
  } else {
    toolObject.value.equipmentArray = vTextFieldEquipmentArray.value
  }
  if (vTextFieldHomeOfTheBrand.value === "") {
  } else {
    toolObject.value.homeOfTheBrand = vTextFieldHomeOfTheBrand.value
  }
  if (vTextFieldCountryOf.value === "") {
  } else {
    toolObject.value.countryOfOrigin = vTextFieldCountryOf.value
  }

  if (toolObject.value.availability === undefined) {
  } else if (toolObject.value.availability >= 1) {
    toolObject.value.avalibilitySecond = true
  } else {
    toolObject.value.avalibilitySecond = false
  }

  console.log(toolObject.value)
  await patchInstrument(vAutocompleteIdText.value, toolObject.value)

}

const filterNameByIdMain = async (_id) => {
  if (await filterNameById(_id)) {
    vAutocompleteIdTextThird.value = JSON.parse(localStorage.getItem("name_instrument_filtered_by_id"))
  }
}


const funcOnMounted = async () => {
  vAutocompleteIdArray.value = JSON.parse(localStorage.getItem("_id"))
}
funcOnMounted()
</script>

<template>
  <v-form type="submitForm()">
    <div class="titleBlock">
      <h1>Выберите ID инструмента который хотите изменить!!!</h1>
      <v-autocomplete
          label="Выберите ID"
          v-model="vAutocompleteIdText"
          clearable
          focused
          :items="vAutocompleteIdArray"
          variant="underlined"
      ></v-autocomplete>

      <v-autocomplete
          label="Выберите ID для того чтобы узнать название инструмента"
          v-model="vAutocompleteIdTextSecond"
          clearable
          focused
          :items="vAutocompleteIdArray"
          variant="underlined"
          @update:search="filterNameByIdMain(vAutocompleteIdTextSecond)"
      ></v-autocomplete>
      <h4>Вот название инструмента: {{ vAutocompleteIdTextThird.name }}</h4>
      <br>
      <h1>Выберите какие данные хотите поменять</h1>
      <br>
    </div>

    <v-autocomplete
        label="Выберите тип инструмента"
        v-model="vSelectType"
        clearable
        focused
        :items="vSelectTypeArray"
        variant="underlined"
        @update:search="postInBackendType()"
    ></v-autocomplete>
    <v-autocomplete
        label="Выберите категорию инструмента"
        v-model="vSelectTypeThis"
        clearable
        focused
        :items="vSelectTypeThisArray"
        variant="underlined"
        @update:search="filterTypeArray(vSelectTypeThisArray, vSelectTypeThis)"
    ></v-autocomplete>
    <v-autocomplete
        label="Выберите категорию инструмента"
        v-model="vSelectBrand"
        clearable
        focused
        :items='vSelectBrandArray'
        variant="underlined">
    </v-autocomplete>
    <v-text-field v-model="vTextFieldName"
                  clearable
                  label="Название инструмента"
                  variant="underlined"
    />
    <v-textarea v-model="vTextFieldFeatureTop"
                clearable
                label="Введите заголовок, который будет находиться вначале характеристики"
                variant="underlined"/>
    <br>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
              label="Выберите заголовок преимуществ"
              v-model="vTextFieldFeatureTopTitleInfoTitle"
              clearable
              :items='vTextFieldFeatureMiddleFeatureArray'
              variant="underlined"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="vTextFieldFeatureTopTitleInfoText"
                        clearable
                        variant="underlined"
                        label="Значение преимуществ"/>
        </v-col>
      </v-row>
      <div class="actionsVBtn d-flex justify-space-between">
        <v-btn @click="pushTitleInfo()">Добавить эти значения</v-btn>
        <v-btn @click="deleteTitleInfo()">Удалить все значения</v-btn>
      </div>
      <v-row>
        <v-col>
          <p class="textVTextFieldFeatureTop" v-for="i in featureTopTitleArray">{{ i.featureTopTitleInfoTitle }}
            {{ i.featureTopTitleInfoText }}</p>
        </v-col>
      </v-row>


    </v-container>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
              label="Выберите заголовок характеристик"
              v-model="vTextFieldFeatureMiddleFeature"
              clearable
              :items='vTextFieldFeatureMiddleFeatureArray'
              variant="underlined"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="vTextFieldFeatureMiddleFetureValue"
                        clearable
                        variant="underlined"
                        label="Значение характеристики"/>
        </v-col>
      </v-row>
      <div class="actionsVBtn d-flex justify-space-between">
        <v-btn @click="pushFeatureMiddle()">Добавить эти значения</v-btn>
        <v-btn @click="deleterFeatureMiddle()">Удалить все значения</v-btn>
      </div>
      <v-row>
        <v-col>
          <p class="textVTextFieldFeatureTop" v-for="i in featureMiddleArray">{{ i.feature }} {{ i.featureValue }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="vTextFieldFeatureDownFeatureDown"
                        clearable
                        variant="underlined"
                        label="Заголовок преимуществ"/>
        </v-col>
      </v-row>
      <div class="actionsVBtn d-flex justify-space-between">
        <v-btn @click="pushFeatureDown()">Добавить эти значения</v-btn>
        <v-btn @click="deleterFeatureDown()">Удалить все значения</v-btn>
      </div>
      <v-row>
        <v-col>
          <p class="textVTextFieldFeatureTop" v-for="i in featureDownArray">{{ i.featureDown }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-text-field v-model="vTextFieldAvailability"
                  clearable
                  label="Кол-во на складе"
                  type="number"
                  variant="underlined"/>
    <v-text-field v-model="vTextFieldImgTitle"
                  clearable
                  label="Главное фото"
                  variant="underlined"/>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="vTextFieldPhotoText"
                        clearable
                        variant="underlined"
                        label="Фото"/>
        </v-col>
      </v-row>
      <div class="actionsVBtn d-flex justify-space-between">
        <v-btn @click="pushPhotoArray()">Добавить эти значения</v-btn>
        <v-btn @click="deletePhotoArray()">Удалить все значения</v-btn>
      </div>
      <v-row>
        <v-col>
          <p class="textVTextFieldFeatureTop" v-for="i in photoArray">{{ i.src }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model.number="vTextFieldHomeOfTheBrand"
                        clearable
                        label="Родина бренда"
                        variant="underlined"/>
        </v-col>
        <v-col>
          <v-text-field v-model="vTextFieldCountryOf"
                        clearable
                        label="Производитель"
                        variant="underlined"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="vTextFieldEquipment"
                        clearable
                        label="Комплектация"
                        variant="underlined"/>
          <div class="actionsVBtn d-flex justify-space-between">
            <v-btn @click="pushEquipmentArray()">Добавить эти значения</v-btn>
            <v-btn @click="deleteEquipmentArray()">Удалить все значения</v-btn>
          </div>
          <p class="textVTextFieldFeatureTop" v-for="i in vTextFieldEquipmentArray">{{ i }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-text-field v-model="vTextFieldPrice"
                  clearable
                  label="Цена за шт"
                  variant="underlined"/>
    <v-btn color="primary" @click="submitForm">Добавить на сайт</v-btn>
  </v-form>

</template>

<style lang="scss" scoped>

</style>