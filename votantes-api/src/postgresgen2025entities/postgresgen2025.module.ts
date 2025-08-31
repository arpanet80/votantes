import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NoVotanteGeneralesModule } from './no-votante/no-votante.module';
import { JuradoSorteadoGeneralesModule } from './jurado-sorteado/jurado-sorteado.module';
import { GeografiaRecintoGeneralesModule } from './geografia-recinto/geografia-recinto.module';
import { GeografiaDesconectadoGeneralesModule } from './geografia-desconectado/geografia-desconectado.module';

@Module({
  imports: [
    DatabaseModule,
    NoVotanteGeneralesModule,
    JuradoSorteadoGeneralesModule,
    GeografiaRecintoGeneralesModule,
    GeografiaDesconectadoGeneralesModule
  ],
  controllers: [],
  providers: [],  // Debe estar en el arreglo de providers
  exports: [], // Asegúrate de exportar el servicio
})
export class PostgresGen2025Module {}
