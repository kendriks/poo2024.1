import { Lead } from "./lead";

class Pencil {
    private thickness: number;
    private tip: Lead | null;

    public constructor(thickness: number) { 
        this.thickness = thickness;
        this.tip = null;
    }

    public hasLead(): boolean {
        if (this.tip == null) {
            return false;
        } else {
            return true;
        }
    }

    public insert(lead: Lead): boolean {
        if (this.hasLead()) {
            console.log("fail: ja existe grafite");
            return false;
        } else if (lead.getThickness() !== this.thickness) {
            console.log("fail: calibre incompativel");
            return false;
        } else {
            this.tip = lead; 
            return true;
        }

    }

    public remove(): Lead | null {
        if (!this.hasLead()) {
            return null;
        } else{
            let pontaRemovida = this.tip;
            this.tip = null; 
            return pontaRemovida;
        }
    }

    writePage(): void {
        if (this.tip === null) {
            console.log("fail: nao existe grafite");
            return;
        } 
        
        if (this.tip.getSize() === 10)  {
            console.log("fail: tamanho insuficiente");
            return;
        } 

        const usoPorFolha = this.tip.usagePerSheet();
        if ((this.tip.getSize() - usoPorFolha) < 10) {
            this.tip.setSize(10);
            console.log("fail: folha incompleta");
            return;
        }

        this.tip.setSize(this.tip.getSize() - usoPorFolha);
}

            
    public toString(): string {
        let ponta = this.tip != null ? "[" + this.tip.toString() + "]" : "null";
        return "calibre: " + this.thickness + ", grafite: " + ponta;
    }

}

export { Pencil };