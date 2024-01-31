import { application } from "../app.js";
import { Page } from "../framework/page";
import { Button } from "../ui/button";
import { Image } from "../ui/image";

export class HomePage extends Page {
	constructor() {
		super('Home');
	}
	createElement() {
		super.createElement();

		let droneImg = new Image('../../assets/drone.png');
		droneImg.appendToElement(this.jqueryElement);

		let styleString = 'width: 300px; height: 80px; font-size: 26px; margin: 10px;';
		let button = new Button('Self Driving Cars');
		button.setStyleString(styleString);
		button.appendToElement(this.jqueryElement);
		button.jqueryElement.click(() => application.activateRoute('Cars'));

		button = new Button('Drones');
		button.setStyleString(styleString);
		button.appendToElement(this.jqueryElement);
		button.jqueryElement.click(() => application.activateRoute('Drones'));
	}
	getElementString() {
		return '<div style="text-align: center;"><h3>Map</h3></div>'
	}
}
