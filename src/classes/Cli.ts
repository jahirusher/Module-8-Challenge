import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | null;
  exit: boolean;

  constructor() {
    this.vehicles = [];
    this.selectedVehicleVin = null;
    this.exit = false;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  startCli() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Create a new vehicle',
            'Select an existing vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        if (answers.action === 'Create a new vehicle') {
          this.createVehicle();
        } else if (answers.action === 'Select an existing vehicle') {
          this.selectVehicle();
        } else {
          console.log('Exiting CLI...');
          this.exit = true;
        }
      });
  }

  createVehicle() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Truck', 'Car', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  createTruck() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()],
          parseInt(answers.towingCapacity)
        );

        // push the truck to the vehicles array
        this.vehicles.push(truck);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        this.performActions();
      });
  }

  createMotorbike() {
    inquirer.prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Motorbike Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Motorbike Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Motorbike Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Motorbike Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Motorbike Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Motorbike Top Speed',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        // Create an array of Wheel objects
        const wheels: Wheel[] = [new Wheel(answers.rearWheelBrand)];

        // Create a new Motorbike instance with the provided answers
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          wheels
        );

        // Push the motorbike to the vehicles array
        this.vehicles.push(motorbike);

        // Set the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;

        // Perform actions on the motorbike
        this.performActions();
      });
  }

  createCar() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()]
        );

        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  performActions() {
    // Implementation for performing actions on the selected vehicle
  }

  selectVehicle() {
    // Implementation for selecting an existing vehicle
  }
}

export default Cli;
