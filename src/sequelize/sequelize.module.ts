import { Global, Module } from '@nestjs/common';
import { Providers } from './providers/providers';
import { FcwebService } from './service/fcweb.service';
import { UsuariosService } from './service/usuarios.service';
import { SolicitacoesService } from './service/solicitacoes.service';


@Global()
@Module({
  providers: [Providers, FcwebService, UsuariosService, SolicitacoesService],
  exports: [Providers, FcwebService, UsuariosService, SolicitacoesService]
})
export class SequelizeModule {}
