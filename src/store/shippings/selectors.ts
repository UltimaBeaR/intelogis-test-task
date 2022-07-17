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