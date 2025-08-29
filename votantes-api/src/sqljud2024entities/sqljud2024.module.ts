import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CiudadanosModule } from './ciudadanos/ciudadanos.module';

@Module({
  imports: [
    DatabaseModule,
    CiudadanosModule,
  ],
  controllers: [],
  providers: [],  
  // exports: [CiudadanosService]
})
export class SqlJud2024Module {}
