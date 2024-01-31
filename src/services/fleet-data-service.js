import { Car } from '../classes/car.js';
import { Drone } from '../classes/drone.js';
import { DataError } from './data-error.js';
export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
		this.mapCoordinates = [];
        this.errors = [];
    }
    loadData(fleet) {
        fleet.map(fleetItem => {
			if (!this.validateCoordinates(fleetItem)) {
				let coordinates = this.loadCoordinates(fleetItem);
				if (coordinates) {
					this.mapCoordinates.push(coordinates);
				} else {
					let e = new DataError('invalid coordinates entry: ', fleetItem)
				}
			}
            switch(fleetItem.type) {
                case 'car':
                    if (this.validateCarData(fleetItem)) {
                        let car = this.loadCar(fleetItem);
                        if (car) {
                            this.cars.push(car);
                        }
                    } else {
                        let e = new DataError('invalid car data', fleetItem);
                        this.errors.push(e);
                    }
                    break;
                case 'drone':
                    if (this.validateDroneData(fleetItem)) {
                        let drone = this.loadDrone(fleetItem);
                        if (drone) {
                            this.drones.push(drone);
                        }
                    } else {
                        let e = new DataError('invalid drone data', fleetItem);
                        this.errors.push(e);
                    }
                    break;
                default:
                    let e = new DataError('Invalid vehicle type', fleetItem);
                    this.errors.push(e);
                    break;
            }

        });
    }
    loadCar(data) {
        try {
            const c = new Car(data.license, data.model, data.latLong);
            c.mileage = data.mileage;
            c.make = data.make;
            c.fuelType = data.fuelType;
            c.location = data.location;
            return c;
        } catch (error) {
            this.errors.push(new DataError('error loading car: ', data));
        }
        return null;
    }
    loadDrone(data) {
        try {
            const d = new Drone(data.license, data.model, data.latLong);
            d.airTimeHours = data.airTimeHours;
            d.base = data.base;
			d.type = data.type;
            return d;
        } catch (error) {
            this.errors.push(new DataError('error loading drone: ', data));
        }
        return null;
    }
	loadCoordinates(data) {
		try {
			return data.latLong;
		} catch (e) {
			this.errors.push(new DataError('error loading coordinates: ', data));
		}
		return null;
	}
    validateCarData(car) {
        let requiredProps = 'license, model, latLong, make, mileage, fuelType, location'.split(', ');
        let hasErrors = false;
        for (let field of requiredProps) {
            if (!car[field]) {
                this.errors.push(new DataError(`invalid field: ${field}`, car));
                hasErrors = true;
            }
        }
        if (Number.isNaN(Number.parseFloat(car.mileage))) {
            this.errors.push(new DataError('invalid mileage', car));
            hasErrors = true;
        }
        return !hasErrors
    }
    validateDroneData(drone) {
        let requiredProps = 'license, model, latLong, type, base, airTimeHours'.split(', ');
        let hasErrors = false;
        for (let field of requiredProps) {
            if (!drone[field]) {
                this.errors.push(new DataError(`invalid field: ${field}`, drone));
                hasErrors = true;
            }
        }
        if (Number.isNaN(Number.parseFloat(drone.airTimeHours))) {
            this.errors.push(new DataError(`invalid airTimeHours: ${drone.airTimeHours}`, drone));
            hasErrors = true;
        }
        return !hasErrors
    }
	validateCoordinates(data) {
		let requiredProps = 'latLong';
		let hasErrors = false;
		if (!data[requiredProps]) {
			this.errors.push(new DataError('invalid map coordinates: ', data));
			console.log(this.errors)
			hasErrors = true;
		}
		return hasErrors;
	}

    getCarByLicense = (plates) => this.cars.find(car => car.license === plates);

    getCarsSortedByLicense = () => this.cars.sort((a, b) => a.license.localeCompare(b.license));

    getCarsByMake = (make) => this.cars.filter(car => car.make.toLowerCase().indexOf(make.toLowerCase()) >= 0);
}
