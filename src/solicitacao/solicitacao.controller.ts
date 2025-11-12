import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacao.dto';
import { SolicitacaoService } from './solicitacao.service';

@ApiTags('Solicitações')
@Controller('solicitacao')
export class SolicitacaoController {
  constructor(private readonly solicitacaoService: SolicitacaoService) { }

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api_key')
  @ApiOperation({ 
    summary: 'Criar nova solicitação',
    description: 'Cria uma nova solicitação de certificado digital. A solicitação será associada automaticamente ao usuário e polo da API key.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Solicitação criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Solicitação criada com sucesso' },
        total: { type: 'number', example: 1 },
        pages: { type: 'number', example: 1 },
        current_page: { type: 'number', example: 1 },
        status: { type: 'number', example: 201 },
        data: { type: 'object' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'API key inválida' })
  create(@Body() createSolicitacaoDto: CreateSolicitacaoDto, @Req() req: any) {
    return this.solicitacaoService.create(createSolicitacaoDto, req.usuario);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api_key')
  @ApiOperation({ 
    summary: 'Listar solicitações',
    description: 'Retorna uma lista paginada de solicitações do usuário autenticado. Permite filtrar por diversos critérios.'
  })
  @ApiQuery({ 
    name: 'id', 
    description: 'ID específico da solicitação', 
    required: false,
    type: 'number'
  })
  @ApiQuery({ 
    name: 'nome', 
    description: 'Nome do cliente (busca parcial)', 
    required: false,
    type: 'string'
  })
  @ApiQuery({ 
    name: 'cpf', 
    description: 'CPF exato do cliente', 
    required: false,
    type: 'string'
  })
  @ApiQuery({ 
    name: 'email', 
    description: 'Email exato do cliente', 
    required: false,
    type: 'string'
  })
  @ApiQuery({ 
    name: 'tipo_cd', 
    description: 'Tipo do certificado digital', 
    required: false,
    enum: ['A1PF_12M', 'A3PF_36M', 'A1PJ_12M', 'A3PJ_36M', 'A3PF_12M']
  })
  @ApiQuery({ 
    name: 'page', 
    description: 'Número da página (inicia em 1)', 
    required: false,
    type: 'number',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de solicitações retornada com sucesso',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Lista de solicitações' },
        total: { type: 'number', example: 45 },
        pages: { type: 'number', example: 2 },
        current_page: { type: 'number', example: 1 },
        status: { type: 'number', example: 200 },
        data: { 
          type: 'array',
          items: { type: 'object' }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'API key inválida' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  findAll(@Req() req: any, @Query() query: {
    id?: string
    nome?: string
    cpf?: string
    email?: string
    tipo_cd?: 'A1PF_12M' | 'A3PF_36M' | 'A1PJ_12M' | 'A3PJ_36M' | 'A3PF_12M';
    page?: number
  }) {
    return this.solicitacaoService.findAll(req.usuario, query);
  }

  @Get(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api_key')
  @ApiOperation({ 
    summary: 'Buscar solicitação por ID',
    description: 'Retorna uma solicitação específica do usuário autenticado.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID da solicitação', 
    type: 'number',
    example: 123
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Solicitação encontrada com sucesso',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Solicitação encontrada' },
        total: { type: 'number', example: 1 },
        pages: { type: 'number', example: 1 },
        current_page: { type: 'number', example: 1 },
        status: { type: 'number', example: 200 },
        data: { type: 'object' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Solicitação não encontrada ou não autorizada' })
  @ApiResponse({ status: 401, description: 'API key inválida' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.solicitacaoService.findOne(+id, req.usuario);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api_key')
  @ApiOperation({ 
    summary: 'Atualizar solicitação',
    description: 'Atualiza os dados de uma solicitação existente do usuário autenticado.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID da solicitação', 
    type: 'number',
    example: 123
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Solicitação atualizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Solicitação atualizada com sucesso' },
        total: { type: 'number', example: 1 },
        pages: { type: 'number', example: 1 },
        current_page: { type: 'number', example: 1 },
        status: { type: 'number', example: 200 },
        data: { 
          type: 'object',
          properties: {
            id: { type: 'number', example: 123 },
            updated_by: { type: 'number', example: 456 },
            updated_at: { type: 'string', example: '2023-12-01T15:30:00.000Z' },
            fields_updated: { type: 'array', items: { type: 'string' }, example: ['nome', 'email'] }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Solicitação não encontrada ou não autorizada' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'API key inválida' })
  update(@Param('id') id: string, @Body() updateSolicitacaoDto: UpdateSolicitacaoDto, @Req() req: any) {
    return this.solicitacaoService.update(+id, updateSolicitacaoDto, req.usuario);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api_key')
  @ApiOperation({ 
    summary: 'Remover solicitação',
    description: 'Remove (soft delete) uma solicitação existente do usuário autenticado. Altera o status para inativo.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID da solicitação', 
    type: 'number',
    example: 123
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Solicitação removida com sucesso',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Solicitação removida com sucesso (status alterado para inativo)' },
        total: { type: 'number', example: 1 },
        pages: { type: 'number', example: 1 },
        current_page: { type: 'number', example: 1 },
        status: { type: 'number', example: 200 },
        data: { 
          type: 'object',
          properties: {
            id: { type: 'number', example: 123 },
            status: { type: 'string', example: 'inativo' },
            removed_by: { type: 'number', example: 456 },
            removed_at: { type: 'string', example: '2023-12-01T15:30:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Solicitação não encontrada ou não autorizada' })
  @ApiResponse({ status: 401, description: 'API key inválida' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.solicitacaoService.remove(+id, req.usuario);
  }
}
