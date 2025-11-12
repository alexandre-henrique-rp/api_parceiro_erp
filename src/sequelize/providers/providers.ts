import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Fcweb } from '../models/fcweb.model';
import { ParceiroSolicitacoes } from '../models/parceiro-solicitacoes.model';
import { ParceiroUsuarios } from '../models/parceiro-usuarios.model';

// Ignorar todos os warnings de depreciação do Sequelize
const originalEmit = process.emit;
process.emit = function (event, ...args: any[]) {
  if (event === 'warning' && args[0] && args[0].name === 'DeprecationWarning') {
    return false;
  }
  return originalEmit.apply(this, args);
};

@Injectable()
export class Providers {
  public readonly sequelize: Sequelize;

  //conexão com o banco de dados utilizando sequelize no mysql
  constructor() {
    console.log('🔄 Inicializando conexão com MySQL...');
    this.sequelize = new Sequelize({
      // Adicione 'this.' para referenciar a propriedade da classe
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
      dialectOptions: {
        connectTimeout: 60000,
        // Força uso de IPv4
        socketPath: undefined,
      },
      // Força DNS para resolver IPv4
      protocol: 'tcp',
      //timezone são paulo
      timezone: '-03:00',
    });

    // Adiciona os modelos
    this.sequelize.addModels([Fcweb, ParceiroUsuarios, ParceiroSolicitacoes]);

    // Testa a conexão de forma assíncrona (método testConnection precisa ser definido)
    this.testConnection();
  }

  private async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao conectar com MySQL:', error);
    }
  }
}
