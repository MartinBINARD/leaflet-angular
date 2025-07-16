import { Component } from '@angular/core';
import { FAKE_MARKER_GROUPS } from 'src/shared/fakeData';
import { MarkerGroup } from './map/utils/controller/LayerControllerBuilder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  FAKE_MARKER_GROUPS: MarkerGroup[] = FAKE_MARKER_GROUPS;
}