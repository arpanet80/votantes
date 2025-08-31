import { Injectable } from '@nestjs/common';
import { CreateGeografiaDesconectadoDto } from './dto/create-geografia-desconectado.dto';
import { UpdateGeografiaDesconectadoDto } from './dto/update-geografia-desconectado.dto';
import { GeografiaRecinto } from './entities/geografia-recinto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GeografiaRecintoService {

  constructor(
      @InjectRepository(GeografiaRecinto, 'postgresgen2025') 
      private geografiaRepository: Repository<GeografiaRecinto>,
    ) {}


  async findAll() : Promise<GeografiaRecinto[]> {
    const query = await this.geografiaRepository.find();
    
    return query;
  }


    /*
  async findOne(nummesa: number)  : Promise<GeografiaRecinto> {
    const query = await this.geografiaRepository.findOne({ 
      where: { 
        NumMesa: nummesa,
       },
    });

      return query;
    }
  */

  create(createGeografiaDesconectadoDto: CreateGeografiaDesconectadoDto) {
    return 'This action adds a new geografiaDesconectado';
  }

 
  update(id: number, updateGeografiaDesconectadoDto: UpdateGeografiaDesconectadoDto) {
    return `This action updates a #${id} geografiaDesconectado`;
  }

  remove(id: number) {
    return `This action removes a #${id} geografiaDesconectado`;
  }
}
