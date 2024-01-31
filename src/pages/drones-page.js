import { Page } from "../framework/page.js";
import { DataTable } from "../ui/data-table.js";
import { application } from "../app.js";
import { DRONE_HEADERS } from "../data/fleet-data.js";
export class DronesPage extends Page {
	constructor() {
		super('Drones');
	}
	createElement() {
		super.createElement();

		const dt = new DataTable(DRONE_HEADERS, application.dataService.drones);
		console.log(application.dataService.drones)
		dt.appendToElement(this.jqueryElement);
	}
	getElementString() {
		return `<div style="margin: 20px;"><h3>Drones</h3></div>`
	}
}
