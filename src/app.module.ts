import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from './sequelize/sequelize.module';
import { AuthModule } from './auth/auth.module';
import { SolicitacaoModule } from './solicitacao/solicitacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule,
    AuthModule,
    SolicitacaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
