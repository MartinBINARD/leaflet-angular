import * as L from "leaflet";
import 'leaflet.markercluster';

const FLY_TO_BOUNDS_DURATION_IN_SECONDS = 1;
const FIT_TO_MAX_ZOOM = 14;
const FIT_TO_PADDING: L.PointExpression = [20, 20];

export class AbstractClusterManager {
    protected map: L.Map;
    protected clusterGroup: L.MarkerClusterGroup;
  
    constructor(map: L.Map) {
      this.map = map;
      this.clusterGroup = L.markerClusterGroup();
      this.map.addLayer(this.clusterGroup);
    }

    fitToCluster(): void {
      const bounds = this.clusterGroup.getBounds();
      this.map.fitBounds(bounds, { maxZoom: FIT_TO_MAX_ZOOM, padding: FIT_TO_PADDING });
    }

    flyToCluster(): void {
      const bounds = this.clusterGroup.getBounds();
      this.map.flyToBounds(bounds, { duration: FLY_TO_BOUNDS_DURATION_IN_SECONDS });
    }

    clearCluster(): void {
      this.clusterGroup.clearLayers();
    }
}