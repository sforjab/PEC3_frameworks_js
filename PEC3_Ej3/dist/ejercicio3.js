"use strict";
//Sustituye /***/ por las instrucciones adecuadas que cumplan las operaciones 
//y salidas indicadas en los comentarios.
// Al ser una clase abstracta, no podemos crear instancias de ella, sino de sus clases hijas
class Animal {
    constructor() {
        // Cuando las clases hijas llamen al constructor del padre, aumentará el contador 'population'
        Animal.population++;
    }
}
Animal.population = 0;
class Dog extends Animal {
    // Creamos el constructor de 'Dog', que llama al del padre e inicializa el atributo 'color'
    constructor(color) {
        super();
        this.color = color;
    }
    // Se implementa el método 'sound()' para la clase 'Dog'
    sound() {
        console.log('WOW');
    }
    iamadog() {
        console.log('yes, this is a dog');
    }
}
class Cat extends Animal {
    // Creamos el constructor de 'Cat', que llama al del padre e inicializa el atributo 'gender'
    constructor(gender) {
        super();
        this.gender = gender;
    }
    // Se implementa el método 'sound()' para la clase 'Cat'
    sound() {
        console.log('MEOW');
    }
    iamacat() {
        console.log('yes, this is a cat');
    }
}
let animals = [];
animals.push(new Cat('male'));
animals.push(new Dog('white'));
animals.push(new Cat('female'));
animals.push(new Dog('black'));
for (let animal of animals) { // Bucle para recorrer los animales
    // Llamamos a la función 'sound()' de cada animal
    animal.sound();
    // Si el animal es de la clase 'Dog', llamamos a la función 'iamadog()'
    if (animal instanceof Dog) {
        animal.iamadog();
        // Si el animal es de la clase 'Cat', llamamos a la función 'iamadog()'
    }
    else if (animal instanceof Cat) {
        animal.iamacat();
    }
}
/**  loop prints these lines
MEOW
yes, this is a cat
WOW
yes, this is a dog
MEOW
yes, this is a cat
WOW
yes, this is a dog
*/
console.log(Animal.population); //4
