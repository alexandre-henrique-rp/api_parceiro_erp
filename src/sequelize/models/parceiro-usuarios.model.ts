import { Table, Column, Model, DataType } from 'sequelize-typescript';

/**
 * Model para a tabela parceiro_usuarios
 * Representa os usuários parceiros no sistema
 */
@Table({
  tableName: 'parceiro_usuarios',
  timestamps: false,
})
export class ParceiroUsuarios extends Model<ParceiroUsuarios> {
  /**
   * ID único do usuário parceiro
   */
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  /**
   * Status do usuário (ativo/inativo)
   */
  @Column({
    type: DataType.ENUM('ativo', 'inativo'),
    allowNull: false,
    defaultValue: 'ativo',
  })
  status: 'ativo' | 'inativo';

  /**
   * Senha do usuário (criptografada)
   */
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  senha: string;

  /**
   * Perfil do usuário (ADM/USER)
   */
  @Column({
    type: DataType.ENUM('ADM', 'USER'),
    allowNull: false,
    defaultValue: 'USER',
  })
  perfil: 'ADM' | 'USER';

  /**
   * ID do polo (opcional)
   */
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: true,
  })
  id_polo: number;

  /**
   * Nome do polo (opcional)
   */
  @Column({
    type: DataType.STRING(120),
    allowNull: true,
  })
  nome_polo: string;

  /**
   * Nome do usuário
   */
  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  nome: string;

  /**
   * CPF do usuário (único)
   */
  @Column({
    type: DataType.CHAR(11),
    allowNull: false,
    unique: true,
  })
  cpf: string;

  /**
   * Telefone do usuário (opcional)
   */
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  telefone: string;

  /**
   * Email do usuário (opcional)
   */
  @Column({
    type: DataType.STRING(180),
    allowNull: true,
  })
  email: string;

  /**
   * Tipo de parceria
   */
  @Column({
    type: DataType.ENUM(
      'AGR',
      'ERP',
      'USER',
      'CONTADOR',
      'REVENDEDOR',
      'ASSOCIACAO',
      'OUTRO',
    ),
    allowNull: false,
    defaultValue: 'OUTRO',
  })
  tipo_parceria:
    | 'AGR'
    | 'ERP'
    | 'USER'
    | 'CONTADOR'
    | 'REVENDEDOR'
    | 'ASSOCIACAO'
    | 'OUTRO';

  /**
   * Agente indicador (opcional)
   */
  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  agente_indicador: string;

  /**
   * Chave PIX (opcional)
   */
  @Column({
    type: DataType.STRING(120),
    allowNull: true,
  })
  chavepix: string;

  /**
   * Preço A1 PJ 12 meses (opcional)
   */
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  a1pj_12m: number;

  /**
   * Preço A3 PJ 36 meses (opcional)
   */
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  a3pj_36m: number;

  /**
   * Preço A1 PF 12 meses (opcional)
   */
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  a1pf_12m: number;

  /**
   * Preço A3 PF 12 meses (opcional)
   */
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  a3pf_12m: number;

  /**
   * Preço A3 PF 36 meses (opcional)
   */
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  a3pf_36m: number;

  /**
   * Observações sobre o usuário (opcional)
   */
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  observacao: string;

  /**
   * Define quem recebe o pagamento (Parceiro/Cliente)
   */
  @Column({
    type: DataType.ENUM('Parceiro', 'Cliente'),
    allowNull: false,
    defaultValue: 'Parceiro',
  })
  receber_do: 'Parceiro' | 'Cliente';

  /**
   * Data de cadastro do usuário
   */
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  dt_cadastro: Date;

  /**
   * Data de atualização do usuário
   */
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  api: number;
}
