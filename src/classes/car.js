import { Vehicle } from './vehicle.js';
export class Car extends Vehicle {
    constructor(license, model, latLong) {
        super(license, model, latLong);
        this.make = null;
        this.mileage = null;
        this.fuelType = null;
        this.location = null;
    }
}