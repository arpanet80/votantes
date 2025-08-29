import { Module } from '@nestjs/common';
import { GeografiaDesconectadoService } from './geografia-desconectado.service';
import { GeografiaDesconectadoController } from './geografia-desconectado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeografiaDesconectado } from './entities/geografia-desconectado.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([GeografiaDesconectado], 'postgresjud2024'),  // Usa la conexión 'postgres'
  ],
  controllers: [GeografiaDesconectadoController],
  providers: [GeografiaDesconectadoService],
  exports: [GeografiaDesconectadoService]
})
export class GeografiaDesconectadoModule {}
