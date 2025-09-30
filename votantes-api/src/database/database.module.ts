import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//// Posible cualquier cantidad de bases ql server y postgres ///////////////

@Module({
    imports: [
      // Conexion Ms SQL Server Generales 2025 ///////////
      TypeOrmModule.forRootAsync({
          name: 'mssqlgen2025',
          useFactory: () => ({
            /*type: 'mssql',
            host: `10.51.15.155\\EG2025`,
            port: 1433,
            username: `usrapp_desconectado`,
            password: `D35c0n3ct4d0$3g2025*`,
            database: `ImpedimentoDesconectado`,*/
            type: 'mssql',
            host: `10.51.15.156`,
            port: 1433,
            username: `appuser`,
            password: `4ppUs3r!2k25$Dante%%`,
            database: `ConsultaEG2025`,

            entities: [__dirname + '/../sqlgen2025entities/**/*.entity{.ts,.js}'],
            synchronize: false, 
            options: {
              encrypt: false, // Para desarrollo local
              trustServerCertificate: true, // Para desarrollo local
              requestTimeout: 60000, // Aumenta el timeout a 60 segundos
              connectTimeout: 30000, // Aumenta el timeout de conexión
            },
            extra: {
              connectionTimeout: 30000,
              requestTimeout: 60000,
            }
          }),
        }),
      // Conexion Ms SQL Server Judiciales 2024 ///////////
      TypeOrmModule.forRootAsync({
          name: 'mssqljud2024',
          useFactory: () => ({
            /*type: 'mssql',
            host: `10.51.15.164\\EJ2024_LITE`,
            port: 1433,
            username: `usr_app_impedimentos_desc`,
            password: `Usr_Imp3dim3nt0s#24`,
            database: `ImpedimentoDesconectado`,
            */
            type: 'mssql',
            host: `10.51.15.156`,
            port: 1433,
            username: `appuser`,
            password: `4ppUs3r!2k25$Dante%%`,
            database: `ConsultaEJ2024`,

            entities: [__dirname + '/../sqljud2024entities/**/*.entity{.ts,.js}'],
            synchronize: false, 
            
            options: {
              encrypt: false, 
              trustServerCertificate: true, 
            },
          }),
        }),

        //// Conexion Postgres Generales 2025 /////////////
        TypeOrmModule.forRootAsync({
          name: 'postgresgen2025',  
          useFactory: () => ({
            type: 'postgres',
            url: `postgresql://postgres:Pa$$Base2022@10.51.15.101:5432/EleccionesEG2025?options=-c%20search_path=ted`,
            // url: `postgresql://${configService.get('POSTGRES_USER')}:${configService.get('POSTGRES_PASSWORD')}@${configService.get('POSTGRES_HOST')}:${configService.get('POSTGRES_PORT')}/${configService.get('POSTGRES_DB')}?options=-c%20search_path=${configService.get('POSTGRES_PATH')}`,
            entities: [__dirname + '/../postgresgen2025entities/**/*.entity{.ts,.js}'],
            synchronize: false, // Si pone en true ELIMINA TODO y realiza migraciones automáticamente para que su base de datos sea idéntica a su modelado
          }),          
        }),
        //// Conexion Postgres Judiciales 2024 /////////////
        TypeOrmModule.forRootAsync({
          name: 'postgresjud2024',  
          useFactory: () => ({
            type: 'postgres',
            url: `postgresql://postgres:Pa$$Base2022@10.51.15.101:5432/EleccioneEJ2024?options=-c%20search_path=ted`,
            // url: `postgresql://${configService.get('POSTGRES_USER')}:${configService.get('POSTGRES_PASSWORD')}@${configService.get('POSTGRES_HOST')}:${configService.get('POSTGRES_PORT')}/${configService.get('POSTGRES_DB')}?options=-c%20search_path=${configService.get('POSTGRES_PATH')}`,
            entities: [__dirname + '/../postgresjud2024entities/**/*.entity{.ts,.js}'],
            synchronize: false, // Si pone en true ELIMINA TODO y realiza migraciones automáticamente para que su base de datos sea idéntica a su modelado
          }),          
        }),
      ],
})
export class DatabaseModule {}




