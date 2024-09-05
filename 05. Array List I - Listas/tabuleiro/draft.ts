
class Player {
    private label: number;     // indice do player   
    private pos: number;       // posição dele no tabuleiro
    private free: boolean;     // se ele pode andar no próximo rolar de dados ou não

    constructor(label: number) {
        this.label = label;
        this.pos = 0;
        this.free = true;
    }

    public getLabel(): number {
        return this.label;
    }

    public getPos(): number {
        return this.pos;
    }

    public setPos(pos: number) {
        this.pos = pos;
    }

    public setFree(free: boolean): void {
        this.free = free;
    }

    public isFree(): boolean {
        return this.free;
    }

    toString(): string {
        return "player" + this.label;
    }
}


class Board {
    trapList: number[]; // posição das armadilhas
    running: boolean;   // se o jogo acabou
    size    : number;   // tamanho do tabuleiro
    players : Player[]; // lista de jogadores

    constructor(nPlayers: number, size: number) {
        this.size = size + 1;
        this.trapList = [];
        this.running = true;
        this.players = [];
        for (let i = 1; i <= nPlayers; i++) {
            // push: adiciona elemento no final do array e retorna comprimento do novo array
            this.players.push(new Player(i));
        }
    }

    addTrap(pos: number) {
        this.trapList.push(pos);
        //this.trapList.splice(pos, 0, "x");
        return;
    }

    rollDice(value: number) {
        if (!this.running) {
            console.log("game is over");
            return;
        } 

        //pega o primeiro jogador
        let jogador = this.players[0];
        if (!jogador.isFree()) {
            if (value % 2 == 0) {
                jogador.setFree(true);
                console.log(`player${jogador.getLabel()} se libertou`);
            } else {
                console.log(`player${jogador.getLabel()} continua preso`);
            }
        } else {
            jogador.setPos(jogador.getPos() + value);
            if (jogador.getPos() < this.size) {
                console.log(`player${jogador.getLabel()} andou para ${jogador.getPos()}`);
            }  
            if (jogador.getPos() >= this.size) {
                jogador.setPos(this.size -1);
                console.log(`${jogador} ganhou`);
                this.running = false;
            } else if (this.trapList.indexOf(jogador.getPos()) != -1) {
                jogador.setFree(false);
                console.log(`player${jogador.getLabel()} caiu em uma armadilha`);
            }  
        }
        this.players.shift();
        this.players.push(jogador);
    }
    
    toString() {
        let str = "";
        for(let p of this.players) {
            let line: string[] = Array(this.size).fill(".")
            line[p.getPos()] = "" + p.getLabel();
            str += "player" + p.getLabel() + ": " + line.join("") + "\n";
        }

        let traps = Array(this.size).fill(".")
        for (let t of this.trapList)
            traps[t] = "x";
        str += "traps__: " + traps.join("");
        return str;
    }
};


// ------------ Funções Auxiliares --------------------
let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let board = new Board(0, 0);

    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if (args[0] == "end") { break; }
        else if (args[0] == "init") { board = new Board(+args[1], +args[2]); }
        else if (args[0] == "addTrap") { board.addTrap(+args[1]); }
        else if (args[0] == "roll") { board.rollDice(+args[1]); }
        else if (args[0] == "show") { write(board.toString()); }
        else { write("comando invalido"); }
    }
}

main()

