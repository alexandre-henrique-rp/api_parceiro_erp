import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateSolicitacaoDto {
  @ApiProperty({
    example: 'A1PF_12M',
    description: 'Tipo do certificado digital',
    enum: ['A1PF_12M', 'A3PF_36M', 'A1PJ_12M', 'A3PJ_36M', 'A3PF_12M'],
    required: true,
  })
  @IsEnum(['A1PF_12M', 'A3PF_36M', 'A1PJ_12M', 'A3PJ_36M', 'A3PF_12M'], {
    message: 'Tipo do certificado digital inválido',
  })
  @IsNotEmpty()
  tipo_cd: 'A1PF_12M' | 'A3PF_36M' | 'A1PJ_12M' | 'A3PJ_36M' | 'A3PF_12M';

  @ApiProperty({
    example: '12345678900',
    description: 'CPF do cliente',
    maxLength: 11,
    minLength: 11,
    required: true,
  })
  @IsString({
    message: 'CPF deve ser uma string',
  })
  @Length(11, 11, {
    message: 'CPF deve conter 11 caracteres',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  cpf: string;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome do cliente',
    required: true,
  })
  @IsString({
    message: 'Nome deve ser uma string',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  nome: string;

  @ApiProperty({
    example: '11987654321',
    description: 'Telefone do cliente',
    maxLength: 11,
    minLength: 11,
    required: true,
  })
  @IsString({
    message: 'Telefone deve ser uma string',
  })
  @Length(11, 11, {
    message: 'Telefone deve conter 11 caracteres',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  telefone: string;

  @ApiProperty({
    example: '12345678900',
    description: 'CNPJ do cliente',
    maxLength: 14,
    minLength: 14,
    required: false,
  })
  @IsString({
    message: 'CNPJ deve ser uma string',
  })
  @Length(14, 14, {
    message: 'CNPJ deve conter 14 caracteres',
  })
  @IsOptional()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  cnpj?: string;

  @ApiProperty({
    example: 'joaodasilva@gmail.com',
    description: 'Email do cliente',
    required: true,
  })
  @IsString({
    message: 'Email deve ser uma string',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty({
    example: '12345678900',
    description: 'Razão social do cliente',
    required: false,
  })
  @IsString({
    message: 'Razão social deve ser uma string',
  })
  @IsOptional()
  @Transform(({ value }) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  razao_social?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Data de nascimento do cliente',
    required: false,
  })
  @IsDate({
    message: 'Data de nascimento deve ser uma data',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  dt_nascimento?: Date;

  @ApiProperty({
    example: '1000',
    description: 'Valor da venda',
    required: false,
  })
  @IsNumber({}, {
    message: 'Valor da venda deve ser um número',
  })
  @IsOptional()
  valor_venda?: number;

  @ApiProperty({
    example: 'Observação',
    description: 'Observação',
    required: false,
  })
  @IsString({
    message: 'Observação deve ser uma string',
  })
  @IsOptional()
  observacao?: string;
}
