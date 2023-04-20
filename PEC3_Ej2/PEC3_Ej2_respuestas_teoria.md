**Modifica el código para conseguir que aparezca una línea roja de error en el IDE avisándote de que se está disparando un TypeError. Explica por qué se ha producido esto y qué ventajas tiene:**

La modificación realizada en el código ha consistido en modificar la primera línea para que **a** sea la suma de 1 y '2' ('2' como string en lugar de number). Lo vemos en la siguiente captura:

[Error provocado](https://drive.google.com/file/d/1sD6dWXsyXZlFkmAn1gd9Im7nt8anKtJf/view?usp=sharing)

Se ha modificado la primera línea para que **a** sea la suma de 1 y '2'. A continuación se explica lo que ocurre:

- La variable **a** está siendo asignada con una operación de suma entre un número y una cadena, lo que resultará en una concatenación de cadenas. Entonces **a** será igual a la cadena '12'.

- Luego, en la variable **b**, se está tratando de sumar '12' y 3, lo que también resultará en una concatenación de cadenas, y **b** será igual a la cadena '123'.

- En la siguiente línea, la variable **c** es un objeto con dos propiedades *apple* y *banana*, cuyos valores son **a** y **b**, respectivamente. Por lo tanto, *c.apple* será igual a '12' y *c.banana* será igual a '123'.

- Finalmente, en la última línea, se está tratando de multiplicar *c.apple* por 4, lo que producirá un **TypeError**, ya que no se puede multiplicar una cadena por un número. El error producido es:

    ```
    La parte izquierda de una operación aritmética debe ser de tipo "any", "number", "bigint" o un tipo de enumeración.
    ```

La aparición de avisos de error en el código, nos ayuda a detectar y solucionar problemas. En este ejemplo, el TypeError nos indica que hay un problema con una operación de multiplicación, lo que permite al desarrollador encontrar y arreglar el error.

Los errores en el código pueden causar comportamientos impredecibles, fallas del sistema o pérdida de datos. Por eso es importante detectarlos y corregirlos lo más pronto posible para evitar problemas mayores. Los errores que se detectan y se corrigen durante la fase de desarrollo son más fáciles y menos costosos de solucionar que los que se descubren más adelante en el ciclo de vida del software.

***

**1. Para cada uno de los valores del fichero code2.ts, ¿Qué tipo de datos inferirá TypeScript? Explica por qué se ha inferido este tipo de datos**

- La variable **a** será inferida como 'number', ya que se le asigna un valor numérico literal.
- La variable **b** será inferida como 'string' porque se le asigna una cadena literal.
- La variable **c** será inferida como 'string', debido a que se le asigna una cadena literal.
- La variable **d** será inferida como 'boolean[]' porque se le asigna una array de valores booleanos.
- La variable **e** será inferida como un '{ type: string }' porque se le asigna un objeto que tiene una propiedad 'type' de tipo 'string'.
- La variable **f** será inferida como '(number | boolean)[]' porque se le asigna una matriz de valores numéricos y booleanos. Este caso es así porque puede contener cualquiera de estos tipos.
- La variable **g** será inferida como 'number[]' porque se le asigna un array de valores numéricos.
- La variable **h** será inferida como 'null' porque se le asigna explícitamente un valor nulo en su declaración.

**2. ¿Por qué se dispara cada uno de los errores del fichero code3.ts?**

- El error de la línea 2, se produce porque se intenta asignar un valor nuevo a 'i' que ha sido definida con un valor constante de 3. Al definir 'i' como una constante, su valor no puede ser modificado posteriormente.

- El segundo error (línea 6) es producido al tratar de añadir un valor de tipo 'string' al array 'j', que ha sido definido como un array numérico con los valores [1, 2, 3]. El método 'push' espera un argumento numérico, pero se le está pasando un argumento de tipo 'string', provocando el error.

- El tercer error (línea 8), se produce debido a que se está intentando asignar un valor numérico a la variable 'k' que es de tipo 'never'. El tipo 'never' es un tipo que nunca ocurre y, debido a esto, no puede ser asignado a ningún valor, incluyendo valores numéricos.

- Por último, el error de la línea 11 es causado al tratar de realizar una operación matemática con una variable de tipo 'unknown'. El tipo 'unknown' es un tipo que no se puede determinar en tiempo de compilación, por lo que no se puede realizar ninguna operación matemática o lógica en ella sin antes verificar su tipo.

**3. ¿Cuál es la diferencia entre una clase y una interface en TypeScript?**

En TypeScript, tanto las clases como las interfaces son utilizadas para definir la forma de un objeto y los tipos de datos que contiene, pero tienen algunas diferencias importantes.

Básicamente, una clase es una plantilla que se utiliza para crear objetos con propiedades y métodos específicos, mientras que una interfaz es una especie de lista de requisitos que un objeto debe cumplir para ser considerado válido y poder ser utilizado en diferentes partes del código. 

Además de ser una plantilla para crear objetos, una clase también puede contener comportamientos y funciones, es decir, no solo define las propiedades y métodos de un objeto, sino que también puede contener código que manipula y utiliza esas propiedades y métodos. Por su parte, las interfaces no pueden contener implementaciones de funciones, solo pueden definir la estructura de un objeto.