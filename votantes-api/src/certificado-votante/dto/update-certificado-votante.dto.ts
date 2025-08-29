import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificadoVotanteDto } from './create-certificado-votante.dto';

export class UpdateCertificadoVotanteDto extends PartialType(CreateCertificadoVotanteDto) {}
