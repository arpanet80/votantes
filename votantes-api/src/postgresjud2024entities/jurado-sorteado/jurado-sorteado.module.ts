import { Module } from '@nestjs/common';
import { JuradoSorteadoService } from './jurado-sorteado.service';
import { JuradoSorteadoController } from './jurado-sorteado.controller';
import { JuradoSorteado } from './entities/jurado-sorteado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuradoNombrado } from './entities/jurado-nombrado.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([JuradoSorteado, JuradoNombrado], 'postgresjud2024') ],
  controllers: [JuradoSorteadoController],
  providers: [JuradoSorteadoService],
  exports: [JuradoSorteadoService]
})
export class JuradoSorteadoModule {}
