
class Pet {
    private energyMax: number;
    private hungryMax: number;
    private cleanMax: number;

    private energy: number;
    private hungry: number;
    private clean: number;

    private diamonds: number;
    private age: number;
    private alive: boolean;

    public constructor(energy: number, hungry: number, clean: number) {
        this.energyMax = energy;
        this.hungryMax = hungry;
        this.cleanMax = clean;

        this.energy = energy;
        this.hungry = hungry;
        this.clean = clean;

        this.diamonds = 0;
        this.age = 0;
        this.alive = true;
    }
    public setEnergy(value: number) {
        if(value <= 0){
            this.energy = 0;
            console.log("fail: pet morreu de fraqueza");
            this.alive = false;
        } else if(value > this.energyMax){
            this.energy = this.energyMax;
        } else {
            this.energy = value;
        } 
    }

    public setHungry(value: number) {
        if(value <= 0){
            this.hungry = 0;
            console.log("fail: pet morreu de fome");
            this.alive = false;
        } else if(value > this.hungryMax){
            this.hungry = this.hungryMax;
        } else {
        this.hungry = value;   
        } 
    }

    public setClean(value: number) {
        if(value <= 0){
            this.clean = 0;
            console.log("fail: pet morreu de sujeira");
            this.alive = false;
        } else if(value > this.cleanMax){
            this.clean = this.cleanMax;
        } else {
            this.clean = value;
        }
    }

    public setDiamonds(value: number) {
        this.diamonds = value;
    }

    public setAge(value: number) {
        this.age = value;
    }

    public toString(): string {
        return  `E:${this.energy}/${this.energyMax}` 
            + `, S:${this.hungry}/${this.hungryMax}` 
            + `, L:${this.clean}/${this.cleanMax}` 
            + `, D:${this.diamonds}, I:${this.age}`;
    }

    public getClean() {
        return this.clean;
    }
    public getHungry() {
        return this.hungry;
    }
    public getEnergy() {
        return this.energy;
    }

    public getCleanMax() {
        return this.cleanMax;
    }
    public getHungryMax() {
        return this.hungryMax;
    }
    public getEnergyMax() {
        return this.energyMax
    }

    public getDiamonds() {
        return this.diamonds;
    }
    public getAge() {
        return this.age;
    }
    public isAlive() {
        if (!this.alive) {
            console.log("fail: pet esta morto");
            return false;
        } else {
            return true;
        }
    }
}

class Game {

    pet: Pet;

    constructor(pet: Pet) {
        this.pet = pet;
    }

    //se estiver morto, avise e retorne false
    private testAlive(): boolean {
        return this.pet.isAlive();
    }
   
    public play() {
        if (!this.testAlive()) 
            return;
        this.pet.setEnergy(this.pet.getEnergy() - 2);
        this.pet.setHungry(this.pet.getHungry() - 1);
        this.pet.setClean(this.pet.getClean() - 3);
        this.pet.setAge(this.pet.getAge() + 1);
        this.pet.setDiamonds(this.pet.getDiamonds() + 1);
    }

    public shower() {
        if (!this.testAlive()) 
            return;
        this.pet.setEnergy(this.pet.getEnergy() - 3);
        this.pet.setHungry(this.pet.getHungry() - 1);
        this.pet.setClean(this.pet.getCleanMax());
        this.pet.setAge(this.pet.getAge() + 2);
    }

    public eat() {
        if (!this.testAlive()) 
            return;
        this.pet.setEnergy(this.pet.getEnergy() - 1);
        this.pet.setHungry(this.pet.getHungry() + 4);
        this.pet.setClean(this.pet.getClean() - 2);
        this.pet.setAge(this.pet.getAge() + 1);
    }

    public sleep() {
        if (!this.testAlive()) 
            return;

        if (this.pet.getEnergyMax() - this.pet.getEnergy() < 5) {
            console.log("fail: nao esta com sono");
            return;
        }
        this.pet.setEnergy(this.pet.getEnergyMax());
        this.pet.setHungry(this.pet.getHungry() - 1);
        this.pet.setAge(this.pet.getAge() + 5);
    }
    toString() {
        return this.pet.toString();
    }
}

let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let game = new Game(new Pet(0, 0, 0));

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "end")   { break;                                                            }
        else if (args[0] === "init")  { game = new Game(new Pet(+args[1], +args[2], +args[3])); }
        else if (args[0] === "show")  { write(game.toString());                                            }
        else if (args[0] === "play")  { game.play();                                                       }
        else if (args[0] === "eat")   { game.eat();                                                        }
        else if (args[0] === "sleep") { game.sleep();                                                      }
        else if (args[0] === "shower"){ game.shower();                                                     }
        else                          { write("fail: comando invalido");                                  }
    }
}

main();