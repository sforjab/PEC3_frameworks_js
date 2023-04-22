Para realizar la transpilación, se ha utilizado Webpack. Aún así, se incluye fichero 'tsconfig.json' para la alternativa con 'tsc'.

Los pasos a seguir han sido los siguientes:

1. Se han instalado las dependencias para poder utilizar Webpack:

```
npm install webpack webpack-cli ts-loader typescript --save-dev
```

2. Tras la instalación, se ha creado el fichero de configuración 'webpack.config.js' a partir de los ejemplos proporcionados.

3. Tras esto, ejecutamos Webpack con la siguiente instrucción:

```
npx webpack --config webpack.config.js
```

4. La ejecución de la instrucción anterior ha creado el fichero 'bundle.js' (como le especificamos en 'webpack.config.js') dentro del directorio 'dist'.

5. El último paso antes de probar la aplicación es sustituir los scripts que contenía nuestro 'index.html' para dejar solamente:

```
<script src="../dist/bundle.js"></script>
```

6. Para finalizar, abrimos el fichero 'index.html' en el navegador y comprobamos que la aplicación funciona correctamente.