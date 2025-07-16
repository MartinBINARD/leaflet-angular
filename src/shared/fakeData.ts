import { MarkerGroup } from "src/app/map/utils/controller/LayerControllerBuilder";

export const FAKE_MARKERS_LIST_1: MarkerGroup[] = [
  {coordinates: [-17.525040113732356, -149.52056762883547], popupContent: 'Marker 1A', name:'1A'},
  {coordinates: [-17.52075825738537, -149.52661583002177], popupContent: 'Marker 2A', name:'2A'},
  {coordinates: [-17.524202548059534, -149.5259306643132], popupContent: 'Marker 3A', name:'3A'},
]

export const FAKE_MARKERS_LIST_2: MarkerGroup[] = [
  {coordinates: [-17.539884325065643, -149.5671071249762], popupContent: 'Marker 1B', name:'1B'},
  {coordinates: [-17.543838637739814, -149.57881473910356], popupContent: 'Marker 2B', name:'2B'},
  {coordinates: [-17.54453958738667, -149.5731009760051], popupContent: 'Marker 3B', name:'3B'},
]

export const FAKE_MARKER_GROUPS: MarkerGroup[] = [
  ...FAKE_MARKERS_LIST_1,
  ...FAKE_MARKERS_LIST_2,
]