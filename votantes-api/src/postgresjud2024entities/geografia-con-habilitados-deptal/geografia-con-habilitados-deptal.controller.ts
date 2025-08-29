import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeografiaConHabilitadosDeptalService } from './geografia-con-habilitados-deptal.service';
import { CreateGeografiaConHabilitadosDeptalDto } from './dto/create-geografia-con-habilitados-deptal.dto';
import { UpdateGeografiaConHabilitadosDeptalDto } from './dto/update-geografia-con-habilitados-deptal.dto';

@Controller('geografia-con-habilitados-deptal')
export class GeografiaConHabilitadosDeptalController {
  constructor(private readonly geografiaConHabilitadosDeptalService: GeografiaConHabilitadosDeptalService) {}

  @Post()
  create(@Body() createGeografiaConHabilitadosDeptalDto: CreateGeografiaConHabilitadosDeptalDto) {
    return this.geografiaConHabilitadosDeptalService.create(createGeografiaConHabilitadosDeptalDto);
  }

  @Get()
  findAll() {
    return this.geografiaConHabilitadosDeptalService.findAll();
  }

  @Get(':codigoMesa')
  findOne( @Param('codigoMesa') codigoMesa: string ) {
    return this.geografiaConHabilitadosDeptalService.findOne(codigoMesa);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeografiaConHabilitadosDeptalDto: UpdateGeografiaConHabilitadosDeptalDto) {
    return this.geografiaConHabilitadosDeptalService.update(+id, updateGeografiaConHabilitadosDeptalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geografiaConHabilitadosDeptalService.remove(+id);
  }
}
