import { ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadanoGenerales } from './entities/ciudadano.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CiudadanosGeneralesService {
  // private readonly logger = new Logger(CiudadanoService.name);
  private readonly clave = '0x02000000876A3961235E3145BE639AEF85CAAA940C71C1264CC818870D6967BE326C375BC82B1344F355A243193801015EEF91C7';

  constructor(
    @InjectRepository(CiudadanoGenerales, 'mssqlgen2025') 
    private ciudadanoRepository: Repository<CiudadanoGenerales>
  ) {}

  // Método para llamar al procedimiento almacenado
  async getCiudadanosFromStoredProc(ci: number, complemento?: string) : Promise<CiudadanoGenerales> {
    
    //3701044 1K
    
    //console.log("llego ci: ", ci, complemento);
    
  // const clave = '0x0200000099D665269A70F3159848E3C6FFAE3569D18CD9EC445582CAC9290B20BBE2CDF0A3B377001557F913D7510B9B27DE5754';

  try {

    //// paBuscaCiudadano Busca al ciudadano por nombre appelido carnet etc. ////
    var query = `EXEC [dbo].[paBuscaCiudadano] 
      @Documento = ${ci},
      @pwd = '${this.clave}'
    `;
    //@pwd = '0x0200000099D665269A70F3159848E3C6FFAE3569D18CD9EC445582CAC9290B20BBE2CDF0A3B377001557F913D7510B9B27DE5754';

    // Si el complemento es proporcionado, se podría usar en la consulta
    if (complemento) {
      query += `, @Complemento = '${complemento}'`;
    }
  
    const result = await this.ciudadanoRepository.query(query);

    if (result && result.length > 0) {
      
      ///// Si existe un solo registro ///////
      if (result.length == 1 ) {

        const idCiudadano = result[0].Ciudadano;

        ///// consulta por idCiudadano para obtener datos completos ///////
        const query2 = `EXEC [dbo].[sp_BuscaCiudadano]
          @IdCiudadano = ${idCiudadano},
          @pwd = '${this.clave}'
        `;

        const ciudadano:CiudadanoGenerales = await this.ciudadanoRepository.query(query2);

        if (ciudadano) {

          return ciudadano[0];

        } else {
          throw new NotFoundException('No existe registro en padron electoral');
        }
      }
      else {

        ///// Reisar aui para devolver un arrray /////////////////////
        console.log('Devolver un Array');

        const idCiudadano = result[0].Ciudadano;

        ///// consulta por idCiudadano para obtener datos completos ///////
        const query2 = `EXEC [dbo].[sp_BuscaCiudadano]
          @IdCiudadano = ${idCiudadano},
          @pwd = '${this.clave}'
        `;

        const ciudadano:CiudadanoGenerales = await this.ciudadanoRepository.query(query2);

        if (ciudadano) {

          return ciudadano[0];

        } else {
          throw new NotFoundException('No existe registro en padron electoral');
        }
      }

      
    }
    else {
      throw new NotFoundException('No existe registro en padron electoral');
    }
  } catch (error) {
      // this.logger.error(`Error al consultar ciudadano: ${error.message}`, error.stack);
      
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      // Manejar errores de conexión a base de datos
      if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        throw new InternalServerErrorException('Error de conexión con la base de datos');
      }
      
      throw new InternalServerErrorException('Error interno del servidor');
    }
}

}
