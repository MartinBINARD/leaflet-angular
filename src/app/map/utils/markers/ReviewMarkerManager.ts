import * as L from 'leaflet';
import { LatLngExpression } from 'leaflet';
import { MarkerGroup } from '../controller/LayerControllerBuilder';
import { AbstractMarkerManager } from './AbstractMarkerManager';

export class ReviewMarkerManager extends AbstractMarkerManager {
  addMarkers(markers: MarkerGroup[]): void {
    this.clearMarkers();

    if (!this.map) {
      console.warn('Cannot add markers: map is not initialized.');
      return;
    }

    markers.forEach((marker: MarkerGroup) => {
      const markerElement = L.marker(marker?.coordinates as LatLngExpression);
      this.clusterGroup.addLayer(markerElement);
      this.markers.push(markerElement);
    });
  }
}
