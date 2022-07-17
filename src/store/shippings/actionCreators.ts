import { PayloadAction } from "@reduxjs/toolkit";
import { shippingsSlice } from "./slice";

function selectShippingItem(shippingItemId: number): PayloadAction<number> {
  return {
    type: 'SELECT_SHIPPING_ITEM',
    payload: shippingItemId
  };
}

const {
  addLocations,
  addShippingItems,
  setSelectedShippingItemId
} = shippingsSlice.actions;

export {
  selectShippingItem,

  addLocations,
  addShippingItems,
  setSelectedShippingItemId
};