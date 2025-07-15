import * as L from "leaflet";
import { LatLngExpression } from "leaflet";
import 'leaflet.markercluster';

const FLY_TO_BOUNDS_DURATION_IN_SECONDS = 1;

export abstract class AbstractMarkerManager {
  protected map: L.Map;
  protected clusterGroup: L.MarkerClusterGroup;
  protected markers: L.Marker[] = [];

  constructor(map: L.Map) {
    this.map = map;
    this.clusterGroup = L.markerClusterGroup();
    this.map.addLayer(this.clusterGroup);
  }

  abstract addMarkers(markers: LatLngExpression[]): void;

  fitToMarkers(): void {
    if (this.markers.length === 0) return;

    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    this.map.fitBounds(bounds);
  }

  resetView(): void {
    if (this.markers.length === 0) return;

    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    this.map.flyToBounds(bounds, { duration: FLY_TO_BOUNDS_DURATION_IN_SECONDS });
  }

  clearMarkers(): void {
    this.clusterGroup.clearLayers();
    this.markers = [];
  }
}
