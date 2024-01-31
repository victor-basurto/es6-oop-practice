import { TitleBar } from "../ui/title-bar";

export class ApplicationBase {
	constructor(title) {
		this.title = title;

		this.titleBar = new TitleBar(this.title);
		this.routeMap = {};
		this.defaultRoute = null;
	}
	addRoute(id, pageObject, defaultRoute = false) {
		this.titleBar.addLink(id, '');

		this.routeMap[id] = pageObject;
		if (defaultRoute) {
			this.defaultRoute = id;
		}
	}
	show(element) {
		this.titleBar.appendToElement(element);
		this.titleBar.jqueryElement.find('.mdl-navigation__link').click(evt => {
			let route = evt.target.innerHTML;
			this.activateRoute(route.trim());
		})
		if (this.defaultRoute) {
			this.activateRoute(this.defaultRoute)
		}
	}
	activateRoute(route) {
		let content = this.titleBar.jqueryElement.find('.page-content');
		content.empty();

		this.routeMap[route].appendToElement(content);
	}
}
