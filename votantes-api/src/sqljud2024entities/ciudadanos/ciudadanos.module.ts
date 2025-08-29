import { Module } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanosController } from './ciudadanos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudadano } from './entities/ciudadano.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Ciudadano], 'mssqljud2024')],
  controllers: [CiudadanosController],
  providers: [CiudadanosService],
  exports: [CiudadanosService]
})
export class CiudadanosModule {}
