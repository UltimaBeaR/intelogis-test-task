export const selectShippingItemAction = 'shippings/selectShippingItem';

export const changeLocationAction = 'shippings/changeLocation';

export interface ChangeLocationPayload {
  shippingItemId: number;
  locationId: number;
  isLoadingLocation: boolean;
}

export interface SetShippingItemLocationPayload {
  shippingItemId: number;
  locationId: number;
  isLoadingLocation: boolean;
}