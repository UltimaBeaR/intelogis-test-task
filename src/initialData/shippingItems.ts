export interface ShippingItem {
  id: number,
  date: Date,
  loadingLocationId: number,
  unloadingLocationId: number,
  weight: number,
  size: number,
  bodyType: string,
  price: number,
}

export const shippingItems: ShippingItem[] = [
  {
    id: 1,
    date: new Date(Date.parse('2022-07-19')),
    loadingLocationId: 1,
    unloadingLocationId: 2,
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 100500
  },
  {
    id: 2,
    date: new Date(Date.parse('2022-07-19')),
    loadingLocationId: 1,
    unloadingLocationId: 2,
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    id: 3,
    date: new Date(Date.parse('2022-07-19')),
    loadingLocationId: 1,
    unloadingLocationId: 2,
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  }
];