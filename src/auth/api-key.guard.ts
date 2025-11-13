import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ParceiroUsuarios } from '../sequelize/models/parceiro-usuarios.model';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Obtém a API key do header ou query parameter
    const apiKey = request.headers['x-api-key'] || request.query.apikey;

    if (!apiKey) {
      throw new UnauthorizedException('API key é obrigatória');
    }

    try {
      // Busca o usuário pela API key (usando o campo chavepix como API key)
      const usuario = await ParceiroUsuarios.findOne({
        attributes: ['id', 'status', 'perfil', 'nome', 'cpf', 'telefone', 'email', 'tipo_parceria', 'a1pj_12m', 'a3pj_36m', 'a1pf_12m', 'a3pf_12m', 'a3pf_36m', 'receber_do', 'id_polo', 'api', 'receber_do'],
        where: {
          id_polo: apiKey,
          status: 'ativo',
          api: 1,
        },
        raw: true,
      });

      if (!usuario) {
        throw new UnauthorizedException('API key inválida');
      }

      // Obtém o id_polo do parâmetro da rota ou query
      const idPoloParam = request.params.id_polo || request.query.id_polo;

      if (idPoloParam) {
        // Verifica se o id_polo do usuário corresponde ao parâmetro
        if (usuario.id_polo !== parseInt(idPoloParam)) {
          throw new UnauthorizedException(
            'ID do polo não autorizado para esta API key',
          );
        }
      }

      // Adiciona o usuário ao request para uso posterior
      request.usuario = usuario;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Erro na validação da API key');
    }
  }
}
