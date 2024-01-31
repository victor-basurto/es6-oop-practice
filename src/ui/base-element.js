export class BaseElement {
    constructor() {
        this.jqueryElement = null;
    }
    appendToElement(el) {
        this.createElement();
        el.append( this.jqueryElement );
        this.enableJS();
    }
    createElement() {
        let s = this.getElementString();
        this.jqueryElement = $( s );
    }
    getElementString() {
        throw 'Please override getElementString() in BaseElement';
    }
    enableJS() {
        componentHandler.upgradeElement(this.jqueryElement[0]);
    }
}