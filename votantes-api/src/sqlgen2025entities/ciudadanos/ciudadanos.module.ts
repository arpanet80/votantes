import { Module } from '@nestjs/common';
import { CiudadanosController } from './ciudadanos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadanoGenerales } from './entities/ciudadano.entity';
import { CiudadanosGeneralesService } from './ciudadanos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ CiudadanoGenerales], 'mssqlgen2025')],
  controllers: [CiudadanosController],
  providers: [CiudadanosGeneralesService],
  exports: [CiudadanosGeneralesService]
})
export class CiudadanosGeneralesModule {}
