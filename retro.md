# Retrospectiva

COMENZAR A HACER:
- Mejor organizacion:
    Planificar mejor las tareas para ser mas eficientes y optimizar los tiempos del grupo y a manera individual.
- Hacer reuniones mas breves
- Hacer menos reuniones:
    Creemos que lo ideal es hacer una reunion para establecer las pautas y otra para controlar los avances.
HACER MAS:
- Mejor división de tareas
- Establecer plazos para control de avances
CONTINUAR HACIENDO:
- Buena comunicación
HACER MENOS:
- Menos reuniones:
    Creemos que lo ideal es hacer una reunion para establecer las pautas y otra para controlar los avances.
DEJAR DE HACER:
- Reuniones extensas

# Retrospectiva Sprint 3
- COMENZAR A HACER
    - Utilizar mas herramientas de gestion como Trello
    - Reuniones cortas semanales
- HACER MAS:
    - Mejorar la comunicacion
    - Establecer plazos para los trabajos
CONTINUAR HACIENDO:
    - Distribucion de tareas
HACER MENOS:
    - Mal uso del tiempo para ejecutar las tareas 
DEJAR DE HACER:
    - Postergar a ultimo momento

# Weekly 12/07
Alejandro:
    - Estuve trabajando en la modificacion de las rutas e implementacion de controllers para las distintas vistas. Ya estan hechas las vistas de las cuentas de usuarios y los historiales de reserva. Ademas, los formularios de registro de usuarios y negocios, almacenan los datos que se ingresan en archivos JSON.
    - Actualmente estoy limitado porque todavia no esta hecha la base de datos para platos y restaurantes. Una vez definamos que datos deben tener y se creen, habria que configurar los controladores y luego ya podriamos avanzar para usar esa informacion en las vistas.
    - En la proxima semana voy a avanzar con:
        1 - Crear los archivos JSON para platos y restaurantes
        2 - Implementar validaciones y session en el login
        3 - Seguir puliendo el CSS de algunas vistas que no terminan de quedar del todo bien
    (*) Actualice el tablero de trabajo con estas tareas y proyectos.
    https://trello.com/b/xbzGtulH

Julieta:
    -Estuve creando las vistas del listado de restaurantes y de platos, me faltaria hacerlas responsive utilizando media queries.

# Weekly 19/07
Alejandro:
    - Reorganizacion de los controladores. En el mainController solamente quedaron los metodos que trabajan sobre la pagina en general. Dentro userController y user.js, se encuentra la creacion, edicion, eliminacion y login/logout de usuarios. Por ultimo en productsController y products.js, esta la posibilidad de agregar, editar y eliminar platos si se trata de un usuario negocio.
    - Creé los json de usuarios, restaurantes, productos y ordenes/pedidos. Los mismos estan vinculados mediante ids que permiten relacionarlos e iterar la informacion en forma dinamica en cada vista que los requiera.
    - Implementación de session. El sitio ya reconoce el login y logout de usuarios, tanto para clientes como para restaurantes. Para evitar confusiones, se configuraron en distinas cookies pero solamente permite un solo login a la vez.
    - Se rehicieron todas las rutas y links de los botones de la pagina para que se adapten a las nuevas rutas en funcion a session (antes estaban hechas con parametros dinamicos).
    - Se creó una sola vista de header que muestra el carrito y la cuenta de usuario o negocio, segun quien esta logeado.
    - Implementacion de bcrypt para el cifrado de contraseñas en el alta de usuarios y tambien en el formulario de edicion de los mismos.
    - Implementacion de multer, para en la edicion de usuarios y alta de productos/platos. Los usuarios se dan de alta en forma automatica con un avatar por defecto, sin requerir en el mismo la carga de una imagen, por eso se implementó solamente en la edicion.
    - Creé la carpeta middlewares e implementé 3 middlewares iguales pero que se adaptan segun sea usuario o negocio. Los middlewares creados son el redireccionamiento si no se esta aun logeado (guest), no permitir el registro ni login, si ya esta logueado un usuario (auth) y por ultimo, el userLogged/buisnessLogged que almacena en session el usuario guardado en una cookie, si ya se logeó.
     - Renombré casi todas las vistas para que queden ordenadas por vistas para usuarios y negocios.
     - En la proxima semana voy a avanzar con:
        1 - Comenzar a trabajar nuevamente en el CSS de algunas vistas. Ver si quitamos el fondo con la imagen y hacemos algo nuevo o solamente lo readaptamos para que quede mejor.
        2 - Darle funcionalidad a los botones de confirmar y cancelar reserva. Hay que agregar un aviso de en que estado esta el pedido para que el usuario sepa en la seccion de reservas.
        3 - Implementar validaciones en los formularios.
    - Pendientes para ver:
        1 - Comenzar a definir el carrito y como se van a agregar los productos.
        2 - Definir si armamos la estructura para que se asignen mesas a los pedidos.
        3 - Creacion de cookies para sugerir platos o restaurantes.
        4 - Sistema de valoraciones y comentarios.
     (*) Actualice el tablero de trabajo con estas tareas y proyectos.
    https://trello.com/b/xbzGtulH

# Weekly 26/07
Alejandro:
    - Implementacion de una nav bar para dispositivos moviles
    - Ajustes estéticos para que el header quede igual en todas las vistas
    - Implementacion de los botones de cancelar o confirmar ordenes
    - Nuevo formato para el index, en el que se muestran las imagenes de productos
    - Implementacion de middlewares para que no se pueda acceder a rutas sin logeo y viceversa. Unifique el middleware de invitado, para que aplique a ambos usuarios
     - En la proxima semana voy a avanzar con:
        1 - Confirgurar la administracion de mesas para los negocios
        2 - Crear el menu desplegable superior cuando el usuario esta logeado
    - Pendiente: 
        1 - dar formato a los formularios de edicion, vista y creacion de mesas
        2 - agregar validacion para que no se puede agregar mas mesas en estado abierta si la capacidad del negocio esta al maximo

# Weekly 02/08
Alejandro:
    - Ajuste en el header y footer para que se adapten segun el body esta vacio o no.
    - Agregué las validaciones a los formularios de registro y de login.
    - Tambien implementé validaciones en la creacion de usuarios, negocios y habilitacion de mesas.
    - Agregue la funcionalidad de la administracion de mesas que luego va a ser utilizada en el carrito o bien, en el restaurant cuando el cliente ingresa.
     - En la proxima semana voy a avanzar con:
        1 - Crear las bases de datos sql y tablas
        2 - Configurar Sequelize
        3 - Crear el menu desplegable superior cuando el usuario esta logeado
    - Pendiente: 
        1 - Revisar el formato a los formularios de edicion, vista y creacion de mesas. Tambien seria bueno terminar de ver el header y footer para que sea homogeneo cuando un usuario esta logeado y cuando no lo esta.
        2 - agregar validacion para que no se puede agregar mas mesas en estado abierta si la capacidad del negocio esta al maximo

# Weekly 23/08
Alejandro:
    - Adaptación de todos los metódos del controlador para incorporar sequelize.
    - Mejoras en la estética de la administración de las ordenes, tanto para usuarios como para negocios.
    - Agregué link a los nombres de los productos para que en cualquier vista, permita haciendo click, consultar toda la información sobre los mismos.
    - Incorporo la una función para poder ver la capacidad disponible en el negocio
     - En la proxima semana voy a avanzar con:
        1 - Agregar mensaje de alerta para operaciones particulares (eliminar un usuario, mesa o producto)
        2 - Crear el menu desplegable superior cuando el usuario esta logeado
    - Pendiente: 
        1 - Agregar validación para que no permita registrar más de un usuario con el mismo correo.
        2 - agregar validacion para que no se puede agregar mas mesas en estado abierta si la capacidad del negocio esta al maximo
        3 - Agregar vista y controlador para que un negocio pueda consultar la informacion detallada de un pedido
# Weekly 30/08
Alejandro:
    - Generación de nuevos archivos para rutas, controlador y adaptación de las vistas, para que usuarios y negocios estén separados.
    - Incorporación de las APIs de google maps y geolocate para que cuando se ingresa a la vista de un producto, muestre un mapa con la ubicación del negocio.
    - Agregué validación para que no se puedan crear usuarios ni negocios con el mismo email.
    - Incorporación de vista y controlador para que un negocio pueda consultar la informacion detallada de un pedido
     - En la proxima semana voy a avanzar con:
        1 - Agregar mensaje de alerta para operaciones particulares (eliminar un usuario, mesa o producto)
        2 - Crear el menu desplegable superior cuando el usuario esta logeado
    - Pendiente: 
        1 - Formatear fechas de los pedidos
    
    