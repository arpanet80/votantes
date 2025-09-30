import { IsOptional, IsString, IsDateString, ValidateIf, IsNotEmpty } from 'class-validator';

export class BuscarCiudadanosDto {
  @IsOptional()
  @IsString()
  @ValidateIf(o => o.nombres !== '' || Object.keys(o).length < 2)
  @IsNotEmpty({ message: 'Al menos dos parámetros son requeridos' })
  nombres?: string;

  @IsOptional()
  @IsString()
  @ValidateIf(o => o.paterno !== '' || Object.keys(o).length < 2)
  @IsNotEmpty({ message: 'Al menos dos parámetros son requeridos' })
  paterno?: string;

  @IsOptional()
  @IsString()
  @ValidateIf(o => o.materno !== '' || Object.keys(o).length < 2)
  @IsNotEmpty({ message: 'Al menos dos parámetros son requeridos' })
  materno?: string;

  @IsOptional()
  @IsString()
  @ValidateIf(o => o.documento !== '' || Object.keys(o).length < 2)
  @IsNotEmpty({ message: 'Al menos dos parámetros son requeridos' })
  documento?: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD' })
  fechaNac?: string;
}