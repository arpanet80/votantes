import { Module } from '@nestjs/common';
import { NoVotanteService } from './no-votante.service';
import { NoVotanteController } from './no-votante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoVotante } from './entities/no-votante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoVotante], 'postgresjud2024'),  // Usa la conexión 'postgres'
  ],
  controllers: [NoVotanteController],
  providers: [NoVotanteService],
  exports: [NoVotanteService]
})
export class NoVotanteModule {}
