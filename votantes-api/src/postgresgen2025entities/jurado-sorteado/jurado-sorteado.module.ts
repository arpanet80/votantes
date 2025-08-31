import { Module } from '@nestjs/common';
import { JuradoSorteado } from './entities/jurado-sorteado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuradoNombrado } from './entities/jurado-nombrado.entity';
import { JuradoSorteadoGeneralesService } from './jurado-sorteado.service';
import { JuradoSorteadoGeneralesController } from './jurado-sorteado.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([JuradoSorteado, JuradoNombrado], 'postgresgen2025') ],
  controllers: [JuradoSorteadoGeneralesController],
  providers: [JuradoSorteadoGeneralesService],
  exports: [JuradoSorteadoGeneralesService]
})
export class JuradoSorteadoGeneralesModule {}
