import { PartialType } from '@nestjs/mapped-types';
import { CreateGeografiaConHabilitadosDeptalDto } from './create-geografia-con-habilitados-deptal.dto';

export class UpdateGeografiaConHabilitadosDeptalDto extends PartialType(CreateGeografiaConHabilitadosDeptalDto) {}
