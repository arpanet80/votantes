import { JuradoEncontrado } from "src/postgresjud2024entities/jurado-sorteado/entities/jurado-encontrado.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Ciudadano {

    @PrimaryGeneratedColumn() // Auto-incremented primary key
    id: number;

    @Column()
    Ciudadano: number;
    @Column()
    MesaCiudadano: number;
    @Column()
    IdPerson: number;
    @Column()
    appat: string;
    @Column()
    apmat: string;
    @Column()
    apesp: string;
    @Column()
    nombres: string;
    @Column()
    Sexo: string;
    @Column()
    FechaNac: string;
    @Column()
    TipoDocumentoIdentidad: string;
    @Column()
    DocumentoIdentidad: string;
    @Column()
    ComplementoDocumentoIdentidad: string;
    @Column()
    GradoInstruccion: string;
    @Column()
    IdEstadoRegistro: number;
    @Column()
    EstadoRegistro: string;
    @Column()
    TipoRegistro: string;
    @Column()
    Jurado: string;             // Jurado => Si es jurado;   " " => Si no lo es
    @Column()
    Vot: string;
    @Column()
    NumeroMesaCiudadano: number;
    @Column()
    FechaInscripcion: string;
    @Column()
    IdPais: number;
    @Column()
    NomPais: string;
    @Column()
    Dep: number;
    @Column()
    NomDep: string;
    @Column()
    NomProv: string;
    @Column()
    NomMun: string;
    @Column()
    NomLoc: string;
    @Column()
    NomReci: string;
    @Column()
    NomZona: string;
    @Column()
    CodigoMesa: string;
    @Column()
    Voto: boolean;
    @Column()
    numerocorrelativo: string;
    @Column()
    numeropagina: string;
    @Column()
    meesaRecinto: string;
    // @Column()
    juradoEncontrado?: JuradoEncontrado
}
