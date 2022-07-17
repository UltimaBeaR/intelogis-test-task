export type LocationType = 'city' | 'town' | 'village';

export interface Location {
  id: number,
  name: string,
  type: LocationType,
  latitude: number,
  longitude: number,
  region: string,
  country: string
}

export const locations: Location[] = [
  {
    id: 1,
    name: "Ногинск",
    type: "city",
    latitude: 55.85008,
    longitude: 38.43322,
    region: "Московская область",
    country: "Россия"
  },
  {
    id: 2,
    name: "Лобня",
    type: "town",
    latitude: 56.01162,
    longitude: 37.47456,
    region: "Московская область",
    country: "Россия"
  },
  {
    id: 3,
    name: "Чебоксары",
    type: "city",
    latitude: 56.11729,
    longitude: 47.23183,
    region: "Чувашия",
    country: "Россия"
  },
  {
    id: 4,
    name: "Клещевка",
    type: "village",
    latitude: 51.72989,
    longitude: 46.04389,
    region: "Саратовская область",
    country: "Россия"
  },
  {
    id: 5,
    name: "Нижний Новгород",
    type: "city",
    latitude: 56.32698,
    longitude: 44.00777,
    region: "Нижегородская область",
    country: "Россия"
  },
  {
    id: 6,
    name: "Выездное",
    type: "town",
    latitude: 55.38359,
    longitude: 43.79991,
    region: "Нижегородская область",
    country: "Россия"
  },
  {
    id: 7,
    name: "Выкса",
    type: "town",
    latitude: 55.3195,
    longitude: 42.17261,
    region: "Нижегородская область",
    country: "Россия"
  },
  {
    id: 8,
    name: "Саратов",
    type: "city",
    latitude: 51.53316,
    longitude: 46.00025,
    region: "Саратовская область",
    country: "Россия"
  },
  {
    id: 9,
    name: "Маркс",
    type: "town",
    latitude: 51.7,
    longitude: 46.75,
    region: "Саратовская область",
    country: "Россия"
  },
  {
    id: 10,
    name: "Казань",
    type: "city",
    latitude: 55.79046,
    longitude: 49.11395,
    region: "Татарстан",
    country: "Россия"
  },
  {
    id: 11,
    name: "Йошкар-Ола",
    type: "city",
    latitude: 56.63278,
    longitude: 47.8959,
    region: "Марий Эл",
    country: "Россия"
  },
  {
    id: 12,
    name: "Электросталь",
    type: "city",
    latitude: 55.79999,
    longitude: 38.45003,
    region: "Московская область",
    country: "Россия"
  },
  {
    id: 13,
    name: "Лихославль",
    type: "town",
    latitude: 57.11678,
    longitude: 35.46739,
    region: "Тверская область",
    country: "Россия"
  },
  {
    id: 14,
    name: "Подольск",
    type: "city",
    latitude: 55.42905,
    longitude: 37.54373,
    region: "Московская область",
    country: "Россия"
  },
  {
    id: 15,
    name: "Смоленск",
    type: "city",
    latitude: 54.7828,
    longitude: 32.04411,
    region: "Смоленская область",
    country: "Россия"
  },
  {
    id: 16,
    name: "Балашиха",
    type: "city",
    latitude: 55.79955,
    longitude: 37.93328,
    region: "Московская область",
    country: "Россия"
  },
  {
    id: 17,
    name: "Сызрань",
    type: "city",
    latitude: 53.16658,
    longitude: 48.46724,
    region: "Самарская область",
    country: "Россия"
  },
  {
    id: 18,
    name: "Тверь",
    type: "city",
    latitude: 56.85809,
    longitude: 35.92205,
    region: "Тверская область",
    country: "Россия"
  },
  {
    id: 19,
    name: "Кондрово",
    type: "town",
    latitude: 54.79808,
    longitude: 35.9362,
    region: "Калужская область",
    country: "Россия"
  },
  {
    id: 20,
    name: "Калуга",
    type: "city",
    latitude: 54.5333,
    longitude: 36.26713,
    region: "Калужская область",
    country: "Россия"
  },
  {
    id: 21,
    name: "Воронеж",
    type: "city",
    latitude: 51.67165,
    longitude: 39.21061,
    region: "Воронежская область",
    country: "Россия"
  },
  {
    id: 22,
    name: "Тольятти",
    type: "city",
    latitude: 53.51666,
    longitude: 49.41671,
    region: "Самарская область",
    country: "Россия"
  },
  {
    id: 23,
    name: "Москва",
    type: "city",
    latitude: 55.75647,
    longitude: 37.61786,
    region: "Москва",
    country: "Россия"
  },
  {
    id: 24,
    name: "Химки",
    type: "city",
    latitude: 55.88929,
    longitude: 37.44462,
    region: "Московская область",
    country: "Россия"
  },
  {
    id: 25,
    name: "Мытищи",
    type: "city",
    latitude: 55.91667,
    longitude: 37.73325,
    region: "Московская область",
    country: "Россия"
  },
];