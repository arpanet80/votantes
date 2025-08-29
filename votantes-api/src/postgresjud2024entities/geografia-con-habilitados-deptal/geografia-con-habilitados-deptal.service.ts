import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeografiaConHabilitadosDeptalDto } from './dto/create-geografia-con-habilitados-deptal.dto';
import { UpdateGeografiaConHabilitadosDeptalDto } from './dto/update-geografia-con-habilitados-deptal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GeografiaConHabilitadosDeptal } from './entities/geografia-con-habilitados-deptal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeografiaConHabilitadosDeptalService {

  constructor(
      @InjectRepository(GeografiaConHabilitadosDeptal, 'postgresjud2024') 
      private geografiaRepository: Repository<GeografiaConHabilitadosDeptal>,
    ) {}

    async findOne(codigoMesa: string)  : Promise<GeografiaConHabilitadosDeptal> {
        const query = await this.geografiaRepository.findOne({ 
          where: { 
            CodigoMesa: codigoMesa,
           },
        });
    
        if (!query) {
          throw new NotFoundException('No existe el registro solicitado');
        }
    
        return query;
      }

    
  create(createGeografiaConHabilitadosDeptalDto: CreateGeografiaConHabilitadosDeptalDto) {
    return 'This action adds a new geografiaConHabilitadosDeptal';
  }

  findAll() {
    return `This action returns all geografiaConHabilitadosDeptal`;
  }

  update(id: number, updateGeografiaConHabilitadosDeptalDto: UpdateGeografiaConHabilitadosDeptalDto) {
    return `This action updates a #${id} geografiaConHabilitadosDeptal`;
  }

  remove(id: number) {
    return `This action removes a #${id} geografiaConHabilitadosDeptal`;
  }
}
