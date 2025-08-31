import { PartialType } from '@nestjs/swagger';
import { CreateCiudadanoDto } from './create-ciudadano.dto';

export class UpdateCiudadanoDto extends PartialType(CreateCiudadanoDto) {}
