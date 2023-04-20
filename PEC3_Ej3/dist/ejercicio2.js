"use strict";
//Sustituye /***/ por las instrucciones adecuadas que cumplan las operaciones 
//y salidas indicadas en los comentarios.
let myHangar = {};
myHangar['123Z'] = {
    model: 'airbus',
    npassengers: 200
};
myHangar['H789'] = {
    model: 'boeing',
    npassengers: 151
};
for (const key in myHangar) {
    const plane = myHangar[key];
    console.log(`${key}:${plane.model}(${plane.npassengers})`);
}
/** Print following lines (going through the object)
 * 123Z:airbus(200)
 * H789:boeing(151)
 */
