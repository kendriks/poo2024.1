import { Client } from "./client";

class Sala {
    private cadeiras: Array <Client | null>;

    constructor(capacidade: number){
        this.cadeiras = [];
        for (let i = 0; i < capacidade; i++) {
            this.cadeiras.push(null);
        }
    }

    public procurar(nome: string): number {
        for (let i = 0; i < this.cadeiras.length; i++) {
            if (this.cadeiras[i] != null && this.cadeiras[i]!.getId() === nome){
                return i;
            }
        }
        return -1;
    }

    public verificarIndice(indice: number): boolean {
        if (indice <= this.cadeiras.length) {
            return true;
        }
        return false;
    }

    public reservar(id: string, fone: number, ind: number): boolean {
        //índice inválido
        if (!this.verificarIndice(ind)) {
            console.log("fail: cadeira nao existe");
            return false;
        }
    
        //cadeira ocupada
        if (this.cadeiras[ind] !== null) {
            console.log("fail: cadeira ja esta ocupada");
            return false;
        }

        //procurar na sala
        if (this.procurar(id) != -1) {
            console.log("fail: cliente ja esta no cinema");
            return false;
        }

        let novoCliente = new Client(id, fone);
        this.cadeiras[ind] = novoCliente;

        return true;
    }

    public cancelar(id: string): void {
        if (this.procurar(id) < 0) {
            console.log("fail: cliente nao esta no cinema");
        } else {
           this.cadeiras.splice(this.cadeiras[id], 1, null);
           //this.cadeiras[id] = '-';
        }
    }

    public toString(): string {
        let saida = "[";
        for (let i = 0; i < this.cadeiras.length; i++) {
            if (this.cadeiras[i] != null) {
               saida += this.cadeiras[i]?.toString(); 
               saida += " ";
            } else {
               saida += "- ";
            }
        }
        if (this.cadeiras.length > 0)
            saida = saida.slice(0 , -1);
        saida += "]";

        return saida;
    }
            
}
export {Sala};
    