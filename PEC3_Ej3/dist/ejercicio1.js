"use strict";
//Sustituye /***/ por las instrucciones adecuadas que cumplan las operaciones 
//y salidas indicadas en los comentarios.
function printArray(array) {
    //code to print the array on console
    console.log(array.join()); // Usamos 'join' para imprimir los elementos del array separados por comas
}
let array = [2, 3, 4];
console.log(array.shift()); //2                          Con 'shift' eliminamos el primer elemento del array y lo devolvemos
printArray(array); // 3,4                                Por lo tanto, ahora imprime 3,4
array.push(5); // Introducimos por el final el elemento 5
printArray(array); // 3,4,5                              Por lo que se imprime 3,4,5
console.log(array.pop()); //5                            Usamos 'pop' para eliminar el último elemento del array y devolverlo
printArray(array); // 3,4                                Por lo que se imprime 3,4
array.push(1); // Introducimos por el final el elemento 1
printArray(array); // 3,4,1                              Por lo que imprimimos 3,4,1
array.unshift(8); //Se usa 'unshift' para introducir el elemento 8 por el principio
printArray(array); // 8,3,4,1                            Se imprime 8,3,4,1
/** check if every number is greater than 3 */
let everyisgreater = array.every(num => num > 3); // Usamos 'every' para comprobar si cada elemento del array es mayor que 3
console.log(everyisgreater); //false                    Como no es cierto, imprime 'false'
/** check if every number is less than 10 */
let everyisless = array.every(num => num < 10); // Usamos 'every' para comprobar si cada elemento del array es menor que 10
console.log(everyisless); //true                        Como es cierto, imprime 'true'
console.log(array.sort()); //1,3,4,8                     Se usa 'sort' para ordenar el array de menor a mayor, por lo que imprime 1,3,4,8
console.log(array.reverse()); //8,4,3,1                  Se usa 'reverse' para invertir el array, por lo que se imprime 8,4,3,1
