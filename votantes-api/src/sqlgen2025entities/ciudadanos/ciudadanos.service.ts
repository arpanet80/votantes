import { BadRequestException, ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadanoGenerales } from './entities/ciudadano.entity';
import { Repository } from 'typeorm';
import { BuscarCiudadanosDto } from './dto/buscar-ciudadanos.dto';

@Injectable()
export class CiudadanosGeneralesService {

  constructor(
    @InjectRepository(CiudadanoGenerales, 'mssqlgen2025') 
    private ciudadanoRepository: Repository<CiudadanoGenerales>
  ) {}

  // Método para llamar al procedimiento almacenado
  async getCiudadanosFromStoredProc(ci: number, complemento?: string): Promise<CiudadanoGenerales> {
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

        // console.log('Resultado de segunda consulta:', ciudadano);

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

  async getCiudadanosByParams(buscarDto: BuscarCiudadanosDto): Promise<{ data: any[], total?: number, message?: string, resultType: string }> {
    try {
      // Validar que se proporcionen al menos dos parámetros
      const paramsProvided = [
        buscarDto.nombres,
        buscarDto.paterno,
        buscarDto.materno,
        buscarDto.documento,
        buscarDto.complemento,
        buscarDto.fechaNac
      ].filter(param => param !== undefined && param !== '' && param !== null).length;
      
      if (paramsProvided < 2) {
        throw new BadRequestException('Debe proporcionar al menos dos parámetros de búsqueda');
      }

      // Construir la consulta con parámetros
      let query = `EXEC [dbo].[paBuscaCiudadanoV2]`;
      const params = [];
      
      if (buscarDto.nombres) {
        params.push(`@Nombres = '${buscarDto.nombres.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.paterno) {
        params.push(`@Paterno = '${buscarDto.paterno.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.materno) {
        params.push(`@Materno = '${buscarDto.materno.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.documento) {
        params.push(`@Documento = '${buscarDto.documento.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.complemento) {
        params.push(`@Complemento = '${buscarDto.complemento.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.fechaNac) {
        params.push(`@FechaNac = '${buscarDto.fechaNac}'`);
      }
      
      // Unir todos los parámetros
      if (params.length > 0) {
        query += ` ${params.join(', ')}`;
      }
      
      // console.log('Ejecutando query:', query);
      
      // Ejecutar el procedimiento almacenado
      const result = await this.ciudadanoRepository.query(query);
      
      // console.log('Resultado del SP:', result);
      
      // Verificar el tipo de resultado
      if (result && result.length > 0) {
        const firstResult = result[0];
        
        // Si es demasiados resultados
        if (firstResult.resultType === 'TOO_MANY_RESULTS') {
          return {
            data: [],
            total: firstResult.totalCount,
            message: firstResult.message,
            resultType: 'TOO_MANY_RESULTS'
          };
        }
        
        // Si no hay resultados
        if (firstResult.result_type === 'NO_RESULTS') {
          return {
            data: [],
            message: firstResult.message,
            resultType: 'NO_RESULTS'
          };
        }
        
        // Si hay resultados normales (verificar si tiene las propiedades de ciudadano)
        if (firstResult.Ciudadano) {
          return {
            data: result,
            total: result.length,
            resultType: 'SUCCESS'
          };
        }
      }
      
      // Si no hay resultados o el formato no es el esperado
      return {
        data: [],
        resultType: 'NO_RESULTS'
      };
    } catch (error) {
      console.error('Error en getCiudadanosByParams:', error);
      
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Error interno del servidor al buscar ciudadanos');
    }
  }

  /*
  async getCiudadanosByParams(buscarDto: BuscarCiudadanosDto): Promise<CiudadanoGenerales[]> {
    try {
      // Validar que se proporcionen al menos dos parámetros
      const paramsProvided = [
        buscarDto.nombres,
        buscarDto.paterno,
        buscarDto.materno,
        buscarDto.documento,
        buscarDto.complemento,
        buscarDto.fechaNac
      ].filter(param => param !== undefined && param !== '' && param !== null).length;
      
      if (paramsProvided < 2) {
        throw new BadRequestException('Debe proporcionar al menos dos parámetros de búsqueda');
      }

      // Construir la consulta con parámetros
      let query = `EXEC [dbo].[paBuscaCiudadano]`;
      const params = [];
      
      if (buscarDto.nombres) {
        params.push(`@Nombres = '${buscarDto.nombres.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.paterno) {
        params.push(`@Paterno = '${buscarDto.paterno.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.materno) {
        params.push(`@Materno = '${buscarDto.materno.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.documento) {
        params.push(`@Documento = '${buscarDto.documento.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.complemento) {
        params.push(`@Complemento = '${buscarDto.complemento.replace(/'/g, "''")}'`);
      }
      
      if (buscarDto.fechaNac) {
        params.push(`@FechaNac = '${buscarDto.fechaNac}'`);
      }
      
      // Unir todos los parámetros
      if (params.length > 0) {
        query += ` ${params.join(', ')}`;
      }
      
      // console.log('Ejecutando query:', query);
      
      // Ejecutar el procedimiento almacenado
      const result = await this.ciudadanoRepository.query(query);
      
      // El resultado de TypeORM para EXEC ya es el array de resultados
      // No necesitamos procesar el "Return Value" que muestra SSMS
      if (result && result.length > 0) {
        return result;
      } else {
        throw new NotFoundException('No se encontraron ciudadanos con los criterios de búsqueda');
      }
    } catch (error) {
      console.error('Error en getCiudadanosByParams:', error);
      
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Error interno del servidor al buscar ciudadanos');
    }
  }
*/
}