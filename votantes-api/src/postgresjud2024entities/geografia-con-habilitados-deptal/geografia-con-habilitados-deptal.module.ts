import { Module } from '@nestjs/common';
import { GeografiaConHabilitadosDeptalService } from './geografia-con-habilitados-deptal.service';
import { GeografiaConHabilitadosDeptalController } from './geografia-con-habilitados-deptal.controller';
import { GeografiaConHabilitadosDeptal } from './entities/geografia-con-habilitados-deptal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([GeografiaConHabilitadosDeptal], 'postgresjud2024') ],
  controllers: [GeografiaConHabilitadosDeptalController],
  providers: [GeografiaConHabilitadosDeptalService],
})
export class GeografiaConHabilitadosDeptalModule {}
