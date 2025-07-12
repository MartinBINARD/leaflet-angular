import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initialiserCarte();
  }

  private initialiserCarte(): void {
    this.map = L.map('map').setView([-17.525040113732356, -149.52056762883547], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }
}
