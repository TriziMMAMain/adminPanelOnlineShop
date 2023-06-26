// - import
import {defineStore} from 'pinia'
import _ from 'lodash'
import interceptors from '../api.js';
import {FailLogin, ProccesingSuccessfuly, ProcessingError, SuccesfullLogin} from '../notification/toasting.js'
import fs from "fs";

export const useUsersStore = defineStore({
    id: 'instrumentStore',
    state: () => ({
        // users
        users: null,
        _id: [],
        instruments: null,
        // instrument
        arrayTypeResult: null,
    }),
    actions: {
        visitsInSite() {
            let visits = JSON.parse(localStorage.getItem('visits'))
            if (!visits) {
                localStorage.setItem('visits', JSON.stringify(1));
                visits = 1;
                localStorage.setItem("userInAdmin", JSON.stringify(false))
                localStorage.setItem("formInAdmin", JSON.stringify(true))
            } else {
                const newVisits = visits + 1;
                localStorage.setItem('visits', JSON.stringify(newVisits));
                visits = newVisits;
            }
        },
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
        async acceptedUser(user, orderId, _id) {
            try {
                const userCopy = {
                    instrumentArraySecond: {
                        _id: _id,
                        orderId: orderId,
                        processing: 'Принят в обработку'
                    },
                }
                const response = await interceptors.patch(`users/update/${user.newId}`, userCopy)
                    .then((result) => {
                        console.log(result.status);
                        console.log(result.data);
                        ProccesingSuccessfuly('Обработка успешна')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    })
                    .catch((err) => {
                        ProcessingError(`Ошибка: ${err}`)
                        console.log(err);
                    })
            } catch (err) {
                console.log(err);
            }
        },
        async refusalUser(user, orderId, _id) {
            try {
                const userCopy = {
                    instrumentArraySecond: {
                        _id: _id,
                        orderId: orderId,
                        processing: 'Отклонен в обработке'
                    },
                }
                const response = await interceptors.patch(`users/update/${user.newId}`, userCopy)
                    .then((result) => {
                        console.log(result.status);
                        console.log(result.data);
                        ProccesingSuccessfuly('Обработка успешна')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    })
                    .catch((err) => {
                        ProcessingError(`Ошибка: ${err}`)
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
        // Fetching typeThis
        async fetchingInstrumentTypeThis(type) {
            try {
                let arrayType = []
                // Cordless
                if (type === "Аккумуляторная дрель-шуруповерт") {
                    arrayType = ['Тип', 'Тип двигателя', 'Наличие удара', 'Ленточные (магазинные)',
                        'Наличие реверса', 'Наличие подсветки', 'Тормоз двигателя', 'Тип патрона',
                        'Крепление патрона', 'Блокировка шпинделя', 'Размер зажимаемой оснастки', 'MIN размер оснастки',
                        'МAX размер оснастки', 'MAX крутящий момент',
                        'Жестк. вращ. момент', 'Мягк. вращ. момент', 'Число скоростей',
                        'Частота вращения шпинделя', 'MAX частота вращения шпинделя', 'MAX диаметр шурупа',
                        'Max диаметр сверления (металл)',
                        'МAX диаметр сверления (дерево)', 'Тип аккумулятора', 'Напряжение аккумулятора',
                        'Ёмкость аккумулятора', 'Устройство аккумулятора', 'Количество аккумуляторов в комплекте',
                        'Зарядное устройство в комплекте', 'Габариты без упаковки',
                        'Вес нетто', 'Число ступеней крутящего момента', 'Съемный патрон', 'Крепление на ремень',
                        'Индикатор уровня зарядки на корпусе дрели']
                    this.arrayTypeResult = arrayType
                } else if (type === '') {
                    arrayType = []
                    this.arrayTypeResult = arrayType
                } else if (type === '') {
                    arrayType = []

                    this.arrayTypeResult = arrayType
                } else if (type === '') {
                    arrayType = []

                    this.arrayTypeResult = arrayType
                }
                // Gasoline
                if (type === "Бензопила") {
                    arrayType = [
                        'Класс пилы', 'Мощность (л.с.)', 'Мощность (кВт)',
                        'Длина шины', 'Длина шины (дюйм)', 'Шаг цепи',
                        'Ширина паза', 'Количество звеньев', 'Объем двигателя',
                        'Объем масляного бака', 'Ёмкость топливного бака', 'Уровень шума',
                        'Свеча зажигания', 'Обороты холостого хода', 'Праймер', 'МAX скорость вращения цепи',
                        'Легкий запуск', 'Виброзащита', 'Работа одной рукой',
                        'Тактность двигателя', 'Чехол/сумка в комплекте', 'Вес нетто'
                    ]
                    this.arrayTypeResult = arrayType
                } else if (type === '') {
                    arrayType = []
                    this.arrayTypeResult = arrayType
                } else if (type === '') {
                    arrayType = []

                    this.arrayTypeResult = arrayType
                } else if (type === '') {
                    arrayType = []

                    this.arrayTypeResult = arrayType
                }
                // Network

                // Pneumotool
                localStorage.setItem("instrument_type_this", JSON.stringify(this.arrayTypeResult))
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        },
        // Fetching instrument
        async fetchingInstrument() {
            try {
                const response = await interceptors.get('/api/instruments/get/all')
                this.instruments = response.data
                return true
            } catch (error) {
                this.error = error
                console.log(error)
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
                return false
            }

        },
        async fetchingOnlyNameInstrument() {
            try {
                let allNameInstrument = []
                for (let i = 0; i < this.instruments.length; i++) {
                    allNameInstrument.push(this.instruments[i].name)
                }
                localStorage.setItem("all_name_instruments", JSON.stringify(allNameInstrument))
            } catch (err) {
                console.log(err);
            }
        },

        // Post instrument
        async postInstrument(instrument) {
            try {
                console.log(instrument);
                const response = await interceptors.post('instrument/add', instrument)
                    .then((result) => {
                        console.log(result.status);
                        ProccesingSuccessfuly('Инструмент добавлен на сайт!')
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
        // Patch instrument
        async patchInstrument(_id, data) {
            try {
                console.log(_id);
                console.log(data);
                const response = await interceptors.patch(`/instrument/update/${_id}`, data)
                    .then((result) => {
                        console.log(result.status);
                        ProccesingSuccessfuly('Инструмент обновлен!')
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

        // Filter admin user
        async filterAdminUser(login, password) {
            try {
                const response = await interceptors.get('api/admin-panel-get')
                let loginRustamMain = response.data.loginRustam
                let loginStasMain = response.data.loginStas
                let passwordRustamMain = response.data.passwordRustam
                let passwordStasMain = response.data.passwordStas

                if (login === loginStasMain && password === passwordStasMain) {
                    SuccesfullLogin(`Добро пожаловать ${loginStasMain}`)
                    localStorage.setItem("userInAdmin", JSON.stringify(true))
                    localStorage.setItem("formInAdmin", JSON.stringify(false))
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                } else if (login === loginRustamMain && password === passwordRustamMain) {
                    SuccesfullLogin(`Добро пожаловать ${loginRustamMain}`)
                    localStorage.setItem("userInAdmin", JSON.stringify(true))
                    localStorage.setItem("formInAdmin", JSON.stringify(false))
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                } else {
                    FailLogin('Неправильно ведены данные!')
                    localStorage.setItem("userInAdmin", JSON.stringify(false))
                    localStorage.setItem("formInAdmin", JSON.stringify(true))
                }

            } catch (err) {
                console.log(err);
            }
        },
        // Filter _id
        async filterId() {
            try {
                if (await this.fetchingInstrument()) {
                    for (let i = 0; i < this.instruments.length; i++) {
                        this._id.push(this.instruments[i]._id)
                    }
                    localStorage.setItem("_id", JSON.stringify(this._id))
                }
                return true
            } catch (err) {
                console.log(err);
            }
            return false
        },
        async filterNameById(_id) {
            try {
                let filteredInstrument = _.filter(this.instruments, {_id: _id})
                localStorage.setItem("name_instrument_filtered_by_id", JSON.stringify(filteredInstrument[0]))
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        },
        async filterIdByName(name) {
            try {
                let filteredInstrument = _.filter(this.instruments, {name: name})
                localStorage.setItem("name_instrument_filtered_by_name", JSON.stringify(filteredInstrument[0]))
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        },
    },
    getters: {},
})
