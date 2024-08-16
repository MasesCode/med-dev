import UsuarioTipo from '#models/usuario_tipo'
import type { HttpContext } from '@adonisjs/core/http'

interface DadosFormatados {
    tipo: string;
    id?: number
}

export default class UsuarioTiposController {
    async index () {
        return UsuarioTipo.all()
    }

    async store({request, response}: HttpContext) {
        console.log("veio aq")
        return
        try {
            const dadosFormatados: DadosFormatados = request.only(['tipo']);
            
            await UsuarioTipo.create(dadosFormatados)

            return response.created("Usuário criado com sucesso");

        } catch (error) {
            return response.json({ "Erro ao Criar Tipo de Usuário" : error })
        }
    }
}