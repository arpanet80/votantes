import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeografiaRecintoService } from './geografia-recinto.service';

@Controller('geografia-recinto')
export class GeografiaRecintoGeneralesController {
  constructor(private readonly geografiaDesconectadoService: GeografiaRecintoService) {}

  @Get()
  findAll() {
    return this.geografiaDesconectadoService.findAll();
  }

  /*
  @Get(':nummesa')
  findOne( @Param('nummesa') nummesa: number ) {
    return this.geografiaDesconectadoService.findOne(nummesa);
  }*/

  /*
  @Post()
  create(@Body() createGeografiaDesconectadoDto: CreateGeografiaDesconectadoDto) {
    return this.geografiaDesconectadoService.create(createGeografiaDesconectadoDto);
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
