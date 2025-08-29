import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificadoVotanteDto } from './dto/create-certificado-votante.dto';
import { UpdateCertificadoVotanteDto } from './dto/update-certificado-votante.dto';
import { CiudadanosService } from 'src/sqljud2024entities/ciudadanos/ciudadanos.service';
import { Ciudadano } from 'src/sqljud2024entities/ciudadanos/entities/ciudadano.entity';
import { GeografiaDesconectadoService } from 'src/postgresjud2024entities/geografia-desconectado/geografia-desconectado.service';
import { JuradoSorteadoService } from 'src/postgresjud2024entities/jurado-sorteado/jurado-sorteado.service';
import { NoVotanteService } from 'src/postgresjud2024entities/no-votante/no-votante.service';

@Injectable()
export class CertificadoVotanteService {

  constructor(
    private readonly ciudadanoService: CiudadanosService,
    private readonly noVotanteService: NoVotanteService,
    private readonly geoService: GeografiaDesconectadoService,
    private readonly juradoService: JuradoSorteadoService,
    
  ) {}

  async obtenerCertificadoVotante(ci: number, complemento?: string): Promise<Ciudadano> {

    const jurado = await this.juradoService.buscaJurado(ci);
    
    const ciudadano = await this.ciudadanoService.getCiudadanosFromStoredProc(ci, complemento);
    ciudadano.juradoEncontrado = jurado;
    
    if (ciudadano) {
      // console.log("Si en padron");
      const geografia = await this.geoService.findOne(ciudadano.MesaCiudadano);

      ciudadano.meesaRecinto = geografia.NumeroMesa;

      const noVotante = await this.noVotanteService.findOne(ci);

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
