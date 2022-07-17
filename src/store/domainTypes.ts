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

export type ShippingItemBodyType = 'Манипулятор' | 'Рефрижератор' | 'Тентованный' | 'Изотермический';

export interface ShippingItem {
  id: number,
  dateTimestamp: number,
  loadingLocationId: number,
  unloadingLocationId: number,
  weight: number,
  size: number,
  bodyType: ShippingItemBodyType,
  price: number,
}