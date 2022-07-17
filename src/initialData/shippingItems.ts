import type { ShippingItem, ShippingItemBodyType } from 'store/domainTypes';
import { locations } from './locations';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const uniqueBodyTypes: ShippingItemBodyType[] = [ 'Манипулятор', 'Рефрижератор', 'Тентованный', 'Изотермический' ];

const now = new Date();

function generateRandomShippingItem(id: number): ShippingItem {
  const loadingLocationIdx = getRandomInt(0, locations.length - 1);
  
  let unloadingLocationIdx = loadingLocationIdx;
  while (unloadingLocationIdx === loadingLocationIdx) {
    unloadingLocationIdx = getRandomInt(0, locations.length - 1);
  }

  const bodyTypeIdx = getRandomInt(0, uniqueBodyTypes.length - 1);

  const date = new Date(now.valueOf());
  date.setDate(date.getDate() + getRandomInt(0, 45));

  return {
    id: id,
    dateTimestamp: date.valueOf(),
    loadingLocationId: locations[loadingLocationIdx].id,
    unloadingLocationId: locations[unloadingLocationIdx].id,
    weight: getRandomInt(10, 200) * 0.1,
    size: getRandomInt(20, 90),
    bodyType: uniqueBodyTypes[bodyTypeIdx],
    price: getRandomInt(2, 65) * 1000
  };
}

const shippingItemsCount = 50;

export const shippingItems: ShippingItem[] = Array.from(Array(shippingItemsCount).keys())
  .map(idx => generateRandomShippingItem(idx + 1));