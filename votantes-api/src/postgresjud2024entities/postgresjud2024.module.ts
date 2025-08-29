import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NoVotanteModule } from './no-votante/no-votante.module';
import { JuradoSorteadoModule } from './jurado-sorteado/jurado-sorteado.module';
import { GeografiaDesconectadoModule } from './geografia-desconectado/geografia-desconectado.module';
import { GeografiaConHabilitadosDeptalModule } from './geografia-con-habilitados-deptal/geografia-con-habilitados-deptal.module';

@Module({
  imports: [
    DatabaseModule,
    NoVotanteModule,
    JuradoSorteadoModule,
    GeografiaDesconectadoModule,
    GeografiaConHabilitadosDeptalModule,
  ],
  controllers: [],
  providers: [],  // Debe estar en el arreglo de providers
  exports: [], // Asegúrate de exportar el servicio
})
export class PostgresJud2024Module {}
