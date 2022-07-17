import type { MapImperativeHandle, MapPosition } from "components/map/Map";

/**
 * Позволяет глобально взаимодействовать с компонентом карт, если он сейчас доступен
 */
export default class ShippingMapService {
  private _handle: MapImperativeHandle | null = null;

  setImperativeHandle(handle: MapImperativeHandle | null) {
    this._handle = handle;
  }

  async setWaypoints(waypoints: MapPosition[]) {
    if (!this._handle)
      return;

    return this._handle.setWaypoints(waypoints);
  }
}