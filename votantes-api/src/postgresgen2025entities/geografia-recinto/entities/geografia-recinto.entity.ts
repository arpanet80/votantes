import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('geografiarecinto')
export class GeografiaRecinto {

    // @PrimaryColumn()
    @Column()
    Dep: string;
    @Column()
    Prov: string;
    @Column()
    Sec: string;
    @Column()
    NomDep: number;
    @Column()
    NomProv: string;
    @Column()
    NombreMunicipio: string;
    @Column()
    IdLoc: string;
    @Column()
    AsientoElectoral: string;
    @Column()
    Reci: string;
    @Column()
    NombreRecinto: string;
    @Column()
    Dist: string;
    @Column()
    NomDist: string;
    @Column()
    Zona: string;
    @Column()
    NomZona: string;
    @Column()
    Direccion: string;
    @Column()
    MaxMesasReci: string;
    @Column()
    NroCircun: string;
    @Column()
    TipoCircun: string;
    @Column()
    NomCircun: string;
    @Column()
    latitud: string;
    @PrimaryColumn()
    longitud: string;
    @Column()
    idTipoRecinto: string;
    @Column()
    TipoRecinto: string;
    @Column()
    idUrbanoRural: string;
    @Column()
    descUrbanoRural: string;
    @Column()
    idEstado: string;
    @Column()
    Estado: string;
}
