import { Injectable } from '@nestjs/common';
import { CreateGeografiaDesconectadoDto } from './dto/create-geografia-desconectado.dto';
import { UpdateGeografiaDesconectadoDto } from './dto/update-geografia-desconectado.dto';
import { GeografiaDesconectado } from './entities/geografia-desconectado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GeografiaDesconectadoGeneralesService {

  constructor(
      @InjectRepository(GeografiaDesconectado, 'postgresgen2025') 
      private geografiaRepository: Repository<GeografiaDesconectado>,
    ) {}

  async findOne(nummesa: number)  : Promise<GeografiaDesconectado> {
    const query = await this.geografiaRepository.findOne({ 
      where: { 
        NumMesa: nummesa,
       },
    });
    
    // console.log("=====>", query);
      /*if (!query) {
        throw new NotFoundException('No existe el registro solicitado');
      }*/
  
      return query;
    }
  

  create(createGeografiaDesconectadoDto: CreateGeografiaDesconectadoDto) {
    return 'This action adds a new geografiaDesconectado';
  }

  findAll() {
    return `This action returns all geografiaDesconectado`;
  }

  update(id: number, updateGeografiaDesconectadoDto: UpdateGeografiaDesconectadoDto) {
    return `This action updates a #${id} geografiaDesconectado`;
  }

  remove(id: number) {
    return `This action removes a #${id} geografiaDesconectado`;
  }
}
