import { Sala } from "./sala";

class Client {
    private id : String;
    private fone: number;

    constructor(id: String, fone: number) {
        this.id = id;
        this.fone = fone;
    }

    public getId(): String {
        return this.id;
    }

    public setId(id: String): void {
        this.id = id;
    } 

    public getFone(): number {
        return this.fone;
    }

    public setFone(fone: number): void {
        this.fone = fone;
    }

    public toString(): String {
        let saida = this.id + ":" + this.fone;

        return saida;
    }
}

export {Client};