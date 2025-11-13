import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

// Ignorar warnings de depreciação do Sequelize
process.env.NODE_NO_WARNINGS = '1';
process.env.SEQUELIZE_DISABLE_DEPRECATED_WARNINGS = 'true';

// Silenciar warnings específicos
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (
    warning.name === 'DeprecationWarning' &&
    warning.message.includes('SEQUELIZE')
  ) {
    return;
  }
});

const PORT = process.env.PORT || 3000;
const BaseUrl = process.env.LOCAL_URL || 'http://localhost:3000';
const ApiRoute = process.env.API_ROUTE || 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Sou Parceiro Interface')
    .setDescription(`
# 📋 API Sou Parceiro Interface - Documentação Completa

## 🔐 Como Utilizar a API

### 1. **Obtenção da API Key**
- **Contate o administrador** do sistema para solicitar seu cadastro
- Forneça seus dados de parceiro (CNPJ, razão social, etc.)
- O administrador criará seu usuário no sistema e fornecerá sua **API Key**
- A API Key corresponde ao campo **id_polo** da tabela \`parceiro_usuarios\`

### 2. **Como Usar a API Key**
- Adicione o header **x-api-key** em todas as requisições
- Exemplo: \`x-api-key: 12345\`
- Ou use o botão **"Authorize"** no Swagger UI (ícone de cadeado 🔒)

### 3. **Endpoints Disponíveis**
- **POST /solicitacao** - Criar nova solicitação
- **GET /solicitacao** - Listar solicitações (com filtros)
- **GET /solicitacao/:id** - Buscar solicitação específica
- **PATCH /solicitacao/:id** - Atualizar solicitação
- **DELETE /solicitacao/:id** - Remover solicitação (soft delete)

### 4. **Filtros de Busca (GET /solicitacao)**
- \`id\` - ID específico da solicitação
- \`nome\` - Nome do cliente (busca parcial)
- \`cpf\` - CPF exato do cliente
- \`email\` - Email exato do cliente
- \`tipo_cd\` - Tipo do certificado: A1PF_12M, A3PF_36M, A1PJ_12M, A3PJ_36M, A3PF_12M
- \`page\` - Número da página (30 itens por página)

### 5. **Segurança**
- Todas as requisições exigem API Key válida
- Usuários só podem acessar suas próprias solicitações
- Validação de id_polo garante isolamento de dados

### 6. **Status das Solicitações**
- \`ativo\` - Solicitação ativa
- \`inativo\` - Solicitação removida (soft delete)

### 7. **Contatos e Suporte**
- **📞 Suporte e Administração:** 
  - Telefone: [(16) 3289-7402](https://wa.me/551632897402)
  - Clique no número para abrir o WhatsApp
- **💬 WhatsApp:** atendimento rápido via mensagem
- **Para novas funcionalidades,** envie sugestões para o time de desenvolvimento

---

**⚠️ Importante:** Mantenha sua API Key em segurança e não compartilhe com terceiros!

**📱 Precisa de ajuda?** [Clique](https://wa.me/551632897402?text=Olá!%20Preciso%20de%20suporte%20com%20a%20API%20Parceiro%20ERP.%20Poderiam%20me%20ajudar?) no número acima e fale conosco via WhatsApp!
    `)
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API Key para autenticação (fornecida pelo administrador após cadastro)'
      },
      'api_key'
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configuração para arquivos grandes
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(PORT).then(() => {
    console.log(' ');
    console.log(' ');
    console.log(`Server running on ${BaseUrl}`);
    console.log(`Api running on ${BaseUrl}/${ApiRoute}`);
    console.log(' ');
    console.log(' ');
  });
}
bootstrap();
