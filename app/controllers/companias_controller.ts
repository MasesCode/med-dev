import Compania from '#models/compania'
import type { HttpContext } from '@adonisjs/core/http'

interface DadosFormatadosStore {
    nome: string
    cnoj: string
    endereco: string 
}

interface DadosFormatadosUpdate {
    nome?: string
    cnoj?: string
    endereco?: string 
}



export default class CompaniasController {

    async index() {
        //TO DO: LOGICA DE MOSTRAR APENAS A DO USUARIO
        return await Compania.all()
    }
    
    async store({request, response}: HttpContext) {
        const dadosFormatados: DadosFormatadosStore = request.only([
            'nome',
            'cnoj',
            'endereco',
        ]) as DadosFormatadosStore;

        try {
            await Compania.create(dadosFormatados)

            return response.created("Empresa criado com sucesso");
        } catch (error) {
            return response.badRequest({ "Erro ao criar empresa": error.message })
        }
    }

    async update({request, response, params}: HttpContext) {
        const dadosFormatados: DadosFormatadosUpdate = request.only([
            'nome',
            'cnoj',
            'endereco',
        ]) as DadosFormatadosUpdate;

        try {
            const companiaAtualizar = await Compania.query().where('id', params.id).first()
            
            if (companiaAtualizar) {
                companiaAtualizar.merge(dadosFormatados)
                await companiaAtualizar.save()
            }


            return response.created("Empresa criado com sucesso");
        } catch (error) {
            return response.badRequest({ "Erro ao criar empresa": error.message })
        }
    }

    async show({ params, response }: HttpContext) {
        const { id } = params

        try {
            const compania = await Compania.find(id)

            if (!compania) {
                return response.notFound({ message: 'Empresa não encontrado' })
            }

            return response.json({ compania })
        } catch (error) {
            return response.badRequest({ message: 'Erro ao buscar Empresa' })
        }
    }

    async destroy({params, response}: HttpContext) {
        const { id } = params

        try {
            const compania = await Compania.find(id)

            compania?.delete()

            return response.noContent()
        } catch (error) {
            return response.badRequest({ message: 'Erro ao deletar Empresa' })
        }
    }
}