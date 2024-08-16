/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import UsuarioTiposController from '#controllers/usuario_tipos_controller'
import UsuarioController from '#controllers/usuario_controller'

router.group(() => {
    router.resource('usuario_tipos', UsuarioTiposController).only(['index', 'store'])
    router.resource('usuarios', UsuarioController).apiOnly()
}).prefix("api");
