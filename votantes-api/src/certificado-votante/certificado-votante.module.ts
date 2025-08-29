import { Module } from '@nestjs/common';
import { CertificadoVotanteService } from './certificado-votante.service';
import { CertificadoVotanteController } from './certificado-votante.controller';
import { CiudadanosModule } from 'src/sqljud2024entities/ciudadanos/ciudadanos.module';
import { NoVotanteModule } from 'src/postgresjud2024entities/no-votante/no-votante.module';
import { GeografiaDesconectadoModule } from 'src/postgresjud2024entities/geografia-desconectado/geografia-desconectado.module';
import { JuradoSorteadoModule } from 'src/postgresjud2024entities/jurado-sorteado/jurado-sorteado.module';

@Module({
  imports: [
    CiudadanosModule,
    NoVotanteModule,
    GeografiaDesconectadoModule, 
    JuradoSorteadoModule
  ],
  controllers: [CertificadoVotanteController],
  providers: [CertificadoVotanteService],
})
export class CertificadoVotanteModule {}
