import { Tools } from "./utils/Tools";

export abstract class Character {
    private _name: string; // Private attributes should have "_"
    protected _health: number; // Can be seen only by inheritance
    protected _stamina: number; // Can be seen only by inheritance
    public race: string; // Can be seen/retrieved from anywhere

    constructor(name: string) {
        this._name = name,
        this._health = 100,
        this._stamina = Tools.randomize(50, 100),
        this.race = 'Human'
    }
    
    public get name(): string { // Getter
        return this._name
    }

    public set name(name: string) { // Setter
        this._name = name;
    }

    public abstract attack(player: string): string; // Polymorphism
}
