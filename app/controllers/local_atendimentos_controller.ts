import LocalAtendimento from '#models/local_atendimento'
import type { HttpContext } from '@adonisjs/core/http'

interface DadosFormatadosStore {
    nome: string
    rua: string
    bairro: string
    numero: number
    cidade: string
    estado: string
    id?: number
}

interface DadosFormatadosUpdate {
    nome: string | null
    rua: string | null
    bairro: string | null
    numero: number | null
    cidade: string | null
    estado: string | null
    id?: number
}

export default class LocalAtendimentosController {
    async index() {
        return await LocalAtendimento.all()
    }

    async store({request, response}: HttpContext) {
        try {
            const dadosFormatados: DadosFormatadosStore = request.only([
                'nome',
                'rua', 
                'bairro',
                'numero',
                'cidade',
                'estado'
            ]) as DadosFormatadosStore;
            
            await LocalAtendimento.create(dadosFormatados)

            return response.created("Local de Atendimento criado com sucesso");
        } catch (error) {
            return response.json({ "Erro ao criar Local de Atendimento" : error })
        }
    }

    async udpate({request, response, params}: HttpContext) {
        try {
            const dadosFormatados: DadosFormatadosUpdate = request.only([
                'nome',
                'rua', 
                'bairro',
                'numero',
                'cidade',
                'estado'
            ]) as DadosFormatadosUpdate;

            const localAtualizar = await LocalAtendimento.query().where('id', params.id).first()
            
            if (localAtualizar) {
                localAtualizar.merge(dadosFormatados)
                await localAtualizar.save()
            }

            return response.created("Local de Atendimento criado com sucesso");
        } catch (error) {
            return response.json({ "Erro ao criar Local de Atendimento" : error })
        }
    }

    async destroy({params, response}: HttpContext) {
        const { id } = params

        try {
            const usuario = await LocalAtendimento.find(id)

            usuario?.delete()

            return response.noContent()
        } catch (error) {
            return response.badRequest({ message: 'Erro ao deletar origem' })
        }
    }
}