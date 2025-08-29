import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeografiaDesconectadoService } from './geografia-desconectado.service';
import { CreateGeografiaDesconectadoDto } from './dto/create-geografia-desconectado.dto';
import { UpdateGeografiaDesconectadoDto } from './dto/update-geografia-desconectado.dto';

@Controller('geografia-desconectado')
export class GeografiaDesconectadoController {
  constructor(private readonly geografiaDesconectadoService: GeografiaDesconectadoService) {}

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
