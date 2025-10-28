# m7-ae2-abpro

Ángela Bravo Palma

Puedes ver la aplicación hosteada en la descripción del repo en Github o haciendo clic [**acá**.](https://m7ae2abpro.web.app/login)

UPDATE: puedes probar los test unitarios con npm run test:unit

## Aprendizaje esperado

Implementar un aplicativo web que consume datos desde una API REST utilizando la librería Axios para dar solución a una problemática.

## Actividad

La empresa de enseñanza en línea “adweb online” se encuentra en la búsqueda de un programador en Vue.JS que implemente un pequeño sistema de administración de cursos en conjunto con Firebase para lograr administrar la base de datos y solo permitir el acceso a usuarios registrados. Igualmente necesita que incorpores algún Framework de UI para Vue que permita darle estilo al sistema.

### Desarrollo

- Crear un proyecto Vue que implemente Vue Roter, Vuex y Firestore para gestionar los cursos de la empresa. Este proyecto debe estar enlazado con Firestore, por lo que debes trabajar con una cuenta en Google. Si no la posees, debes crear una. 
- Crear una interfaz de acceso a usuarios mediante una vista de login y otra de registro de usuarios . Solo los usuarios registrados en el sistema de autenticación de Firestore podrán ingresar a la aplicación. La validación debe realizarse por dirección de correo electrónico y clave.
- Al validarse correctamente las credenciales de usuario en la interfaz de acceso “Login” o “Registro”, se debe desplegar una interfaz principal “Home” donde se muestran todos los cursos que se encuentren en la base de datos mediante tarjetas o cards.
- Igualmente, debe existir un menú de navegación o “NavBar” que contenga el correo electrónico del usuario en la parte superior derecha en conjunto con un botón, icono o enlace, que al hacer clic cierre la sesión de usuario activa en ese momento, sin importar la vista que se encuentre activa. Al cerrar la sesión, el usuario será redirigido inmediatamente a la vista de acceso o “Login”.
- Crear una interfaz que permita administrar los cursos. Esta interfaz sólo debe activarse si el usuario se encuentra correctamente autentificado. Para acceder a ella se debe hacer mediante el menú de navegación “NavBar” o menú lateral con los nombres de las rutas disponibles.
- Asimismo, la interfaz de administración debe desplegar una tabla con el listado de cursos disponibles en la base de datos. Además debe tener botones o enlaces que permitan agregar, eliminar y/o editar cursos.
- El botón o enlace para agregar un nuevo curso ubicado en la interfaz de administración debe ejecutar una ventana emergente o modal al hacerle un clic. Esta ventana emergente o modal debe contener un formulario que permite agregar todos los datos (nombre, url de la imagen del curso, cupos, inscritos, duración, costo, código y descripción)
- Al agregar un curso a la base de datos de Firebase se debe desplegar un modal, popup o alert que nos pregunte si deseamos agregar dicho curso, el cual tendrá dos (02) botones que serán “Cancelar” y “Agregar Curso”. Si el usuario presiona “Cancelar”, el modal deberá desaparecer. En cambio si el usuario presiona “Agregar Curso”, el sistema deberá agregar el registro en la base de datos de Firebase; al momento de agregar el registro, se deben actualizar todas las interfaces que muestran los cursos e informar que el curso fue agregado.
- Para eliminar cursos se debe desplegar una ventana emergente, modal, popup o alert que nos pregunte si realmente se desea eliminar el curso seleccionado, que tendrá dos (2) botones que serán “Cancelar” y “Sí, borrar”. Si el usuario hace un clic sobre “Cancelar”, el modal deberá desaparecer. En cambio si el usuario presiona “Sí, borrar”, el sistema deberá eliminar el curso en la base de datos de Firebase e indicar que el curso fue eliminado correctamente. Actualizando al instante todas las vistas que muestran información sobre los cursos.
- Para editar cursos, el usuario debe hacer un clic sobre el botón, enlace o icono relacionado al curso que desea editar mostrado en la interfaz de administración, para así redirigir al usuario a la interfaz de edición, se debe desplegar un formulario con la información precargada del curso que se desea editar, dando la oportunidad al usuario de editar el curso seleccionado.
- Al actualizar el curso se debe desplegar un modal, popup o alert indicando que la actualización fue realizada, por lo tanto, el sistema deberá actualizar el curso correspondiente en la base de datos de Firebase modificando todas las vistas que muestran los cursos instantanemante y retornando al usuario a la vista de administración automáticamente. 

Con todo lo anterior listo, ya se puede compilar el proyecto en modo producción y enviarlo a Firebase Hosting. Crear el proyecto mediante el entorno de desarrollo de Vue-CLI, el cual debe contener:

- Por lo menos dos (02) dependencias externas instaladas y configuradas en el archivo main.js.
- Vuex, Vue Router.
- Utilizar Vue Router para controlar y proteger las rutas, así como crear los redireccionamientos necesarios.
- Crear rutinas que permitan conectarse con Firebase Authentication.
- Implementar el método “create User With Email And Password” en la vista pública de registro para crear nuevos usuarios en Firebase Authentication.
- Utilizar el método “sign In With Email And Password” en la vista de login para ingresar a la aplicación con datos de usuarios
existentes.
- Emplear el método “sign Out” en la barra de navegación o “navbar” para cerrar la sesión de un usuario activo en el momento.
- Aplicar el método “on Auth State Changed” para identificar el ingreso o salida de usuarios de la aplicación, agregando una ventana modal o mensaje indicando que el usuario ingresó correctamente al sistema desde este método en específico.

Desarrollar el sitio web utilizando Vuex para almacenar y modificar los estados.

- Utilizar getters para dejar la información disponible a cualquiera de los componentes o vistas.
- Implementar mutations para modificar los estados de la aplicación.
- Emplear action para ejecutar las mutations en Vuex, traer la información de la base de datos de Firebase, así como para actualizar, agregar y eliminar cursos.
- Utilizar los estados de Vuex para almacenar la información del usuario que inicie o se registre en la aplicación.
- Crear rutinas que permitan conectarse con Cloud Firestore.
- Implementar el método “on Snapshot” para leer la base de datos en tiempo real.
- Utilizar el método “add” para agregar nuevos valores a la base de datos.
- Emplear el método “update o set” para actualizar o modificar valores existentes en la base de datos.
- Aplicar el método “delete” para eliminar valores existentes en la base de datos.

Desarrollar las interfaces de la aplicación utilizando Bootstrsp para Vue.

Aplicar deploy a la aplicación final y subirla a Firebase Hosting.

Listado inicial de cursos a registrar en la base de datos de firebase:

```json
{
 "codigo": "0001",
 "nombre": "HTML",
 "estado": true, 
 "precio": "30000",
 "duracion":"1 mes",
 "descripcion": "curso html",
 "cupos": 10,
 "inscritos": 0,
 "img":
"https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png"
},
{
 "codigo": "0002",
 "nombre": "CSS",
 "estado": false,
 "precio": "20000",
 "duracion":"1 mes",
 "descripcion": "curso css",
 "cupos": 20,
 "inscritos": 0,
 "img": "https://lineadecodigo.com/wpcontent/uploads/2014/04/css.png"
},
{
 "codigo": "0003",
 "nombre": "SASS",
 "estado": true,
 "precio": "40000",
 "duracion":"2 mes",
 "descripcion": "curso sass",
 "cupos": 30,
 "inscritos": 0,
 "img":
"https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png"
},
{
 "codigo": "0004",
 "nombre": "VUE",
 "estado": false,
 "precio": "50000",
 "duracion":"3 mes",
 "descripcion": "curso vue",
 "cupos": 15,
 "inscritos": 0,
 "img": "https://thumbs.gfycat.com/PinkPiercingBullsize_restricted.gif"
},
```

## Requerimientos

- Este proyecto debe estar enlazado con Firestore, por lo que debes trabajar con una cuenta en Google. Si no la posees, debes crear una.
- Crear una interfaz de acceso a usuarios mediante una vista de login y otra de registro de usuarios . Solo los usuarios registrados en el sistema de autenticación de Firestore podrán ingresar a la aplicación. La validación debe realizarse por dirección de correo electrónico y clave.
- Al validarse correctamente las credenciales de usuario en la interfaz de acceso “Login” o “Registro”, se debe desplegar una interfaz principal “Home” donde se muestran todos los cursos que se encuentren en la base de datos mediante tarjetas o cards.
- Igualmente, debe existir un menú de navegación o “NavBar” que contenga el correo electrónico del usuario en la parte superior derecha en conjunto con un botón, icono o enlace, que al hacer clic cierre la sesión de usuario activa en ese momento, sin importar la vista que se encuentre activa. Al cerrar la sesión, el usuario será redirigido inmediatamente a la vista de acceso o “Login”.
- Utilizar Vue Router para controlar y proteger las rutas, así como crear los redireccionamientos necesarios.
- Crear rutinas que permitan conectarse con Firebase Authentication.
- Implementar el método “create User With Email And Password” en la vista pública de registro para crear nuevos usuarios en Firebase Authentication.
- Utilizar el método “sign In With Email And Password” en la vista de login para ingresar a la aplicación con datos de usuarios existentes.
- Emplear el método “sign Out” en la barra de navegación o “navbar” para cerrar la sesión de un usuario activo en el momento.
- Aplicar el método “on Auth State Changed” para identificar el ingreso o salida de usuarios de la aplicación, agregando una ventana modal o mensaje indicando que el usuario ingresó correctamente al sistema desde este método en específico.


## URL para crear nuevos cursos:

https://icon2.cleanpng.com/20180810/ekz/11448a7a96ee808a3cdbaf0df9570976.webp