import { PartialType } from '@nestjs/mapped-types';
import { CreateGeografiaDesconectadoDto } from './create-geografia-desconectado.dto';

export class UpdateGeografiaDesconectadoDto extends PartialType(CreateGeografiaDesconectadoDto) {}
