import { Component } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import { FAKE_CLUSTER_LIST } from 'src/shared/fakeData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  FAKE_CLUSTER_LIST: LatLngExpression[] = FAKE_CLUSTER_LIST;
}