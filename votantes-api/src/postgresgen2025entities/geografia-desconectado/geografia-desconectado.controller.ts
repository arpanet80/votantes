import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeografiaDesconectadoGeneralesService } from './geografia-desconectado.service';

@Controller('geografia-desconectado-generales')

export class GeografiaDesconectadoGeneralesController {
  constructor(private readonly geografiaDesconectadoService: GeografiaDesconectadoGeneralesService) {}

  @Get(':nummesa')
  findOne( @Param('nummesa') nummesa: number ) {
    return this.geografiaDesconectadoService.findOne(nummesa);
  }

  /*
  @Post()
  create(@Body() createGeografiaDesconectadoDto: CreateGeografiaDesconectadoDto) {
    return this.geografiaDesconectadoService.create(createGeografiaDesconectadoDto);
  }

  @Get()
  findAll() {
    return this.geografiaDesconectadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geografiaDesconectadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeografiaDesconectadoDto: UpdateGeografiaDesconectadoDto) {
    return this.geografiaDesconectadoService.update(+id, updateGeografiaDesconectadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geografiaDesconectadoService.remove(+id);
  }
    */
}
