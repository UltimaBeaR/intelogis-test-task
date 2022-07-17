import { RootState } from "store";
import { Location, ShippingItem, ShippingItemBodyType } from "store/domainTypes";
import { ShippingsState } from "./slice";

export interface ShippingItemWithLocation {
  id: number,
  dateTimestamp: number,
  loadingLocation: Location,
  unloadingLocation: Location,
  weight: number,
  size: number,
  bodyType: ShippingItemBodyType,
  price: number,
}

function locationIdToLocation(locationId: number, shippingsState: ShippingsState): Location | null {
  const location = shippingsState.locations[locationId];

  if (location === undefined)
    return null;

  return location;
}

function shippingItemToShippingItemWithLocation(shippingItem: ShippingItem, shippingsState: ShippingsState): ShippingItemWithLocation | null {
  const { loadingLocationId, unloadingLocationId, ...restOfItem } = shippingItem;

  const loadingLocation = locationIdToLocation(loadingLocationId, shippingsState);
  const unloadingLocation = locationIdToLocation(unloadingLocationId, shippingsState);

  if (!loadingLocation || !unloadingLocation)
    return null;

  return {
    loadingLocation: loadingLocation,
    unloadingLocation: unloadingLocation,
    ...restOfItem
  };
}

export function getAllShippingItems(state: RootState): ShippingItemWithLocation[] {
  const shippingsState = state.shippings;

  return Object.values(shippingsState.shippingItems)
    .map(shippingItem => shippingItemToShippingItemWithLocation(shippingItem, shippingsState))
    .filter((x): x is ShippingItemWithLocation => x !== null);
}

export function getShippingItem(state: RootState, id: number): ShippingItemWithLocation | null {
  const shippingsState = state.shippings;

  const shippingItem = shippingsState.shippingItems[id];

  if (shippingItem === undefined)
    return null;

  return shippingItemToShippingItemWithLocation(shippingItem, shippingsState);
}

export function getAllLocations(state: RootState): Location[] {
  const shippingsState = state.shippings;

  return Object.values(shippingsState.locations);
}

export function getSelectedShippingItemId(state: RootState): number {
  const shippingsState = state.shippings;

  return shippingsState.selectedShippingItemId;
}