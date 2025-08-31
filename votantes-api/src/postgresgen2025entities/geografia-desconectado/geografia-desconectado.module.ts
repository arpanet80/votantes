import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeografiaDesconectado } from './entities/geografia-desconectado.entity';
import { GeografiaDesconectadoGeneralesService } from './geografia-desconectado.service';
import { GeografiaDesconectadoGeneralesController } from './geografia-desconectado.controller';

@Module({
  imports: [
      TypeOrmModule.forFeature([GeografiaDesconectado], 'postgresgen2025'),  // Usa la conexión 'postgres'
  ],
  controllers: [GeografiaDesconectadoGeneralesController],
  providers: [GeografiaDesconectadoGeneralesService],
  exports: [GeografiaDesconectadoGeneralesService]
})
export class GeografiaDesconectadoGeneralesModule {}
