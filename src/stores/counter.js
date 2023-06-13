// - import
import {defineStore} from 'pinia'
import _ from 'lodash'
import interceptors  from '../api.js';
import {ProccesingSuccessfuly, ProcessingError} from '../notification/toasting.js'
import fs from "fs";

export const useUsersStore = defineStore({
    id: 'instrumentStore',
    state: () => ({
        // users
        users: null,

        // instrument
        arrayTypeResult: null,
    }),
    actions: {
        // Fetching user
        async fetchingUsers() {
            try {
                const response = await interceptors.get('api/users/get/all')
                this.users = response.data
                localStorage.setItem("users", JSON.stringify(this.users))
                return true
            } catch (error) {
                this.error = error
                console.log(error)
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
                return false
            }
        },
        // Change user.processing
        async acceptedUser(user) {
            try {
                const userCopy = {
                    processing: 'Принят в обработку'
                }
                let userJSON = JSON.stringify(userCopy)
                console.log(userJSON);
                const response = await interceptors.patch(`users/update/${user._id}`, userCopy)
                    .then((result) => {
                        console.log(result.data);
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } catch (err) {
                console.log(err);
            }
        },
        async refusalUser(user) {
            try {
                const userCopy = {
                    processing: 'Отклонен в обработке'
                }
                let userJSON = JSON.stringify(userCopy)
                console.log(userJSON);
                const response = await interceptors.patch(`users/update/${user._id}`, userCopy)
                    .then((result) => {
                        console.log(result.data);
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } catch (err) {
                console.log(err);
            }
        },
        // Fetching type
        async fetchingInstrumentType(type) {
            try {
                let arrayType = []

                if (type === 'Аккумуляторный инструмент') {
                    arrayType = ['Аккумуляторная дрель-шуруповерт', 'Аккумуляторная шлифмашина', 'Аккумуляторный гайковерт',
                        'Аккумуляторный тример', 'Аккумуляторный пистолет',
                        'Аккумуляторная цепная пила', 'Аккумуляторная сабельная пила', 'Аккумуляторная монтажная пила',
                        'Аккумуляторная торцовая пила', 'Аккумуляторная ленточная пила', 'Аккумуляторная дисковая пила',
                        'Аккумуляторный строительный миксер', 'Аккумуляторная трещетка', 'Аккумуляторный гравер',
                        'Аккумуляторный заклепочник', 'Аккумуляторный лобзик', 'Аккумуляторная отвертка',
                        'Аккумуляторный реноватор', 'Аккумуляторные ножницы', 'Аккумуляторный перфоратор',
                        'Аккумуляторный рубанок', 'Аккумуляторный рубанок', 'Аккумуляторный степлер',
                        'Аккумуляторный фрезер', 'Аккумуляторный штроборез', 'Аккумуляторная болгарка',
                        'Аккумуляторный бороздодел', 'Аккумуляторный сварочный инвертор', 'Аккумуляторный газовый паяльник',]
                    this.arrayTypeResult = arrayType
                } else if (type === 'Бензоинструмент') {
                    arrayType = [
                        'Бензиновая виброплита', 'Бензиновая газонокосилка', 'Бензиновая мойка высокого давления',
                        'Бензиновый отбойный молоток', 'Бензотриммер', 'Бензопила',
                        'Бензогенератор', 'Бензиновый мотоблок'
                    ]
                    this.arrayTypeResult = arrayType
                } else if (type === 'Сетевой инструмент') {
                    arrayType = [
                        'Высоторез',
                        'Измельчитель',
                        'Клеевой пистолет',
                        'Кусторез',
                        'Лобзик электрический',
                        'Мультитул',
                        'Отбойный молоток электрический',
                        'Перфоратор',
                        'Пуско-зарядное устройство',
                        'Пылесос',
                        'Рейсмус',
                        'Рубанок',
                        'Станок',
                        'Дрель',
                        'Шлифмашина электрическая',
                        'Эксцентрик',
                        'Электрическая болгарка',
                        'Электрическая цепная пила',
                        'Электрическая дисковая пила',
                        'Электрическая газонокосилка',
                        'Электрическая сабельная пила',
                        'Электрическая торцовая пила',
                        'Электрическая циркулярная пила',
                        'Электрический гайковерт',
                        'Электрокультиватор',
                        'Электроплиткорез',
                        'Электротриммер'
                    ]


                    this.arrayTypeResult = arrayType
                } else if (type === 'Пневмоинструмент') {
                    arrayType = [
                        "Арматура торцовая пневматическая",
                        "Компрессор",
                        "Гвоздезабивной пистолет пневматический",
                        "Дрель пневматическая",
                        "Инструмент для материалорезки пневматический",
                        "Краскопульт пневматический",
                        "Микродрель пневматическая",
                        "Молоток пневматический",
                        "Набор для смазки пневматических инструментов",
                        "Пистолет для нанесения клея пневматический",
                        "Пневматическая бормашина",
                        "Пневматическая гайковерт",
                        "Пневматическая дельташлифмашина",
                        "Пневматическая инверторная сварка",
                        "Пневматическая кромкооблицовочная машина",
                        "Пневматическая ленточная шлифмашина",
                        "Пневматическая отбойная молотковая машина",
                        "Пневматическая пила",
                        "Пневматическая прецизионная шлифмашина",
                        "Пневматическая разгрузочная машина",
                        "Пневматическая ручная фрезерная машина",
                        "Пневматическая ручная цепная пила",
                        "Пневматическая ручная шлифмашина",
                        "Пневматическая ручная электродрель",
                        "Пневматическая ручная электрошлифмашина",
                        "Пневматическая ручная щетка",
                        "Пневматическая ручная щипцовая машина",
                        "Пневматическая сверлильная машина",
                        "Пневматическая термообрабатывающая машина",
                        "Пневматический гравер",
                        "Пневматический гриндер",
                        "Пневматический колесный дисковый резак",
                        "Пневматический молоток",
                        "Пневматический молоток-дрель",
                        "Пневматический полировальный аппарат",
                        "Пневматический пресс",
                        "Пневматический режущий и растворяющий инструмент",
                        "Пневматический ручной магнитный сверлильный станок",
                        "Пневматический штамповочный пресс",
                        "Пневмоаппаратура",
                        "Пневмовинты (клепки и шпильки)",
                        "Пневмогайки",
                        "Пневмостеплер",
                        "Пневмотерка"
                    ]
                    this.arrayTypeResult = arrayType
                }

                localStorage.setItem("instrument_type", JSON.stringify(this.arrayTypeResult))
                return this.arrayTypeResult
            } catch (error) {
                console.log(error);
                return false
            }
        },

        // Post instrument
        async postInstrument(instrument) {
            try {
                console.log(instrument);
                let instrumentJSON = JSON.stringify(instrument)
                const response = await interceptors.post('instrument/add', instrumentJSON)
                    .then((result) => {
                        console.log(result.status);
                        ProccesingSuccessfuly('Инструмент добавлен на сайт!')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                return true
            } catch (error) {
                this.error = error
                console.log(error)
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
                return false
            }

        },
    },
    getters: {

    },
})
