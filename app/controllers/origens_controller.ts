import Origem from '#models/origem'
import type { HttpContext } from '@adonisjs/core/http'

interface DadosFormatados {
    nome: string
    id?: number
    companiaId: number
}

export default class OrigensController {
    async index() {
        return await Origem.all()
    }

    async store({request, response}: HttpContext) {
        try {
            const dadosFormatados: DadosFormatados = request.only([
                'nome',
                'companiaId'
            ]) as DadosFormatados;
            
            await Origem.create(dadosFormatados)

            return response.created("Origem criada com sucesso");
        } catch (error) {
            return response.json({ "Erro ao criar origem" : error })
        }
    }

    async destroy({params, response}: HttpContext) {
        const { id } = params

        try {
            const usuario = await Origem.find(id)

            usuario?.delete()

            return response.noContent()
        } catch (error) {
            return response.badRequest({ message: 'Erro ao deletar origem' })
        }
    }
}