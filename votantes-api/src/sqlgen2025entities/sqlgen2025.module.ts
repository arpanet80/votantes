import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CiudadanosGeneralesModule } from './ciudadanos/ciudadanos.module';

@Module({
  imports: [
    DatabaseModule,
    CiudadanosGeneralesModule,
  ],
  controllers: [],
  providers: [],  
  // exports: [CiudadanosService]
})
export class SqlGen2025Module {}
