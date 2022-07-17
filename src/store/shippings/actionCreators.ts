import { PayloadAction } from "@reduxjs/toolkit";
import { changeLocationAction, ChangeLocationPayload, selectShippingItemAction } from "./actions";
import { shippingsSlice } from "./slice";

function selectShippingItem(shippingItemId: number): PayloadAction<number> {
  return {
    type: selectShippingItemAction,
    payload: shippingItemId
  };
}

function changeLocation(shippingItemId: number, locationId: number, isLoadingLocation: boolean): PayloadAction<ChangeLocationPayload> {
  return {
    type: changeLocationAction,
    payload: {
      shippingItemId,
      locationId,
      isLoadingLocation
    }
  };
}

const {
  addLocations,
  addShippingItems,
  setSelectedShippingItemId,
  setShippingItemLocation,
} = shippingsSlice.actions;

export {
  selectShippingItem,
  changeLocation,

  addLocations,
  addShippingItems,
  setSelectedShippingItemId,
  setShippingItemLocation,
};