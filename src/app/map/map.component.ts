import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild
} from '@angular/core';
import * as L from 'leaflet';
import { LayerControllerBuilder, MarkerGroup } from './utils/controller/LayerControllerBuilder';
import { ResetControlBuilder } from './utils/controller/ResetControllerBuilder';
import { ReviewMarkerManager } from './utils/markers/ReviewMarkerManager';

const URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const CONTROLLERS_POSITION: L.ControlPosition = 'topright';
const CONTROLLER_CLASS_CONTAINER: string[] = [
  'leaflet-bar',
  'leaflet-control',
  'bg-white',
  'shadow',
  'rounded',
  'w-10',
  'h-10',
  'p-2',
  'hover:bg-gray-300',
  'transition',
  'cursor-pointer',
];
const CONTROLLER_CLASS_ICON: string[] = ['h-5', 'w-5', 'bg-red-500','text-black-500', 'text-xl', 'cursor-pointer', 'm-auto', 'rounded-full'];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainerRef: ElementRef | undefined;
  @Input() markers!: MarkerGroup[];

  private map!: L.Map;
  private control!: L.Control;
  private markersManager!: ReviewMarkerManager

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    if (this.markers) {
      this.initializeMap();
      this.markersManager = new ReviewMarkerManager(this.map);
      this.addMarkers();
      this.addResetControl();
      this.addLayerController();
      this.subscribeToStableZone();
    } else {
      console.warn('Map not initialized: missing markers.');
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }

    if(this.markersManager) {
      this.markersManager.clearMarkers();
    }
  }

  private initializeMap() {
    const container: HTMLElement = this.mapContainerRef?.nativeElement;
    if (!container) {
      console.error('Map container not found in the DOM.');
      return;
    }

    this.map = L.map(container, { attributionControl: false });

    L.tileLayer(URL_TEMPLATE, {
      maxZoom: 18,
      minZoom: 10,
    }).addTo(this.map);
  }

  private subscribeToStableZone() {
    this.ngZone.onStable.subscribe(() => {
      this.map?.invalidateSize();
    });
  }

  private addMarkers() {
    if (!this.map) {
      console.warn('Cannot add markers: map is not initialized.');
      return;
    }

    if (!this.markers || this.markers.length === 0) {
      console.warn('No markers to display.');
      return;
    }

    this.markersManager.addMarkers(this.markers);
    this.markersManager.fitToMarkers();
  }

  private addResetControl() {
    if (!this.map) return;

    this.control = new ResetControlBuilder()
      .setPosition(CONTROLLERS_POSITION)
      .setContainerClasses(CONTROLLER_CLASS_CONTAINER)
      .setIconClasses(CONTROLLER_CLASS_ICON)
      .setResetAction(() => this.markersManager.flyToMarkers())
      .build();

    this.control.addTo(this.map);
  }

  private addLayerController() {
    if (!this.map || !this.markers || this.markers.length === 0) {
      console.warn('Cannot add layer controller: map or markers are not initialized.');
      return;
    }

    const layerController = new LayerControllerBuilder()
      .setPosition(CONTROLLERS_POSITION)
      .addMarkerGroups(this.markers)
      .createLayerGroups()
      .build();

    layerController.addTo(this.map);
  }
}
