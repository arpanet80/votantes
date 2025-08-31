import { Controller, Get, Param } from '@nestjs/common';
import { JuradoSorteadoGeneralesService } from './jurado-sorteado.service';

@Controller('jurado')
export class JuradoSorteadoGeneralesController {
  constructor(private readonly juradoSorteadoService: JuradoSorteadoGeneralesService) {}

  @Get(':ci')
  async getUsersFromStoredProc(
    @Param('ci') ci: number, // 'ci' obligatorio
  ) {
    return this.juradoSorteadoService.buscaJurado(ci);
  }

    /*
  @Post()
  create(@Body() createJuradoSorteadoDto: CreateJuradoSorteadoDto) {
    return this.juradoSorteadoService.create(createJuradoSorteadoDto);
  }

  @Get()
  findAll() {
    return this.juradoSorteadoService.findAll();
  }

  @Get(':ci')
  findOne( @Param('ci') ci: string ) {
    return this.juradoSorteadoService.findOne(ci);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJuradoSorteadoDto: UpdateJuradoSorteadoDto) {
    return this.juradoSorteadoService.update(+id, updateJuradoSorteadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juradoSorteadoService.remove(+id);
  }
    */
}
