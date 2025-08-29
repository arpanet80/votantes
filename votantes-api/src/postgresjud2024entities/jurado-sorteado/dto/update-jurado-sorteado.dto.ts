import { PartialType } from '@nestjs/mapped-types';
import { CreateJuradoSorteadoDto } from './create-jurado-sorteado.dto';

export class UpdateJuradoSorteadoDto extends PartialType(CreateJuradoSorteadoDto) {}
