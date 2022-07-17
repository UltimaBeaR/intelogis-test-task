import type { ShippingItem } from 'store/domainTypes';

export const shippingItems: ShippingItem[] = [
  {
    id: 1,
    dateTimestamp: Date.parse('2022-07-19'),
    loadingLocationId: 1,
    unloadingLocationId: 2,
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 100500
  },
  {
    id: 2,
    dateTimestamp: Date.parse('2022-07-19'),
    loadingLocationId: 1,
    unloadingLocationId: 2,
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  },
  {
    id: 3,
    dateTimestamp: Date.parse('2022-07-19'),
    loadingLocationId: 1,
    unloadingLocationId: 2,
    weight: 4.6,
    size: 30.0,
    bodyType: 'Манипулятор',
    price: 1
  }
];