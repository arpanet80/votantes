import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CertificadoVotanteModule } from './certificado-votante/certificado-votante.module';
import { SqlJud2024Module } from './sqljud2024entities/sqljud2024.module';
import { PostgresJud2024Module } from './postgresjud2024entities/postgresjud2024.module';
import { PostgresGen2025Module } from './postgresgen2025entities/postgresgen2025.module';
import { SqlGen2025Module } from './sqlgen2025entities/sqlgen2025.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    SqlGen2025Module,
    SqlJud2024Module,
    PostgresGen2025Module,
    PostgresJud2024Module,
    CertificadoVotanteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
