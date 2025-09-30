import { ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudadano } from './entities/ciudadano.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CiudadanosService {
  // private readonly logger = new Logger(CiudadanoService.name);
  // private readonly clave = '0x0200000099D665269A70F3159848E3C6FFAE3569D18CD9EC445582CAC9290B20BBE2CDF0A3B377001557F913D7510B9B27DE5754';;

  constructor(
    @InjectRepository(Ciudadano, 'mssqljud2024') 
    private ciudadanoRepository: Repository<Ciudadano>
  ) {}

  // Método para llamar al procedimiento almacenado

  
  /*
  async getCiudadanosFromStoredProc(ci: number, complemento?: string): Promise<Ciudadano> {
    try {
      // Construir parámetros para la primera consulta
      const params = [ci, this.clave];
      let query = `EXEC [dbo].[paBuscaCiudadano] @Documento = $1, @pwd = $2`;
      
      if (complemento) {
        query += `, @Complemento = $3`;
        params.push(complemento);
      }

      // Ejecutar primera consulta
      const result = await this.ciudadanoRepository.query(query, params);
      console.log(result);
      if (!result || result.length === 0) {
        throw new NotFoundException('No existe registro en padron electoral');
      }

      // Manejar múltiples resultados
      if (result.length > 1) {
        // this.logger.warn(`Múltiples resultados encontrados para CI: ${ci}`);
        // Dependiendo de tus requisitos, podrías:
        // 1. Lanzar una excepción
        // 2. Devolver el primer resultado
        // 3. Devolver todos los resultados (cambiando el tipo de retorno)
        console.log('Devolver un Array');
      }

      const idCiudadano = result[0].Ciudadano;

      // Segunda consulta para obtener datos completos
      const query2 = `EXEC [dbo].[sp_BuscaCiudadano] @IdCiudadano = $1, @pwd = $2`;
      const ciudadano = await this.ciudadanoRepository.query(query2, [idCiudadano, this.clave]);

      if (!ciudadano || ciudadano.length === 0) {
        throw new NotFoundException('No se encontraron detalles del ciudadano');
      }

      return ciudadano[0];

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
*/


  
  async getCiudadanosFromStoredProc(ci: number, complemento?: string) : Promise<Ciudadano> {
    
    //3701044 1K
    
    //console.log("llego ci: ", ci, complemento);
    
  // const clave = '0x0200000099D665269A70F3159848E3C6FFAE3569D18CD9EC445582CAC9290B20BBE2CDF0A3B377001557F913D7510B9B27DE5754';

  try {

    // Usar parámetros para evitar inyección SQL
      const query = `EXEC [dbo].[paBuscaCiudadanoPorCI] @DocumentoIdentidad = @0`;
      const result = await this.ciudadanoRepository.query(query, [ci]);
      
      // console.log('Resultado de primera consulta:', result);

      
      if (result && result.length > 0) {
        // Tomar el primer resultado (podrías ajustar esta lógica según tus necesidades)
        const idCiudadano = result[0].Ciudadano;

        // Consulta por idCiudadano para obtener datos completos
        const query2 = `EXEC [dbo].[paBuscaPorIdCiudadano] @IdCiudadano = @0`;
        const ciudadano = await this.ciudadanoRepository.query(query2, [idCiudadano]);

        console.log('Resultado de segunda consulta:', ciudadano);

        if (ciudadano && ciudadano.length > 0) {
          return ciudadano[0];
        } else {
          throw new NotFoundException('No existe registro en padrón electoral (segunda consulta)');
        }
      } else {
        throw new NotFoundException('No existe registro en padrón electoral');
      }
    } catch (error) {
      console.error('Error en getCiudadanosFromStoredProc:', error);
      
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