import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location, ShippingItem } from 'store/domainTypes';
import { SetShippingItemLocationPayload } from './actions';

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
    },

    setShippingItemLocation(state, action: PayloadAction<SetShippingItemLocationPayload>) {
      const shippingItem = state.shippingItems[action.payload.shippingItemId];

      if (action.payload.isLoadingLocation)
        shippingItem.loadingLocationId = action.payload.locationId;
      else
        shippingItem.unloadingLocationId = action.payload.locationId;
    },
  }
});

export default shippingsSlice.reducer;