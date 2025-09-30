import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificadoVotanteDto } from './dto/create-certificado-votante.dto';
import { UpdateCertificadoVotanteDto } from './dto/update-certificado-votante.dto';
import { CiudadanosService } from 'src/sqljud2024entities/ciudadanos/ciudadanos.service';
import { Ciudadano } from 'src/sqljud2024entities/ciudadanos/entities/ciudadano.entity';
import { GeografiaDesconectadoService } from 'src/postgresjud2024entities/geografia-desconectado/geografia-desconectado.service';
import { JuradoSorteadoService } from 'src/postgresjud2024entities/jurado-sorteado/jurado-sorteado.service';
import { NoVotanteService } from 'src/postgresjud2024entities/no-votante/no-votante.service';
import { CiudadanosGeneralesService } from 'src/sqlgen2025entities/ciudadanos/ciudadanos.service';
import { NoVotanteGeneralesService } from 'src/postgresgen2025entities/no-votante/no-votante.service';
import { GeografiaDesconectadoGeneralesService } from 'src/postgresgen2025entities/geografia-desconectado/geografia-desconectado.service';
import { JuradoSorteadoGeneralesService } from 'src/postgresgen2025entities/jurado-sorteado/jurado-sorteado.service';
import { CiudadanoGenerales } from 'src/sqlgen2025entities/ciudadanos/entities/ciudadano.entity';

@Injectable()
export class CertificadoVotanteService {

  constructor(
    private readonly ciudadanoJudicialesService: CiudadanosService,
    private readonly noVotanteJudicialesService: NoVotanteService,
    private readonly geoJudicialesService: GeografiaDesconectadoService,
    private readonly juradoJudicialesService: JuradoSorteadoService,

    private readonly ciudadanoGeneralesService: CiudadanosGeneralesService,
    private readonly noVotanteGeneralesService: NoVotanteGeneralesService,
    private readonly geoGeneralesService: GeografiaDesconectadoGeneralesService,
    private readonly juradoGeneralesService: JuradoSorteadoGeneralesService,
    
  ) {}

  async obtenerCertificadoVotanteJudiciales(ci: number, complemento?: string): Promise<Ciudadano> {

    const jurado = await this.juradoJudicialesService.buscaJurado(ci);
    
    const ciudadano = await this.ciudadanoJudicialesService.getCiudadanosFromStoredProc(ci, complemento);
    // console.log(ciudadano);
    ciudadano.juradoEncontrado = jurado;
    
    if (ciudadano) {
      // console.log("Si en padron");
      const geografia = await this.geoJudicialesService.findOne(ciudadano.MesaCiudadano);

      ciudadano.meesaRecinto = geografia.NumeroMesa;

      const noVotante = await this.noVotanteJudicialesService.findOne(ci);

      if (noVotante) {
        // console.log("es no votante");
        ciudadano.Voto = false;
        ciudadano.numerocorrelativo = noVotante.numerocorrelativo;
        ciudadano.numeropagina = noVotante.numeropagina;

        return ciudadano;
      }
      else {

        if (ciudadano.EstadoRegistro == "Habilitado") {
          // console.log("Si voto");
          ciudadano.Voto = true;

          return ciudadano;  
        } else {
          ciudadano.Voto = false;
          return ciudadano;
        }
        
      }

    } else {
      // console.log("No existe en el padron");
      throw new NotFoundException('No existe registro en padron');
    } 
    
  }
 
  
  async obtenerCertificadoVotanteGenerales(ci: number, complemento?: string): Promise<CiudadanoGenerales> {
    
    const jurado = await this.juradoGeneralesService.buscaJurado(ci);

    const ciudadano = await this.ciudadanoGeneralesService.getCiudadanosFromStoredProc(ci, complemento);

      console.log("=====>" + ciudadano);

    
    ciudadano.juradoEncontrado = jurado;
        
    if (ciudadano) {
      // console.log("Si en padron");
      const geografia = await this.geoGeneralesService.findOne(ciudadano.MesaCiudadano);

      // console.log(geografia);

      ciudadano.meesaRecinto = geografia.NumeroMesa;

      const noVotante = await this.noVotanteGeneralesService.findOne(ci);

      if (noVotante) {
        // console.log("es no votante");
        ciudadano.Voto = false;
        ciudadano.numerocorrelativo = noVotante.numerocorrelativo;
        ciudadano.numeropagina = noVotante.numeropagina;

        return ciudadano;
      }
      else {

        if (ciudadano.EstadoRegistro == "Habilitado") {
          // console.log("Si voto");
          ciudadano.Voto = true;

          return ciudadano;  
        } else {
          ciudadano.Voto = false;
          return ciudadano;
        }
        
      }

    } else {
      // console.log("No existe en el padron");
      throw new NotFoundException('No existe registro en padron');
    } 
    
  }









  create(createCertificadoVotanteDto: CreateCertificadoVotanteDto) {
    return 'This action adds a new certificadoVotante';
  }

  findAll() {
    return `This action returns all certificadoVotante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificadoVotante`;
  }

  update(id: number, updateCertificadoVotanteDto: UpdateCertificadoVotanteDto) {
    return `This action updates a #${id} certificadoVotante`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificadoVotante`;
  }
}
