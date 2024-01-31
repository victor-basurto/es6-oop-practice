import { Page } from "../framework/page.js";
import { application } from "../app.js";
import { CENTER_MAP_COORDINATES, fleet } from "../data/fleet-data.js";
import { OlMaps } from "../ui/ol-maps.js";

export class MapsPage extends Page {
	constructor() {
		super('Maps');
	}
	createElement() {
		super.createElement();

		let olMaps = new OlMaps(CENTER_MAP_COORDINATES, fleet);
		olMaps.appendToElement(this.jqueryElement)
	}
	getElementString() {
		return `<div style="margin: 20px;"><h3>Drones</h3></div>`
	}
}
