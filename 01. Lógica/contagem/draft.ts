
function count(vet: number[], value: number): number {
    // let cont = 0;
    // for (let i = 0; i < vet.length; i++) {
    //     if (value === vet[i]) {
    //         cont += 1
    //     }
    // }
    // return cont;

    //SIMPLICAÇÃO
    let cont = vet.filter(vet => vet === value).length;
    return cont;
}

function sum(vet: number[]): number {
    // let positive_values = vet.map(Math.abs);
    // let sum = 0;
    // for (let i = 0; i < positive_values.length; i++) {
    //     sum += positive_values[i];
    // }
    // return sum;

    //SIMPLICAÇÃO
    return vet.reduce((sum, number) => sum + Math.abs(number), 0);
}

function average(vet: number[]): number {
    // let positive_values = vet.map(Math.abs);
    // let average = 0;
    // for (let i = 0; i < positive_values.length; i++) {
    //     average += positive_values[i] / positive_values.length;
    // }
    // return average;

    //SIMPLICAÇÃO
    return (sum(vet)) / vet.length;
}

function more_men(vet: number[]): string {
    // let men = 0;
    // let women = 0;
    // for (let i = 0; i < vet.length; i++) {
    //     if (vet[i] < 0) {
    //         women += 1;
    //     } else{
    //         men += 1;
    //     }
    // }
    // if (women > men) {
    //     return "women";
    // } else if (women < men) {
    //     return "men";
    // } else {
    //     return "draw";
    // }

    //SIMPLICAÇÃO
    let men = vet.filter(vet => vet >= 0).length;
    let women = vet.filter(vet => vet < 0).length;
    if (women > men) {
        return "women";
    } else if (women < men) {
        return "men";
    } else {
        return "draw";
    }
}

function half_compare(vet: number[]): string {
    // let first = 0;
    // let second = 0;
    // let positive_values = vet.map(Math.abs);
    // let vetlength = ((positive_values.length / 2) - 1);
    // for (let i = 0; i <= vetlength; i++) {
    //     first += positive_values[i];
    // }
    // for (let i = vetlength + 1; i < positive_values.length; i++) {
    //     second += positive_values[i];
    // }
    // if (first > second) {
    //     return "first";
    // } else if (first < second) {
    //     return "second";
    // } else {
    //     return "draw";
    //}

    //SIMPLICAÇÃO
    let positiveValues = vet.map(Math.abs);
    let midIndex = Math.floor(positiveValues.length/2);
    let first = positiveValues.slice(0, midIndex).reduce((sum, number) => sum + number, 0);
    let second = positiveValues.slice(midIndex).reduce((sum, number) => sum + number, 0);

    if (first > second) {
        return "first";
    } else if (first < second) {
        return "second";
    } else {
        return "draw";
    }
}

function sex_battle(vet: number[]): string {
// let men = 0;
// let women = 0;
//     for (let i = 0; i < vet.length; i++) {
//         if (vet[i] > 0) {
//             men += vet[i];
//         } else {
//             let positive = Math.abs(vet[i]);
//             women += positive;
//         }
//     }
//     if (women > men) {
//         return "women";
//     } else if (women < men) {
//         return "men";
//     } else {
//         return "draw";
//     }

    //SIMPLICAÇÃO
    let men = vet.filter(vet => vet > 0).reduce((sum, vet) => sum + vet, 0);
    let women = vet.filter(vet => vet < 0).reduce((sum, vet) => sum + Math.abs(vet), 0);

        if (women > men) {
            return "women";
        } else if (women < men) {
            return "men";
        } else {
            return "draw";
        }
}


// -------------------------- MAIN --------------------------

let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "end")          { break;                                                       }
        else if (args[0] === "count")        { write(count(to_vet(args[1]), +args[2]));                     }
        else if (args[0] === "sum")          { write(sum(to_vet(args[1])));                                 }
        else if (args[0] === "average")      { write(average(to_vet(args[1])).toFixed(2));                  }
        else if (args[0] === "more_men")     { write(more_men(to_vet(args[1])));                            }
        else if (args[0] === "half_compare") { write(half_compare(to_vet(args[1])));                    }
        else if (args[0] === "sex_battle")   { write(sex_battle(to_vet(args[1])));                          }
        else                                 { write("fail: comando invalido");                             }
    }
}

// Função auxiliar para converter de string para vetor
// "[1,2,3,4]" para [1, 2, 3, 4]
function to_vet(token: string): number[] {
    let size = token.length;
    let inside = token.substring(1, size - 1);
    return inside === "" ? [] : inside.split(",").map(x => +x)
}


main()

