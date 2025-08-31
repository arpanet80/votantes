import { PartialType } from '@nestjs/mapped-types';
import { CreateNoVotanteDto } from './create-no-votante.dto';

export class UpdateNoVotanteDto extends PartialType(CreateNoVotanteDto) {}
