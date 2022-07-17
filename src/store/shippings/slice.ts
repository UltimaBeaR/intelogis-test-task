import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location, ShippingItem } from 'store/domainTypes';

export interface ShippingsState {
  locations: Record<number, Location>;
  shippingItems: Record<number, ShippingItem>;
  selectedShippingItemId: number
}

const initialState: ShippingsState = {
  locations: {},
  shippingItems: {},
  selectedShippingItemId: -1
};

export const shippingsSlice = createSlice({
  name: 'shippings',
  initialState,

  reducers: {
    addLocations(state,  action: PayloadAction<Location[]>) {
      for (let location of action.payload) {
        state.locations[location.id] = location;
      }
    },

    addShippingItems(state,  action: PayloadAction<ShippingItem[]>) {
      for (let shippingItem of action.payload) {
        state.shippingItems[shippingItem.id] = shippingItem;
      }
    },

    setSelectedShippingItemId(state, action: PayloadAction<number>) {
      state.selectedShippingItemId = action.payload;
    }
  }
});

export default shippingsSlice.reducer;