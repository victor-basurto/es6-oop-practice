import { FleetDataService } from './services/fleet-data-service.js';
import { fleet, CENTER_MAP_COORDINATES } from './data/fleet-data.js';
import { ApplicationBase } from './framework/aplication-base.js';
import { HomePage } from './pages/home-page.js';
import { CarsPage } from './pages/cars-page.js';
import { DronesPage } from './pages/drones-page.js';
import { MapsPage } from './pages/map-page.js';

const { log } = console;
const $body = $('body');

export class App extends ApplicationBase {
	constructor() {
		super('Fleet Manager');
		this.dataService = new FleetDataService();
		this.dataService.loadData(fleet);

		this.addRoute('Home', new HomePage(), true);
		this.addRoute('Cars', new CarsPage());
		this.addRoute('Drones', new DronesPage());
		this.addRoute('Map', new MapsPage());
	}
}
// let drawer = new TitleBar('Open Layers Cars');
// drawer.addLink('home', '/')
// drawer.addLink('about', '/about')
// drawer.addLink('contact', '/contact')
// drawer.addLink('goals', '/goals')
// drawer.appendToElement($body);

export let application = new App();
application.show( $body );
