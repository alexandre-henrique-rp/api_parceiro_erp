import { HttpException, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ParceiroSolicitacoes } from '../sequelize/models/parceiro-solicitacoes.model';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacao.dto';

@Injectable()
export class SolicitacaoService {
  async create(createSolicitacaoDto: CreateSolicitacaoDto, user: any) {
    console.log("🚀 ~ SolicitacaoService ~ create ~ user:", user)
    try {
      const create = await ParceiroSolicitacoes.create({
        ...createSolicitacaoDto,
        id_usuario: user.id,
        id_polo: user.id_polo,
        valor_venda: user.api === 1 ? 0 : createSolicitacaoDto.valor_venda,
      });
      return {
        error: false,
        message: 'Solicitação criada com sucesso',
        total: 1,
        pages: 1,
        current_page: 1,
        status: 201,
        data: create
      };
    } catch (error) {
      const retorno: { error: boolean; message: string; status: number, total: number, pages: number, current_page: number, data?: any } = {
        error: true,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
        status: error.status || 500,
        total: 0,
        pages: 0,
        current_page: 0,
        data: null
      };
      throw new HttpException(retorno, retorno.status || 500);
    }
  }

  async findAll(user: any, query: {
    id?: string
    nome?: string
    cpf?: string
    email?: string
    tipo_cd?: 'A1PF_12M' | 'A3PF_36M' | 'A1PJ_12M' | 'A3PJ_36M' | 'A3PF_12M';
    page?: number
  }) {
    try {
      // Validação do tipo_cd
      if (query.tipo_cd && !['A1PF_12M', 'A3PF_36M', 'A1PJ_12M', 'A3PJ_36M', 'A3PF_12M'].includes(query.tipo_cd)) {
        throw new HttpException({
          error: true,
          message: 'Tipo de certificado digital inválido',
          status: 400,
          total: 0,
          pages: 0,
          current_page: 0,
          data: null
        }, 400);
      }

      // Construção dinâmica do where clause
      const whereClause: any = {
        id_usuario: user.id,
        id_polo: user.id_polo
      };

      // Adiciona filtros apenas se fornecidos
      if (query.id) whereClause.id = query.id;
      if (query.nome) whereClause.nome = { [Op.like]: `%${query.nome}%` };
      if (query.cpf) whereClause.cpf = query.cpf;
      if (query.email) whereClause.email = query.email;
      if (query.tipo_cd) whereClause.tipo_cd = query.tipo_cd;

      const page = parseInt(query.page?.toString() || '1');
      const limit = 30;
      const offset = (page - 1) * limit;

      // Busca paginada com contagem total
      const { count, rows } = await ParceiroSolicitacoes.findAndCountAll({
        attributes:['id','status','nome', 'tipo_cd', 'id_fcw'],
        where: whereClause,
        order: [['id', 'DESC']],
        limit,
        offset,
        raw: true
      });

      const totalPages = Math.ceil(count / limit);

      return {
        error: false,
        message: 'Lista de solicitações',
        total: count,
        pages: totalPages,
        current_page: page,
        status: 200,
        data: rows
      };
    } catch (error) {
      const retorno: { error: boolean; message: string; status: number, total: number, pages: number, current_page: number, data?: any } = {
        error: true,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
        status: error.status || 500,
        total: 0,
        pages: 0,
        current_page: 0,
        data: null
      };
      throw new HttpException(retorno, retorno.status || 500);
    }
  }

  async findOne(id: number, user: any) {
    try {
      const solicitacao = await ParceiroSolicitacoes.findOne({
        where: {
          id,
          id_usuario: user.id,
          id_polo: user.id_polo
        },
        raw: true
      });

      if (!solicitacao) {
        throw new HttpException({
          error: true,
          message: 'Solicitação não encontrada ou não autorizada',
          status: 404,
          total: 0,
          pages: 0,
          current_page: 0,
          data: null
        }, 404);
      }

      return {
        error: false,
        message: 'Solicitação encontrada',
        total: 1,
        pages: 1,
        current_page: 1,
        status: 200,
        data: solicitacao
      };
    } catch (error) {
      const retorno: { error: boolean; message: string; status: number, total: number, pages: number, current_page: number, data?: any } = {
        error: true,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
        status: error.status || 500,
        total: 0,
        pages: 0,
        current_page: 0,
        data: null
      };
      throw new HttpException(retorno, error.status || 500);
    }
  }

  async update(id: number, updateSolicitacaoDto: UpdateSolicitacaoDto, user: any) {
    try {
      const [affectedCount] = await ParceiroSolicitacoes.update(updateSolicitacaoDto, {
        where: {
          id,
          id_usuario: user.id, // Garante que só atualiza solicitações do próprio usuário
          id_polo: user.id_polo  // Garante que só atualiza solicitações do mesmo polo
        }
      });

      if (affectedCount === 0) {
        throw new HttpException({
          error: true,
          message: 'Solicitação não encontrada ou não autorizada para este usuário',
          status: 404,
          total: 0,
          pages: 0,
          current_page: 0,
          data: null
        }, 404);
      }

      return {
        error: false,
        message: 'Solicitação atualizada com sucesso',
        total: affectedCount,
        pages: 1,
        current_page: 1,
        status: 200,
        data: {
          id,
          updated_by: user.id,
          updated_at: new Date(),
          fields_updated: Object.keys(updateSolicitacaoDto)
        }
      };
    } catch (error) {
      const retorno: { error: boolean; message: string; status: number, total: number, pages: number, current_page: number, data?: any } = {
        error: true,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
        status: error.status || 500,
        total: 0,
        pages: 0,
        current_page: 0,
        data: null
      };
      throw new HttpException(retorno, error.status || 500);
    }
  }

  async remove(id: number, user: any) {
    try {
      // Soft delete: atualiza status para 'inativo' em vez de deletar
      const [affectedCount] = await ParceiroSolicitacoes.update({
        status: 'inativo',
        id_usuario: null,
        id_polo: null
      }, {
        where: {
          id,
          id_usuario: user.id, // Garante que só remove solicitações do próprio usuário
          id_polo: user.id_polo  // Garante que só remove solicitações do mesmo polo
        }
      });

      if (affectedCount === 0) {
        throw new HttpException({
          error: true,
          message: 'Solicitação não encontrada ou não autorizada para este usuário',
          status: 404,
          total: 0,
          pages: 0,
          current_page: 0,
          data: null
        }, 404);
      }

      return {
        error: false,
        message: 'Solicitação removida com sucesso (status alterado para inativo)',
        total: affectedCount,
        pages: 1,
        current_page: 1,
        status: 200,
        data: {
          id: parseInt(id.toString()),
          status: 'inativo',
          removed_by: user.id,
          removed_at: new Date()
        }
      };
    } catch (error) {
      const retorno: { error: boolean; message: string; status: number, total: number, pages: number, current_page: number, data?: any } = {
        error: true,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
        status: error.status || 500,
        total: 0,
        pages: 0,
        current_page: 0,
        data: null
      };
      throw new HttpException(retorno, error.status || 500);
    }
  }
}
