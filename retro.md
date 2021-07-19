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