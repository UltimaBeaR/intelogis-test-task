import { store } from "store";
import { addLocations, addShippingItems } from 'store/shippingsSlice';
import { locations } from './locations';
import { shippingItems } from './shippingItems';

export function pushInitialDataToStore() {
  store.dispatch(addLocations(locations));
  store.dispatch(addShippingItems(shippingItems));
}