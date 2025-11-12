import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ParceiroUsuarios } from './parceiro-usuarios.model';

/**
 * Model para a tabela parceiro_solicitacoes
 * Representa as solicitações feitas por parceiros no sistema
 */
@Table({
  tableName: 'parceiro_solicitacoes',
  timestamps: false, // Desabilita createdAt e updatedAt automáticos
})
export class ParceiroSolicitacoes extends Model<ParceiroSolicitacoes> {
  /**
   * ID único da solicitação
   */
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  /**
   * Status da solicitação (ativo/inativo)
   */
  @Column({
    type: DataType.ENUM('ativo', 'inativo'),
    allowNull: false,
    defaultValue: 'ativo',
  })
  status: 'ativo' | 'inativo';

  /**
   * Data e hora da solicitação
   */
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  dt_hr_solicitado: Date;

  /**
   * ID do usuário que fez a solicitação
   */
  @ForeignKey(() => ParceiroUsuarios)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
  })
  id_usuario: number;

  /**
   * ID do polo (opcional)
   */
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: true,
  })
  id_polo: number;

  /**
   * Tipo do certificado digital
   */
  @Column({
    type: DataType.ENUM(
      'A1PF_12M',
      'A3PF_36M',
      'A1PJ_12M',
      'A3PJ_36M',
      'A3PF_12M',
    ),
    allowNull: false,
  })
  tipo_cd: 'A1PF_12M' | 'A3PF_36M' | 'A1PJ_12M' | 'A3PJ_36M' | 'A3PF_12M';

  /**
   * CPF do cliente (para pessoa física)
   */
  @Column({
    type: DataType.CHAR(11),
    allowNull: true,
  })
  cpf: string;

  /**
   * Nome do cliente (para pessoa física)
   */
  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  nome: string;

  /**
   * CNPJ do cliente (para pessoa jurídica)
   */
  @Column({
    type: DataType.CHAR(14),
    allowNull: true,
  })
  cnpj: string;

  /**
   * Razão social do cliente (para pessoa jurídica)
   */
  @Column({
    type: DataType.STRING(180),
    allowNull: true,
  })
  razao_social: string;

  /**
   * Data de nascimento do cliente
   */
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  dt_nascimento: Date;

  /**
   * Email do cliente
   */
  @Column({
    type: DataType.STRING(180),
    allowNull: true,
  })
  email: string;

  /**
   * Telefone do cliente
   */
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  telefone: string;

  /**
   * Valor de custo do certificado
   */
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  valor_custo: number;

  /**
   * Valor de venda do certificado
   */
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  valor_venda: number;

  /**
   * Valor da diferença entre venda e custo
   */
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  valor_diferenca: number;

  /**
   * Status do pagamento para o parceiro
   */
  @Column({
    type: DataType.ENUM('Pendente', 'Pago'),
    allowNull: false,
    defaultValue: 'Pendente',
  })
  status_pagamento_para_parceiro: 'Pendente' | 'Pago';

  /**
   * Observações sobre a solicitação
   */
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  observacao: string;

  /**
   * Histórico de ações realizadas na solicitação
   */
  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  historico_acoes: string;

  /**
   * ID da integração com FCW (opcional)
   */
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: true,
  })
  id_fcw: number;

  /**
   * Relacionamento com o usuário
   */
  @BelongsTo(() => ParceiroUsuarios)
  usuario: ParceiroUsuarios;
}
