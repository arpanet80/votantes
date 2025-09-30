import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { CiudadanosGeneralesService } from './ciudadanos.service';
import { BuscarCiudadanosDto } from './dto/buscar-ciudadanos.dto';

@Controller('ciudadanos-generales2025')
export class CiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosGeneralesService) {}

  // Ruta para obtener usuarios desde el procedimiento almacenado
  // http://localhost:3000/ciudadanos/3701044?complemento=1K
  @Get(':ci')
  async getUsersFromStoredProc(
    @Param('ci') ci: number, // 'ci' obligatorio
    @Query('complemento') complemento?: string,  // 'complemento' opcional
  ) {
    return this.ciudadanosService.getCiudadanosFromStoredProc(ci, complemento);
  }

   // Nueva ruta POST para búsqueda con múltiples parámetros
  @Post('buscar')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getCiudadanosByParams(@Body() buscarDto: BuscarCiudadanosDto) {
    const result = await this.ciudadanosService.getCiudadanosByParams(buscarDto);
    
    // console.log('Resultado del servicio:', result);
    
    if (result.resultType === 'TOO_MANY_RESULTS') {
      throw new BadRequestException({
        message: result.message,
        total: result.total,
        criteria: buscarDto,
        suggestion: 'Por favor, agregue más criterios de búsqueda para refinar los resultados.'
      });
    }
    
    
    if (result.resultType === 'NO_RESULTS') {
      throw new NotFoundException({
        message: 'No se encontraron ciudadanos con los criterios de búsqueda',
        criteria: buscarDto,
        suggestion: 'Intente con diferentes parámetros de búsqueda'
      });
    }
    
    return result;
  }

  /*@Post('buscar')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getCiudadanosByParams(@Body() buscarDto: BuscarCiudadanosDto) {
    return this.ciudadanosService.getCiudadanosByParams(buscarDto);
  }*/

  
  /*
  @Post()
  create(@Body() createCiudadanoDto: CreateCiudadanoDto) {
    return this.ciudadanosService.create(createCiudadanoDto);
  }

  @Get()
  findAll() {
    return this.ciudadanosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadanosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiudadanoDto: UpdateCiudadanoDto) {
    return this.ciudadanosService.update(+id, updateCiudadanoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadanosService.remove(+id);
  }
  */
}
