import { Injectable } from '@nestjs/common';
import { ParceiroSolicitacoes } from '../models/parceiro-solicitacoes.model';

/**
 * Service responsável por gerenciar as operações relacionadas às solicitações de parceiros
 */
@Injectable()
export class SolicitacoesService {
  /**
   * Busca todas as solicitações
   */
  async findAll(): Promise<ParceiroSolicitacoes[]> {
    return ParceiroSolicitacoes.findAll();
  }

  /**
   * Busca uma solicitação pelo ID
   */
  async findById(id: number): Promise<ParceiroSolicitacoes | null> {
    return ParceiroSolicitacoes.findByPk(id);
  }

  /**
   * Cria uma nova solicitação
   */
  async create(
    data: Partial<ParceiroSolicitacoes>,
  ): Promise<ParceiroSolicitacoes> {
    return ParceiroSolicitacoes.create(data as any);
  }

  /**
   * Atualiza uma solicitação
   */
  async update(
    id: number,
    data: Partial<ParceiroSolicitacoes>,
  ): Promise<number> {
    const [affectedCount] = await ParceiroSolicitacoes.update(data, {
      where: { id },
    });
    return affectedCount;
  }

  /**
   * Remove uma solicitação
   */
  async delete(id: number): Promise<number> {
    return ParceiroSolicitacoes.destroy({ where: { id } });
  }
}
