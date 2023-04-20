//Sustituye /***/ por las instrucciones adecuadas que cumplan las operaciones 
//y salidas indicadas en los comentarios.

// Al ser una clase abstracta, no podemos crear instancias de ella, sino de sus clases hijas
abstract class Animal {
    static population: number = 0;
    constructor() {
        // Cuando las clases hijas llamen al constructor del padre, aumentará el contador 'population'
        Animal.population++;
    }
    public abstract sound(): void;
}

class Dog extends Animal {
    color: string;

    // Creamos el constructor de 'Dog', que llama al del padre e inicializa el atributo 'color'
    constructor(color: string) {
        super();
        this.color = color;
    }

    // Se implementa el método 'sound()' para la clase 'Dog'
    public sound(): void {
        console.log('WOW');
    }

    public iamadog() {
        console.log('yes, this is a dog');
    }
}

class Cat extends Animal {
    gender: string;
    
    // Creamos el constructor de 'Cat', que llama al del padre e inicializa el atributo 'gender'
    constructor(gender: string) {
        super();
        this.gender = gender;
    }

    // Se implementa el método 'sound()' para la clase 'Cat'
    public sound(): void {
        console.log('MEOW');
    }

    public iamacat() {
        console.log('yes, this is a cat');
    }
}

let animals: Animal[] = [];
animals.push(new Cat('male'));
animals.push(new Dog('white'));
animals.push(new Cat('female'));
animals.push(new Dog('black'));

for(let animal of animals){ // Bucle para recorrer los animales
    // Llamamos a la función 'sound()' de cada animal
    animal.sound();
    // Si el animal es de la clase 'Dog', llamamos a la función 'iamadog()'
    if (animal instanceof Dog) {
        animal.iamadog();
    // Si el animal es de la clase 'Cat', llamamos a la función 'iamadog()'
    } else if (animal instanceof Cat) {
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