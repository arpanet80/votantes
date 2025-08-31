import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeografiaRecinto } from './entities/geografia-recinto.entity';
import { GeografiaRecintoService } from './geografia-recinto.service';
import { GeografiaRecintoGeneralesController } from './geografia-recinto.controller';

@Module({
  imports: [
      TypeOrmModule.forFeature([GeografiaRecinto], 'postgresgen2025'),  // Usa la conexión 'postgres'
  ],
  controllers: [GeografiaRecintoGeneralesController],
  providers: [GeografiaRecintoService],
  exports: [GeografiaRecintoService]
})
export class GeografiaRecintoGeneralesModule {}
