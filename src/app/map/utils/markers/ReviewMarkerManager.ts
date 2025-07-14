import * as L from 'leaflet';
import { LatLngExpression } from 'leaflet';
import { AbstractMarkerManager } from './AbstractMarkerManager';

export class ReviewMarkerManager extends AbstractMarkerManager {
  addMarkers(coords: LatLngExpression[]): void {
    this.clearMarkers();

    if (!this.map) {
      console.warn('Cannot add markers: map is not initialized.');
      return;
    }

    coords.forEach(coord => {
      const marker = L.marker(coord).addTo(this.map);
      this.markers.push(marker);
    });
  }
}
