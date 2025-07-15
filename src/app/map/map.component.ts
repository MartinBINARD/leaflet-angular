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
import { LatLngExpression } from 'leaflet';
import { FAKE_MARKERS_LIST_1, FAKE_MARKERS_LIST_2 } from 'src/shared/fakeData';
import { ResetControlBuilder } from './utils/controller/ResetControllerBuilder';
import { ReviewMarkerManager } from './utils/markers/ReviewMarkerManager';

const DEFAULT_CENTER_COORDINATES: LatLngExpression = [-17.525040113732356, -149.52056762883547];
const DEFAULT_ZOOM = 14;
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
  @Input() coordinates: LatLngExpression = DEFAULT_CENTER_COORDINATES;
  @Input() zoom: number = DEFAULT_ZOOM;
  @Input() markers: LatLngExpression[] = [...FAKE_MARKERS_LIST_1, ...FAKE_MARKERS_LIST_2];

  private map!: L.Map;
  private control!: L.Control;
  private markersManager!: ReviewMarkerManager

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    if (this.coordinates && this.zoom != null) {
      this.initializeMap();
      this.markersManager = new ReviewMarkerManager(this.map);
      this.addMarkers(this.markersManager);
      this.addResetControl(this.markersManager);
      this.subscribeToStableZone();
    } else {
      console.warn('Map not initialized: missing coordinates or zoom.');
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

    this.map = L.map(container, {
      center: this.coordinates,
      zoom: this.zoom,
    });

    L.tileLayer(URL_TEMPLATE, {
      maxZoom: 18,
      minZoom: 3,
    }).addTo(this.map);
  }

  private subscribeToStableZone() {
    this.ngZone.onStable.subscribe(() => {
      this.map?.invalidateSize();
    });
  }

  private addMarkers(markersManager: ReviewMarkerManager) {
    if (!this.map) {
      console.warn('Cannot add markers: map is not initialized.');
      return;
    }

    if (!this.markers || this.markers.length === 0) {
      console.warn('No markers to display.');
      return;
    }

    markersManager.addMarkers(this.markers);
    markersManager.fitToMarkers();
  }

  private addResetControl(markersManager: ReviewMarkerManager) {
    if (!this.map) return;

    this.control = new ResetControlBuilder()
      .setPosition(CONTROLLERS_POSITION)
      .setContainerClasses(CONTROLLER_CLASS_CONTAINER)
      .setIconClasses(CONTROLLER_CLASS_ICON)
      .setResetAction(() => markersManager.resetView())
      .build();

    this.control.addTo(this.map);
  }

}
