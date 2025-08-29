import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';

@Controller('ciudadanos')
export class CiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  // Ruta para obtener usuarios desde el procedimiento almacenado
  // http://localhost:3000/ciudadanos/3701044?complemento=1K
  @Get(':ci')
  async getUsersFromStoredProc(
    @Param('ci') ci: number, // 'ci' obligatorio
    @Query('complemento') complemento?: string,  // 'complemento' opcional
  ) {
    return this.ciudadanosService.getCiudadanosFromStoredProc(ci, complemento);
  }

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
