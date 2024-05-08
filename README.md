# Proyecto 1 - Blog

Este proyecto utiliza las tecnologías de Vite + React para crear un sitio web responsive. Se utiliza un api para conectarse a una base de datos en la que se almacenan la información de los blogs.

## Tecnologías utilizadas

###### Vite + React
    Estas tecnologías permiten que la página sea reactive.

###### Postgresql
    Es el sistema de bases de datos que se utiliza. Se escogió este ya que es gratis de hostear.

###### Express
    Para manejar la conexión a la base de datos desde mi api.

## Instrucciones

El sitio web es hosteado en Netlify, en [este link.](https://main--monumental-cendol-98a3c4.netlify.app)

Al entrar a la página, se ve la página de usuario. En el encabezado de la página hay un enlace a la página de admin, en la cual hay que verificar nuestra identidad.

Al acceder como administrador, se pueden realiza las funciones de POST, PUT y DELETE con los botones de crear, actualizar y eliminar respectivamente. 

- POST:
    Permite crear una nueva entrada para el blog. Se llena la información en los campos correspondientes y luego se envía con SUBMIT.

- PUT:
    Permite actualizar la información de la entrada actual del blog. Al terminar de ingresar la nueva información, se envía con submit.

- DELETE:
    Elimina la entrada actual del blog.

**IMPORTANTE: Al realizar estas operaciones, la página no se actualiza instantaneamente, por lo que hay que refrescar la página o moverse a una entrada diferente y volver a la actual, para ver los cambios.**