import { BaseElement } from "../ui/base-element";

export class Page extends BaseElement {
	constructor(pageTitle) {
		super();
		this.pageTitle = pageTitle;
	}
}
