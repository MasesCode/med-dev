import Usuario from '#models/usuario'
import UsuarioTipo from '#models/usuario_tipo'
import type { HttpContext } from '@adonisjs/core/http'

interface DadosFormatadosStore {
    nome_completo: string
    usuario_tipo_id: number
    compania_id: number
    email?: string | null 
    password: string
}

interface DadosFormatadosUpdate {
    nome_completo: string | null
    usuario_tipo_id: number | null
    compania_id: number | null
    email?: string | null 
    password: string | null
}

const ERRO_CRIAR_USUARIO = "Erro ao Criar Usuário";
const ERRO_ATUALIZAR_USUARIO = "Erro ao Atualizar Usuário";

export default class UsuariosController {
    async index() {
        //TO DO: LOGICA DE COMPANHIA
        return await Usuario.all()
    }

    async store({request, response}: HttpContext) {
        const dadosFormatados: DadosFormatadosStore = request.only([
            'nome_completo',
            'usuario_tipo_id',
            'email',
            'compania_id',
            'password'
        ]) as DadosFormatadosStore;
        
        const validaTipoUsuario = await UsuarioTipo.query().where('id', dadosFormatados.usuario_tipo_id).first()

        if (!validaTipoUsuario) {
            return response.badRequest({ [ERRO_CRIAR_USUARIO]: "Tipo de usuário inválido ou não informado" })
        }
        
        if (validaTipoUsuario.$extras.tipo !== 'Cliente' && !dadosFormatados.email) {
            return response.badRequest({ [ERRO_CRIAR_USUARIO]: "Email obrigatório" })
        }

        try {
            await Usuario.create(dadosFormatados)

            return response.created("Usuário criado com sucesso");
        } catch (error) {
            return response.badRequest({ [ERRO_CRIAR_USUARIO]: error.message })
        }
    }

    async update({request, response, params}: HttpContext) {
        const dadosFormatados: DadosFormatadosUpdate = request.only([
            'nome_completo',
            'usuario_tipo_id',
            'compania_id',
            'email',
            'password'
        ]) as DadosFormatadosUpdate;

        const { usuario_tipo_id, email } = dadosFormatados
        const validaTipoUsuario = usuario_tipo_id !== null
            ? await UsuarioTipo.query().where('id', usuario_tipo_id).first()
            : null

        if (!validaTipoUsuario) {
            return response.badRequest({ [ERRO_ATUALIZAR_USUARIO]: "Tipo de usuário inválido ou não informado" })
        }
        
        if (validaTipoUsuario.$extras.tipo !== 'Cliente' && !!email) {
            return response.badRequest({ [ERRO_ATUALIZAR_USUARIO]: "Email obrigatório" })
        }

        try {
            const usuarioAtualizar = await Usuario.query().where('id', params.id).first()
            
            if (usuarioAtualizar) {
                await usuarioAtualizar.merge(dadosFormatados)
                await usuarioAtualizar.save()
            }

            return response.created("Usuário atualizado com sucesso");
        } catch (error) {
            return response.badRequest({ [ERRO_ATUALIZAR_USUARIO]: error.message })
        }
    }

    async show({ params, response }: HttpContext) {
        const { id } = params

        try {
            const usuario = await Usuario.find(id)

            if (!usuario) {
                return response.notFound({ message: 'Usuário não encontrado' })
            }

            return response.json({ usuario })
        } catch (error) {
            return response.badRequest({ message: 'Erro ao buscar usuário' })
        }
    }

    async destroy({params, response}: HttpContext) {
        const { id } = params

        try {
            const usuario = await Usuario.find(id)

            usuario?.delete()

            return response.noContent()
        } catch (error) {
            return response.badRequest({ message: 'Erro ao deletar usuário' })
        }
    }
}
