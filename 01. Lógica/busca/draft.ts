function inside(vet: number[], value: number): boolean {
    //IMPLEMENTAÇÃO
    // for (let i = 0; i < vet.length; i++) {
    //     if (value === vet[i]) {
    //         return true;
    //     }         
    // }
    // return false;

    //SIMPLIFICAÇÃO
    for (let elem of vet) {
        if (elem === value) {
        return vet.includes(value);
        }
    }
    return false;
}

function index_of(vet: number[], value: number): number {
    //IMPLEMENTAÇÃO
    // for (let i = 0; i < vet.length; i++) {
    //     if (value === vet[i]) {
    //         return i;
    //     }         
    // }
    // return -1;

    //SIMPLIFICAÇÃO
    for (let i = 0; i < vet.length; i++) {
        return vet.indexOf(value);
    }

}

function find_if(vet: number[]): number {
    //IMPLEMENTAÇÃO
    // for (let i = 0; i < vet.length; i++) {
    //     if (vet[i] > 0) {
    //         return i;
    //     }         
    // }
    // return -1;

    //SIMPLIFICAÇÃO
    for (let i = 0; i < vet.length; i++) {
        return vet.findIndex(value => value > 0);
    }

}

function min_element(vet: number[]): number {
    //IMPLEMENTAÇÃO
    // if (vet.length === 0) {
    //     return -1;
    // }
    // let posicion = 1;
    // for (let i = 0; i < vet.length; i++) {
    //     if (vet[i] < vet[posicion]) {
    //         posicion = i;
    //     } 
    // }
    // return posicion;

    //SIMPLIFICAÇÃO
    let smaller = Math.min(...vet);
    let position = vet.indexOf(smaller);
    return position;
}

function find_min_if(vet: number[]): number { 
    //IMPLEMENTAÇÃO
    // let minPosition = -1;
    // for (let i = 0; i < vet.length; i++) {
    //     if (vet[i] > 0  && (minPosition === -1 || vet[i] < vet[minPosition])) {
    //          minPosition = i;
    //     }
    // }
    // return minPosition;

    //SIMPLIFICAÇÃO
    let positive_numbers = vet.filter(valor => valor > 0);
    if (positive_numbers.length > 0) {
        let smaller = Math.min(...positive_numbers);
        return vet.indexOf(smaller);
    } else {
        return -1;
    }
}


// -------------------------- MAIN --------------------------

let cin : string[] = [];
try { cin = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => cin.length === 0 ? "" : cin.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if (args[0] === "end")   { 
            break;
        }
        else if (args[0] === "in"){
            let result = inside(to_vet(args[1]), +args[2]);
            write(result ? "true" : "false");
        }
        else if (args[0] === "index_of"){
            let result = index_of(to_vet(args[1]), +args[2]);
            write(result);
        }
        else if (args[0] === "find_if"){
            let result = find_if(to_vet(args[1]));
            write(result);
        }
        else if (args[0] === "min_element"){
            let result = min_element(to_vet(args[1]));
            write(result);
        }
        else if (args[0] === "find_min_if"){
            let result = find_min_if(to_vet(args[1]));
            write(result);
        }
        else {
            write("fail: Comando inválido");
        }
    }
}

main();



// Função auxiliar para converter de string para vetor
// "[1,2,3,4]" para [1, 2, 3, 4]
function to_vet(token: string): number[] {
    let size = token.length;
    let inside = token.substring(1, size - 1);
    return inside === "" ? [] : inside.split(",").map(x => +x)
}