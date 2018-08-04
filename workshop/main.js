import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import sync from 'ol-hashed';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';

const source = new VectorSource({
  format: new GeoJSON(),
  url: './data/countries.json'
});

const map = new Map({
  target: 'map-container',
  layers: [
    new VectorLayer({
      source: source
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
sync(map);

map.addInteraction(new Modify({
  source: source
}));

map.addInteraction(new Draw({
  type: 'Polygon',
  source: source
}));

navigator.geolocation.getCurrentPosition(function(pos) {
  const coords = fromLonLat([pos.coords.longitude, pos.coords.latitude]);
  map.getView().animate({center: coords, zoom: 8});
});
