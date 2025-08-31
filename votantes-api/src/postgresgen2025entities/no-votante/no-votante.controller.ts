import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoVotanteGeneralesService } from './no-votante.service';

@Controller('no-votante')
export class NoVotanteGeneralesController {
  constructor(private readonly noVotanteService: NoVotanteGeneralesService) {}

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
