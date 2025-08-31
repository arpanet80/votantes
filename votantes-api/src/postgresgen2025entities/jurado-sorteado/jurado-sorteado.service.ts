import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJuradoSorteadoDto } from './dto/create-jurado-sorteado.dto';
import { UpdateJuradoSorteadoDto } from './dto/update-jurado-sorteado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JuradoSorteado } from './entities/jurado-sorteado.entity';
import { JuradoNombrado } from './entities/jurado-nombrado.entity';
import { JuradoEncontrado } from './entities/jurado-encontrado.entity';

enum designacion {
  nombrado = 'nombrado',
  sorteado = 'sorteado'
}

@Injectable()
export class JuradoSorteadoGeneralesService {

  constructor(
      @InjectRepository(JuradoSorteado, 'postgresgen2025') 
      private juradoSorteadoRepository: Repository<JuradoSorteado>,
      @InjectRepository(JuradoNombrado, 'postgresgen2025') 
      private juradoNombradoRepository: Repository<JuradoNombrado>,
    ) {}

  async buscaJurado(ci: number)  : Promise<JuradoEncontrado | null> {

    // console.log(ci);
    let juadoencontrado=new JuradoEncontrado();

    /*const sorteado = await this.juradoSorteadoRepository.findOne({ 
      where: { 
        NroDocumento: String(ci)
        },
    });*/
        
    /*
      const sorteado = await this.juradoSorteadoRepository
        .query('SELECT * FROM "juradossorteados" WHERE TRIM(split_part("NroDocumento", \' \', 1)) = $1', [ci]);
    */
      
      /*  const sorteado = await this.juradoSorteadoRepository
        .createQueryBuilder('jurado')
        .where('TRIM(jurado.NroDocumento) = :ci', { ci })  // Usa TRIM para eliminar espacios en la base de datos
        .getOne();
        */

        const sorteado = await this.juradoSorteadoRepository
        .createQueryBuilder('jurado')
        .where('TRIM(split_part(jurado.NroDocumento, \' \', 1)) = :ci', { ci })  // Usa split_part para obtener el texto antes del primer espacio
        .getOne();

    // console.log("Sorteado", sorteado);


    if (sorteado) {
      
      juadoencontrado.cedula = sorteado.NroDocumento;
      juadoencontrado.codigoMesaEnQueAsistio = sorteado.CódigoMesa;
      juadoencontrado.esjurado = true;
      juadoencontrado.tipoDesignacion = designacion.sorteado

      if (sorteado.ControlAsistencia == 'Asistió') {
        juadoencontrado.asistente = true;
      } else {
        juadoencontrado.asistente = false;
      }
    } else {

      const nombrado = await this.juradoNombradoRepository
        .createQueryBuilder('juradosorteado')
        .where('TRIM(split_part(juradosorteado.NroDocumento, \' \', 1)) = :ci', { ci })  // Usa split_part para obtener el texto antes del primer espacio
        .getOne();

    // console.log("Nombrado", nombrado);


      if (nombrado) {
      
        juadoencontrado.cedula = nombrado.NroDocumento;
        juadoencontrado.codigoMesaEnQueAsistio = nombrado.CódigoMesa;
        juadoencontrado.esjurado = true;
        juadoencontrado.tipoDesignacion = designacion.nombrado
        juadoencontrado.asistente = true;
      } 
      else
      return null;
        // throw new NotFoundException('No existe el registro solicitado');
    }

    return juadoencontrado;
  }


  create(createJuradoSorteadoDto: CreateJuradoSorteadoDto) {
    return 'This action adds a new juradoSorteado';
  }

  findAll() {
    return `This action returns all juradoSorteado`;
  }

  update(id: number, updateJuradoSorteadoDto: UpdateJuradoSorteadoDto) {
    return `This action updates a #${id} juradoSorteado`;
  }

  remove(id: number) {
    return `This action removes a #${id} juradoSorteado`;
  }
}
