import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoVotanteDto } from './dto/create-no-votante.dto';
import { UpdateNoVotanteDto } from './dto/update-no-votante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NoVotante } from './entities/no-votante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoVotanteService {

  constructor(
    @InjectRepository(NoVotante, 'postgresjud2024') 
    private noVotanteRepository: Repository<NoVotante>,
  ) {}

  async findOne(ci: number)  : Promise<NoVotante> {

    const query = await this.noVotanteRepository.findOne({ 
      where: { 
        documentoidentidad: String(ci),
       },
    });

    /*if (!query) {
      throw new NotFoundException('No existe el registro solicitado');
    }*/

    return query;
  }


  create(createNoVotanteDto: CreateNoVotanteDto) {
    return 'This action adds a new noVotante';
  }

  findAll() {
    return `This action returns all noVotante`;
  }

  

  update(id: number, updateNoVotanteDto: UpdateNoVotanteDto) {
    return `This action updates a #${id} noVotante`;
  }

  remove(id: number) {
    return `This action removes a #${id} noVotante`;
  }
}
