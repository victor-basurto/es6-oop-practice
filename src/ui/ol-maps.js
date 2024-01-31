import Feature from 'ol/Feature';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {Icon, Style} from 'ol/style';
import {OGCMapTile, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import { BaseElement } from "./base-element.js";

const { log } = console;

export class OlMaps extends BaseElement {
	constructor(centerMap, mapData) {
		super();
		this.centerMap = centerMap;
		this.mapData = mapData;
	}
	createElement() {
		super.createElement();

		let mapFeatures = this.mapData.map(mapFeature => {
			const [lat, long] = mapFeature.latLong.split(' ').map(Number.parseFloat)
			return new Feature({
				geometry: new Point(fromLonLat([long, lat]))
			})
		})
		const vectorSource = new VectorSource({ features: mapFeatures })
		const vectorLayer = new VectorLayer({ source: vectorSource })

		setTimeout(() => {
			const map = new Map({
				target: "map",
				layers: [
					new TileLayer({ source: new OSM() }),
					vectorLayer
				],
				view: new View({
					center: fromLonLat(this.centerMap),
					zoom: 4,
				}),
			});
		}, 200)
	}
	getElementString = () => `<div id="map"></div>`;
}
