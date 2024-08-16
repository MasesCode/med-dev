import Usuario from '#models/usuario'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsuariosController {
    async index() {
        return await Usuario.all()
    }

    async store({request, response}: HttpContext) {
        const dadosFormatados = request.all()

        try {
            await Usuario.create(dadosFormatados)

            return response.created("Usuário criado com sucesso");
        } catch (error) {
            return response.badRequest({ "Erro ao Criar Usuário" : error })
        }
    }
}