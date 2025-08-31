import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoVotante } from './entities/no-votante.entity';
import { NoVotanteGeneralesService } from './no-votante.service';
import { NoVotanteGeneralesController } from './no-votante.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoVotante], 'postgresgen2025'),  // Usa la conexión 'postgres'
  ],
  controllers: [NoVotanteGeneralesController],
  providers: [NoVotanteGeneralesService],
  exports: [NoVotanteGeneralesService]
})
export class NoVotanteGeneralesModule {}
