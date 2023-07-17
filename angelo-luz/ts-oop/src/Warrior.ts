import { Character } from "./Character";
import { Tools } from "./utils/Tools";

export class Warrior extends Character {
    private _offense: number
    private _defense: number

    constructor(name: string) {
        super(name) // Inheritance
        this._offense = Tools.randomize(70, 100),
        this._defense = Tools.randomize(50, 80)
    }

    practice(type: string) {
        if (type === 'offense') {
            this._offense += 10
            this._stamina -= 30
        }
        
        if (type === 'defense') {
            this._defense += 7
            this._stamina -= 35
            this._health += 3
        }

        return 'Type should be "offense" or "defense".'
    }

    rest() {
        this._stamina += Tools.randomize(10, 30)
    }

    attack(player: string): string { // Polymorphism and override working here
        return `Attacking ${player} with ${this._offense} of damage.`
    }
}