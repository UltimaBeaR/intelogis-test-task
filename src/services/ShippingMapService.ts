import type { MapImperativeHandle, MapPosition } from "components/map/Map";

/**
 * Позволяет глобально взаимодействовать с компонентом карт, если он сейчас доступен
 */
export default class ShippingMapService {
  private _handle: MapImperativeHandle | null = null;

  setImperativeHandle(handle: MapImperativeHandle | null) {
    this._handle = handle;
  }

  isReady(): boolean {
    return this._handle !== null;
  }

  setWaypoints = async (waypoints: MapPosition[]) => {
    if (this._handle === null)
      return;

    return this._handle.setWaypoints(waypoints);
  };
}