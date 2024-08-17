import ConsultaTipo from '#models/consulta_tipo';
import type { HttpContext } from '@adonisjs/core/http'

interface DadosFormatados {
    tipo: string;
    id?: number
    companiaId: number
}

export default class ConsultaTiposController {
    async index () {
        return ConsultaTipo.all()
    }

    async store({request, response}: HttpContext) {
        try {
            const dadosFormatados: DadosFormatados = request.only(['tipo', 'companiaId']);
            
            await ConsultaTipo.create(dadosFormatados)

            return response.created("Tipo de Consulta criado com sucesso");

        } catch (error) {
            return response.json({ "Erro ao Criar Tipo de Consulta" : error })
        }
    }

    async destroy({params, response}: HttpContext) {
        const { id } = params

        try {
            const consultaTipo = await ConsultaTipo.find(id)

            consultaTipo?.delete()

            return response.noContent()
        } catch (error) {
            return response.badRequest({ message: 'Erro ao deletar Tipo de Consulta' })
        }
    }
}