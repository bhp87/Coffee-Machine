const input = require('sync-input')
const LARGE_CUP_COEFFICIENT = 1.3;
const EXTRA_LARGE_CUP_COEFFICIENT = 1.5;

class CoffeeMachine {
    constructor() {
        this.water = 1000;
        this.milk = 540;
        this.nonLactoseMilk = 300;
        this.coffeeBeans = 120;
        this.nonCoffeineBeans = 120;
        this.disposableCups = 9;
        this.largeDisposableCups = 9;
        this.extraLargeDisposableCups = 9;
        this.money = 550;
        this.isRunning = true;
    }

    printState() {
        console.log(`The coffee machine has:`);
        console.log(`${this.water} ml of water`);
        console.log(`${this.milk} ml of milk`);
        console.log(`${this.nonLactoseMilk} ml of non-lactose milk`);
        console.log(`${this.coffeeBeans} g of coffee beans`);
        console.log(`${this.nonCoffeineBeans} g of non-coffeine beans`);
        console.log(`${this.coffeeBeans} g of coffee beans`);
        console.log(`${this.disposableCups} disposable cups`);
        console.log(`${this.largeDisposableCups} disposable cups`);
        console.log(`${this.extraLargeDisposableCups} disposable cups`);
        console.log(`$${this.money} of money
        `);
    }

    buyCoffee(choice, coffeeBeanType, milkType, cupSize) {
        let waterNeeded, milkNeeded, coffeeBeansNeeded, cost;
        switch (choice) {
            case 1: // Espresso
                waterNeeded = 250;
                milkNeeded = 0;
                coffeeBeansNeeded = 16;
                cost = 4;
                break;
            case 2: // Latte
                waterNeeded = 350;
                milkNeeded = 75;
                coffeeBeansNeeded = 20;
                cost = 7;
                break;
            case 3: // Cappuccino
                waterNeeded = 200;
                milkNeeded = 100;
                coffeeBeansNeeded = 12;
                cost = 6;
                break;
            default:
                return;
        }
        if (cupSize > 1) {
            waterNeeded = cupSize === 2 ? waterNeeded * LARGE_CUP_COEFFICIENT : waterNeeded * EXTRA_LARGE_CUP_COEFFICIENT;
            milkNeeded = cupSize === 2 ? milkNeeded * LARGE_CUP_COEFFICIENT : milkNeeded * EXTRA_LARGE_CUP_COEFFICIENT;
            coffeeBeansNeeded = cupSize === 2 ? coffeeBeansNeeded * LARGE_CUP_COEFFICIENT : coffeeBeansNeeded * EXTRA_LARGE_CUP_COEFFICIENT;
            cost = cupSize === 2 ? cost * LARGE_CUP_COEFFICIENT : cost * EXTRA_LARGE_CUP_COEFFICIENT;
        }


        if (this.water < waterNeeded) {
            console.log("Sorry, not enough water!");
            return;
        } else if ((this.milk < milkNeeded && milkType === "1") || this.nonLactoseMilk < milkNeeded && milkType === "2") {
            console.log("Sorry, not enough milk!");
            return;
        } else if ((this.coffeeBeans < coffeeBeansNeeded && coffeeBeanType === "1") || (this.nonCoffeineBeans < coffeeBeansNeeded && coffeeBeanType === "2")) {
            console.log("Sorry, not enough coffee beans!");
            return;
        } else if ((this.disposableCups < 1 && cupSize === 1) || (this.largeDisposableCups < 1 && cupSize === 2) || (this.extraLargeDisposableCups < 1 && cupSize === 3)) {
            console.log("Sorry, not enough disposable cups!");
            return;
        } else {
            console.log("I have enough resources, making you a coffee!");
        }
        this.water -= waterNeeded;
        this.milk = milkType === "1" ? this.milk -= milkNeeded : this.milk;
        this.nonLactoseMilk = milkType === "2" ? this.nonLactoseMilk -= milkNeeded : this.nonLactoseMilk;
        this.coffeeBeans = coffeeBeanType === "1" ? this.coffeeBeans -= coffeeBeansNeeded : this.coffeeBeans;
        this.disposableCups = cupSize === 1 ? this.disposableCups -= 1 : this.disposableCups;
        this.largeDisposableCups = cupSize === 2 ? this.largeDisposableCups -= 1 : this.largeDisposableCups;
        this.extraLargeDisposableCups = cupSize === 3 ? this.extraLargeDisposableCups -= 1 : this.extraLargeDisposableCups;
        this.money += cost;
    }

    fillSupplies(waterToAdd, milkToAdd, nonLactoseMilkToAdd, coffeeBeansToAdd, nonCoffeineBeansToAdd, cupsToAdd, largecupsToAdd, extralargecupsToAdd) {
        this.water += waterToAdd;
        this.milk += milkToAdd;
        this.nonLactoseMilk += nonLactoseMilkToAdd;
        this.coffeeBeans += coffeeBeansToAdd;
        this.nonCoffeineBeans += nonCoffeineBeansToAdd;
        this.disposableCups += cupsToAdd;
        this.largeDisposableCups += largecupsToAdd;
        this.extraLargeDisposableCups += extralargecupsToAdd;
    }

    takeMoney() {
        console.log(`I gave you $${this.money}
        `);
        this.money = 0;
    }

    remainingResources() {
        console.log()
        this.printState();
    }

    exit() {
        //console.log("Shutting down the coffee machine.");
        this.isRunning = false;
    }
}


const coffeeMachine = new CoffeeMachine();
while (coffeeMachine.isRunning) {


    const action = input("Write action (buy, fill, take, remaining, exit):\n");
    if (action === "buy") {
        console.log()
        const choice = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:\n");
        const coffeeBeanType = input("What coffee bean type do you want to use? 1 - regular, 2 - non-coffeine, back - to main menu:\n");
        const milkType = input("What milk type do you want to use? 1 - regular, 2 - non-lactose, back - to main menu:\n");
        const cupSize = input("What cup size do you want to use? 1 - small, 2 - large, 3 - extra large, back - to main menu:\n");
        if (cupSize === "back" || coffeeBeanType === "back" || milkType === "back") {
            continue;
        }

        coffeeMachine.buyCoffee(Number(choice), coffeeBeanType, milkType, cupSize);
        console.log();

    } else if (action === "fill") {
        const water = input("Write how many ml of water you want to add:\n");
        const milk = input("Write how many ml of milk you want to add:\n");
        const nonLactoseMilk = input("Write how many ml of non-lactose milk you want to add:\n");
        const coffeeBeans = input("Write how many grams of coffee beans you want to add:\n");
        const nonCoffeineBeans = input("Write how many grams of non-coffeine beans you want to add:\n");
        const cups = input("Write how many disposable cups you want to add:\n");
        const largeCups = input("Write how many large disposable cups you want to add:\n");
        const extraLargeCups = input("Write how many extra large disposable cups you want to add:\n");

        coffeeMachine.fillSupplies(
            Number(water),
            Number(milk),
            Number(nonLactoseMilk),
            Number(coffeeBeans),
            Number(nonCoffeineBeans),
            Number(cups),
            Number(largeCups),
            Number(extraLargeCups));
        console.log();
    } else if (action === "take") {
        console.log();
        coffeeMachine.takeMoney();
    } else if (action === "remaining") {
        coffeeMachine.remainingResources();
    } else if (action === "exit") {
        coffeeMachine.exit();
    } else {
        console.log("Invalid action. Please try again.");
    }
}
