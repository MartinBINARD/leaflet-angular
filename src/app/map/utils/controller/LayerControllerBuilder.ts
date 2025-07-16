import * as L from 'leaflet'
import { ControlPosition, LatLngExpression } from 'leaflet'

export interface MarkerGroup {
  name: string,
  popupContent: string,
  coordinates: LatLngExpression
}

export class LayerControllerBuilder {
  private position: ControlPosition = 'topright'
  private markerGroups: MarkerGroup[] = []
  private overlays: { [key: string]: L.LayerGroup } = {}

  setPosition(position: ControlPosition): LayerControllerBuilder {
    this.position = position
    return this
  }

  addMarkerGroups(markers: MarkerGroup[]): LayerControllerBuilder {
    markers.forEach(marker => {
      const { name, popupContent, coordinates } = marker
      this.markerGroups.push({
        name,
        popupContent,
        coordinates
      })
    })

    return this;
  }

  private createLayerGroups(): void {
    this.markerGroups.forEach(group => {
      const layerGroup = L.layerGroup()

      const marker = L.marker(group.coordinates)
      marker.bindPopup(group.popupContent)
      marker.addTo(layerGroup)
      this.overlays[group.name] = layerGroup
    })
  }

  build(): L.Control.Layers {
    this.createLayerGroups()

    const layerControl = L.control.layers({}, this.overlays, {
      position: this.position,
      collapsed: true
    })

    return layerControl
  }

  getOverlays(): { [key: string]: L.LayerGroup } {
    return { ...this.overlays }
  }
}