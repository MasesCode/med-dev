/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'



router.group(() => {
    router.resource('usuario_tipos', 'UsuarioTiposController').only(['index', 'store'])
    router.resource('usuarios', 'UsuarioController').apiOnly()
}).prefix("api");

