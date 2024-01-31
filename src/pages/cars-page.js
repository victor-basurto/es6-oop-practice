import { Page } from "../framework/page.js";
import { DataTable } from "../ui/data-table.js";
import { application } from "../app.js";
import { CAR_HEADERS } from "../data/fleet-data.js";
export class CarsPage extends Page {
	constructor() {
		super('Cars');
	}
	createElement() {
		super.createElement();

		const dt = new DataTable(CAR_HEADERS, application.dataService.cars);
		dt.appendToElement(this.jqueryElement);
	}
	getElementString() {
		return `<div style="margin: 20px;"><h3>Cars</h3></div>`
	}
}
