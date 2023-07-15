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
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
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
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
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
                        'Садовый пылесос',
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
                        'Дрель-шуруповерт',
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
                } else if (type === 'Дизельный инструмент') {
                    arrayType = [
                        "Дизельный генератор",
                        "Дизельная мотопомпа",
                        "Дизельный сварочный аппарат",
                        "Дизельный компрессор",
                        "Дизельный насос",
                        "Дизельный котел для отопления",
                        "Дизельный подогреватель воздуха",
                        "Дизельный нагреватель воды",
                        "Дизельный мотоблок",
                        "Дизельный мотокультиватор"
                    ]
                    this.arrayTypeResult = arrayType
                }

                localStorage.setItem("instrument_type", JSON.stringify(this.arrayTypeResult))
                return this.arrayTypeResult
            } catch (error) {
                console.log(error);
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
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
                } else if (type === 'Бензотриммер') {
                    arrayType = [
                        "Класс товара",
                        "Режущий элемент",
                        "Объем двигателя",
                        "Тип ручки",
                        "Ёмкость бака",
                        "Мощность (кВт)",
                        "Мощность (л.с.)",
                        "Тип двигателя",
                        "Тактность двигателя",
                        "Приводной вал",
                        "Разборный вал",
                        "Посадочный диаметр",
                        "Ширина скашивания",
                        "Крепление",
                        "Внешний диаметр (дюйм)",
                        "Толщина лески",
                        "Регулируемая штанга",
                        "Потребление топлива при максимальной нагрузке",
                        "Свеча зажигания",
                        "Наличие колес",
                        "MAX частота вращения шпинделя",
                        "Вес нетто",
                        "Уровень звукового давления",
                    ]
                    this.arrayTypeResult = arrayType
                } else if (type === 'Бензогенератор') {
                    arrayType = [
                        "Вес нетто",
                        "Габариты без упаковки",
                        "Напряжение",
                        "Стартер",
                        "MAX мощность",
                        "Ёмкость топливного бака",
                        "Мощность номинальная при 380 В",
                        "Альтернатор",
                        "Контейнерный",
                        "Автозапуск",
                        "Класс товара",
                        "Дисплей",
                        "Обмотка альтернатора двигателя",
                        "Тип кожуха",
                        "Модель двигателя",
                        "Вид топлива",
                        "Двигатель",
                        "Объем масляного бака",
                        "MAX мощность при 220 В",
                        "MAX мощность при 380 В",
                        "Номинальный ток",
                        "Эл. выходы 380/220/12",
                        "Объем двигателя",
                        "Мощность двигателя",
                        "Число оборотов",
                        "Аккумулятор в комплекте",
                        "Расход топлива",
                        "Уровень шума",
                        "Тип двигателя",
                        "Степень защиты",
                        "Сила тока розеток 380/220/12",
                        "Контроль напряжения",
                        "Колеса и ручки",
                        "Индикатор уровня топлива",
                        "Счетчик моточасов",
                        "Датчик масла",
                        "Тип электростанции",
                        "Производитель двигателя",
                        "Выход 12V"]

                    this.arrayTypeResult = arrayType
                } else if (type === '') {
                    arrayType = []

                    this.arrayTypeResult = arrayType
                }
                // Network
                if (type === "Электрическая болгарка") {
                    arrayType = [
                        "Напряжение",
                        "Мощность",
                        "Диаметр диска",
                        "Посадочный диаметр",
                        "Число оборотов",
                        "Электр. регулировка оборотов",
                        "Вид кнопки включения",
                        "Кнопка фиксации пуска",
                        "Суперфланец",
                        "Быстрозажимная гайка SDS",
                        "Защита от непреднамеренного пуска",
                        "Работа по бетону (камню)",
                        "Подача воды",
                        "Регулировка положения кожуха без инструмента",
                        "Поддержание постоянных оборотов под нагрузкой",
                        "Возможность подключения к пылесосу",
                        "Наличие виброручки",
                        "Длина кабеля",
                        "Плавный пуск",
                        "Кожух для пылеудаления",
                        "Упаковка",
                        "Длина инструмента",
                        "Габариты без упаковки",
                        "Вес нетто",
                        "MIN число оборотов",
                        "Тип двигателя",
                        "Резьба шпинделя",
                        "Диск в комплекте",
                        "Блокировка шпинделя при заклинивании диска",
                        "Количество положений рукоятки",
                        "Защита от перегрева двигателя",
                        "MAX глубина реза"
                    ]
                    this.arrayTypeResult = arrayType
                } else if (type === 'Садовый пылесос') {
                    arrayType = [
                        "Тип",
                        "Мощность (кВт)",
                        "Функции",
                        "MAX объем воздуха",
                        "Ранцевый",
                        "Вес нетто",
                        "Объем мусоросборника",
                        "Мусоросборник",
                        "MAX скорость воздуха",
                        "Материал крыльчатки"
                    ]
                    this.arrayTypeResult = arrayType
                } else if (type === 'Дрель') {
                    arrayType = [
                        "Тип инструмента",
                        "Тип двигателя",
                        "Мощность",
                        "Тип патрона",
                        "Крепление патрона",
                        "Число скоростей",
                        "Регулировка оборотов",
                        "Наличие удара",
                        "Частота ударов",
                        "MAX диаметр сверления (металл)",
                        "MAX диаметр сверления (дерево)",
                        "MAX диаметр сверления (кирпич)",
                        "Длина кабеля",
                        "Габариты без упаковки",
                        "Вес нетто",
                        "Частота вращения шпинделя",
                        "MAX крутящий момент",
                        "MAX диаметр сверления (бетон)",
                        "Автоматически отключающиеся при износе щетки",
                        "Наличие подсветки",
                        "Наличие реверса",
                        "Поддержание постоянных оборотов под нагрузкой",
                        "MAX размер патрона",
                        "Упаковка"
                    ]
                    this.arrayTypeResult = arrayType
                } else if (type === 'Дрель-шуруповерт') {
                    arrayType = ["Тип",
                        "Мощность",
                        "Тип двигателя",
                        "Ленточные (магазинные)",
                        "Наличие подсветки",
                        "Наличие реверса",
                        "Тип патрона",
                        "Размер зажимаемой оснастки",
                        "MIN размер оснастки",
                        "MAX размер оснастки",
                        "Число скоростей",
                        "Регулировка частоты вращения",
                        "Наличие удара",
                        "MAX диаметр шурупа",
                        "MAX крутящий момент",
                        "MAX диаметр сверления (металл)",
                        "MAX диаметр сверления (дерево)",
                        "Габариты без упаковки",
                        "Вес нетто",
                        "Частота вращения шпинделя",
                        "Число ступеней крутящего момента",
                        "Жестк. вращ. момент",
                        "Мягк. вращ. момент",
                        "Длина кабеля"]

                    this.arrayTypeResult = arrayType
                } else if (type === 'Измельчитель') {
                    arrayType = [
                        "Вес нетто",
                        "MAX диаметр ветвей",
                        "Тип",
                        "Габариты без упаковки",
                        "Измельчающая система",
                        "Мощность (кВт)",
                        "Колеса",
                        "Мусоросборник",
                        "Объем мусоросборника",
                        "Материал корпуса",
                        "Напряжение"
                    ]

                    this.arrayTypeResult = arrayType
                } else if (type === 'Шлифмашина электрическая') {
                    arrayType = [
                        "Мощность",
                        "Напряжение",
                        "Назначение",
                        "Ширина ленты",
                        "Длина ленты",
                        "Скорость движения ленты",
                        "Электр. регулировка оборотов",
                        "Плавный пуск",
                        "Поддержание постоянных оборотов под нагрузкой",
                        "Диаметр патрубка пылесоса",
                        "Длина кабеля",
                        "Струбцина в комплекте",
                        "Шлифовальная рама в комплекте",
                        "Вес нетто",
                        "Упаковка",
                        "Тип двигателя",
                        "Рабочая поверхность",
                        "Защита от перегрева двигателя",
                        "Возможность подключения к пылесосу"
                    ]

                    this.arrayTypeResult = arrayType
                } else if (type === 'Лобзик электрический') {
                    arrayType = [
                        "Тип",
                        "Мощность",
                        "Форма ручки",
                        "Наличие лазера",
                        "Наличие подсветки",
                        "Наличие быстр. зам. пилки",
                        "Наличие плавного пуска",
                        "Наличие защитного экрана",
                        "Литая подошва",
                        "МAX толщина пропила (дерево)",
                        "МAX толщина пропила (металла)",
                        "Ход пилки",
                        "Регулировка оборотов",
                        "Регулировка наклона подошвы без инструмента",
                        "Поддержание постоянных оборотов под нагрузкой",
                        "Легкий доступ к щеткам",
                        "Возможность подключения к пылесосу",
                        "Длина кабеля",
                        "Пилки в комплекте",
                        "Габариты без упаковки",
                        "Вес нетто",
                        "Число ходов",
                        "Упаковка"
                    ]

                    this.arrayTypeResult = arrayType
                }


                // Pneumotool
                if (type === "Компрессор") {
                    arrayType = [
                        "Вес нетто",
                        "Напряжение",
                        "Рабочее давление",
                        "Габариты без упаковки",
                        "Число оборотов",
                        "Диаметр соединения",
                        "Производительность на входе",
                        "Объем ресивера",
                        "Тип компрессора",
                        "Мощность (кВт)",
                        "Мощность (л.с.)",
                        "Транспортировочные колеса",
                        "Тип смазки",
                        "Тип соединения",
                        "Количество выходов",
                        "Тип двигателя",
                        "MIN уровень шума",
                        "Частота",
                        "Цилиндры",
                        "Ступени",
                        "Объем масляной ванны"
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
                // Diesel tool
                if (type === "Дизельный генератор") {
                    arrayType = [
                        "Вес нетто",
                        "Габариты без упаковки",
                        "Напряжение",
                        "Стартер",
                        "MAX мощность",
                        "Ёмкость топливного бака",
                        "Мощность номинальная при 380 В",
                        "Альтернатор",
                        "Контейнерный",
                        "Автозапуск",
                        "Класс товара",
                        "Дисплей",
                        "Обмотка альтернатора двигателя",
                        "Тип кожуха",
                        "Модель двигателя",
                        "Вид топлива",
                        "Двигатель",
                        "Объем масляного бака",
                        "MAX мощность при 220 В",
                        "MAX мощность при 380 В",
                        "Номинальный ток",
                        "Эл. выходы 380/220/12",
                        "Объем двигателя",
                        "Мощность двигателя",
                        "Число оборотов",
                        "Аккумулятор в комплекте",
                        "Расход топлива",
                        "Уровень шума",
                        "Тип двигателя",
                        "Степень защиты",
                        "Сила тока розеток 380/220/12",
                        "Контроль напряжения",
                        "Колеса и ручки",
                        "Индикатор уровня топлива",
                        "Счетчик моточасов",
                        "Датчик масла",
                        "Тип электростанции",
                        "Производитель двигателя",
                        "Выход 12V"]
                    this.arrayTypeResult = arrayType
                }


                localStorage.setItem("instrument_type_this", JSON.stringify(this.arrayTypeResult))
                return true
            } catch (err) {
                console.log(err);
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
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
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
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
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
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
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
                console.log(err);
                return false
            }
        },
        async filterNameById(_id) {
            try {
                let filteredInstrument = _.filter(this.instruments, {_id: _id})
                localStorage.setItem("name_instrument_filtered_by_id", JSON.stringify(filteredInstrument[0]))
                return true
            } catch (err) {
                console.log(err);
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
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
                ProcessingError('Возникла ошибка. Перезагрузите страницу!')
                return false
            }
        },
    },
    getters: {},
})
