import { call, put, select, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
import { setSelectedShippingItemId, setShippingItemLocation } from 'store/shippings/actionCreators';
import { shippingMapService } from 'services';
import { getShippingItem, getSelectedShippingItemId, ShippingItemWithLocation } from './shippings/selectors';
import type { MapPosition } from 'components/map/Map';
import { selectShippingItemAction, changeLocationAction, ChangeLocationPayload } from './shippings/actions';

function* setWaypointsForShippingItem(shippingItem: ShippingItemWithLocation) {
  try {
    const waypoints: MapPosition[] = [
      { latitude: shippingItem.loadingLocation.latitude, longitude: shippingItem.loadingLocation.longitude },
      { latitude: shippingItem.unloadingLocation.latitude, longitude: shippingItem.unloadingLocation.longitude },
    ];

    yield call(shippingMapService.setWaypoints, waypoints);
  }
  catch(ex) {
  }
}

function* workSelectShippingItem(action: PayloadAction<number>) {
  if (!shippingMapService.isReady())
    return;

  const shippingItemId = action.payload;

  yield put(setSelectedShippingItemId(shippingItemId));

  const shippingItem: ShippingItemWithLocation | null = yield select(getShippingItem, shippingItemId);

  if (!shippingItem)
    return;

  yield setWaypointsForShippingItem(shippingItem);
}

function* workChangeLocation(action: PayloadAction<ChangeLocationPayload>) {
  const selectedShippingItemId: number = yield select(getSelectedShippingItemId);

  yield put(setShippingItemLocation({
    shippingItemId: action.payload.shippingItemId,
    locationId: action.payload.locationId,
    isLoadingLocation: action.payload.isLoadingLocation,
  }));

  if (selectedShippingItemId === action.payload.shippingItemId) {
    const shippingItem: ShippingItemWithLocation | null = yield select(getShippingItem, action.payload.shippingItemId);

    if (!shippingItem)
      return;

    yield setWaypointsForShippingItem(shippingItem);
  }
}

export function* watchCommon() {
  yield takeLatest(selectShippingItemAction, workSelectShippingItem);
  yield takeLatest(changeLocationAction, workChangeLocation);
}