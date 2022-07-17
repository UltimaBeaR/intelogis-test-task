import { call, put, select, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
import { setSelectedShippingItemId } from 'store/shippings/actionCreators';
import { shippingMapService } from 'services';
import { getShippingItem, ShippingItemWithLocation } from './shippings/selectors';
import type { MapPosition } from 'components/map/Map';

function* selectShippingItem(action: PayloadAction<number>) {
  if (!shippingMapService.isReady())
    return;

  const shippingItemId = action.payload;

  try {
    const shippingItem: ShippingItemWithLocation | null = yield select(getShippingItem, shippingItemId);

    if (!shippingItem)
      return;

    const waypoints: MapPosition[] = [
      { latitude: shippingItem.loadingLocation.latitude, longitude: shippingItem.loadingLocation.longitude },
      { latitude: shippingItem.unloadingLocation.latitude, longitude: shippingItem.unloadingLocation.longitude },
    ];

    yield call(shippingMapService.setWaypoints, waypoints);

    yield put(setSelectedShippingItemId(shippingItemId));
  }
  catch(ex){
  }
}

export function* watchCommon() {
  yield takeLatest("SELECT_SHIPPING_ITEM", selectShippingItem);
}