import { Injectable } from '@nestjs/common';
import { ParceiroUsuarios } from '../models/parceiro-usuarios.model';

/**
 * Service responsável por gerenciar as operações relacionadas aos usuários parceiros
 */
@Injectable()
export class UsuariosService {
  /**
   * Busca todos os usuários
   */
  async findAll(): Promise<ParceiroUsuarios[]> {
    return ParceiroUsuarios.findAll();
  }

  /**
   * Busca um usuário pelo ID
   */
  async findById(id: number): Promise<ParceiroUsuarios | null> {
    return ParceiroUsuarios.findByPk(id);
  }

  /**
   * Busca um usuário pelo CPF
   */
  async findByCpf(cpf: string): Promise<ParceiroUsuarios | null> {
    return ParceiroUsuarios.findOne({ where: { cpf } });
  }

  /**
   * Cria um novo usuário
   */
  async create(data: Partial<ParceiroUsuarios>): Promise<ParceiroUsuarios> {
    return ParceiroUsuarios.create(data as any);
  }

  /**
   * Atualiza um usuário
   */
  async update(id: number, data: Partial<ParceiroUsuarios>): Promise<number> {
    const [affectedCount] = await ParceiroUsuarios.update(data, {
      where: { id },
    });
    return affectedCount;
  }

  /**
   * Remove um usuário
   */
  async delete(id: number): Promise<number> {
    return ParceiroUsuarios.destroy({ where: { id } });
  }
}
