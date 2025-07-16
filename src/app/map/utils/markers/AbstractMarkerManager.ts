import * as L from "leaflet";
import 'leaflet.markercluster';
import { MarkerGroup } from "../controller/LayerControllerBuilder";
import { AbstractClusterManager } from "./AbstractClusterManager";

export abstract class AbstractMarkerManager extends AbstractClusterManager {
  protected markers: L.Marker[] = [];

  constructor(map: L.Map) {
    super(map);
  }

  abstract addMarkers(markers: MarkerGroup[]): void;

  fitToMarkers(): void {
    if (this.markers.length === 0) return;

    this.fitToCluster()
  }

  flyToMarkers(): void {
    if (this.markers.length === 0) return;

    this.flyToCluster();
  }

  clearMarkers(): void {
    this.clearCluster;
    this.markers = [];
  }
}
