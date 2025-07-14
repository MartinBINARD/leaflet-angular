import { Component } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import { FAKE_MARKERS_LIST_1 } from 'src/shared/fakeData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  FAKE_MARKERS_LIST_1: LatLngExpression[] = FAKE_MARKERS_LIST_1;
}