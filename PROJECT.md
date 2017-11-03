## Instrucciones sobre instalación y visualización del proyecto

1. Instalar node js 6.11.1 con npm (node package manager).

2. Abrir una consola o terminal (para usuarios mac) y ubicarse en la raíz del proyecto.

3. Luego ejecutar "npm install", para instalar los módulos de node js y javascript.

4. Luego ejecutar "npm run api", esto para correr el api de la base de datos local.

5. Ejecutar "npm run dev", esto crea un servidor local para el proyecto y abre la aplicación en una ventana donde se pueda visualizar.

6. Tener en cuenta que los dos últimos comandos deben correrse en ventanas de consola separadas.

*Nota:* Las anteriores instrucciones comprenden el levantamiento del ambiente de desarrollo, para hacer un compilado para producción se puede ejecutar "npm run prod" y ejecutar esta carpeta en un servidor, tener en cuenta que el archivo db.json que comprende los datos del proyecto se deben agregar al directorio raíz en el servidor o la carpeta donde se ejecuta el proyecto..

## Instrucciones de uso

*Nota:* Para el desarrollo del proyecto se tomó una parte del objeto y se manejo desde el repositorio local para poder hacer modificaciones directas sobre estos datos.

1. Se listan 10 usuarios con tres propiedades cada uno.

2. A continuación encontrará que cada uno disponde de un botón de "Editar y Eliminar".

3. Para "Editar" un usuario se hace click en el botón "Editar", se abre un campo para cada propiedad del usuario y una vez editado se hace click en "Guardar".

4. Si no se quieren realizar cambios una vez se han editado las propiedades, se puede hacer click en el botón "Cancelar".

5. También puede borrar un usuario, haciendo click en el botón de "Eliminar".

6. También se puede crear un usuario llenando los campos en la parte del footer de la tabla y luego haciendo click en el botón "Agregar usuario".

