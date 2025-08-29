import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoVotanteService } from './no-votante.service';
import { CreateNoVotanteDto } from './dto/create-no-votante.dto';
import { UpdateNoVotanteDto } from './dto/update-no-votante.dto';

@Controller('no-votante')
export class NoVotanteController {
  constructor(private readonly noVotanteService: NoVotanteService) {}

  @Get(':ci')
  findOne( @Param('ci') ci: number ) {
    return this.noVotanteService.findOne(ci);
  }

  /*
  @Post()
  create(@Body() createNoVotanteDto: CreateNoVotanteDto) {
    return this.noVotanteService.create(createNoVotanteDto);
  }

  @Get()
  findAll() {
    return this.noVotanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noVotanteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoVotanteDto: UpdateNoVotanteDto) {
    return this.noVotanteService.update(+id, updateNoVotanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noVotanteService.remove(+id);
  }
    */
}
