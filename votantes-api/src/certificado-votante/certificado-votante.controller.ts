import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CertificadoVotanteService } from './certificado-votante.service';
import { CreateCertificadoVotanteDto } from './dto/create-certificado-votante.dto';
import { UpdateCertificadoVotanteDto } from './dto/update-certificado-votante.dto';

@Controller('certificado-votante')
export class CertificadoVotanteController {
  constructor(private readonly certificadoVotanteService: CertificadoVotanteService) {}

  
  // @Get(':ci')
  // findOne(@Param('ci') ci: string) {
  //   return this.certificadoVotanteService.obtenerCertificadoVotante(ci);
  // }

  //// Judiciales 2024
  @Get(':ci')
    async getUsersFromStoredProc(
      @Param('ci') ci: number, // 'ci' obligatorio
      @Query('complemento') complemento?: string,  // 'complemento' opcional
    ) {
      return this.certificadoVotanteService.obtenerCertificadoVotanteJudiciales(+ci, complemento);
  }


  // Generales 2025
  @Get('generales/:ci')
    async getUsersFromStoredProcGenerales(
      @Param('ci') ci: number, // 'ci' obligatorio
      @Query('complemento') complemento?: string,  // 'complemento' opcional
    ) {
      return this.certificadoVotanteService.obtenerCertificadoVotanteGenerales(+ci, complemento);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.certificadoVotanteService.findOne(+id);
  // }

  
  @Post()
  create(@Body() createCertificadoVotanteDto: CreateCertificadoVotanteDto) {
    return this.certificadoVotanteService.create(createCertificadoVotanteDto);
  }

  @Get()
  findAll() {
    return this.certificadoVotanteService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificadoVotanteDto: UpdateCertificadoVotanteDto) {
    return this.certificadoVotanteService.update(+id, updateCertificadoVotanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificadoVotanteService.remove(+id);
  }
}
