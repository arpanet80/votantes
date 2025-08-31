import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('geografiadesconectado2025')
export class GeografiaDesconectado {

    @Column()
    IdMesaGeografia: string;
    @Column()
    IdProcesoElectoral: string;
    @PrimaryColumn()
    CodigoMesa: string;
    @Column()
    NumMesa: number;
    @Column()
    NumeroMesa: string;
    @Column()
    IdPais: string;
    @Column()
    NomPais: string;
    @Column()
    Dep: string;
    @Column()
    NomDep: string;
    @Column()
    Prov: string;
    @Column()
    NomProv: string;
    @Column()
    Circun: string;
    @Column()
    NomCircun: string;
    @Column()
    Sec: string;
    @Column()
    NomMun: string;
    @Column()
    IdLoc: string;
    @Column()
    NomLoc: string;
    @Column()
    Dist: string;
    @Column()
    NomDist: string;
    @Column()
    Zona: string;
    @Column()
    NomZona: string;
    @Column()
    Reci: string;
    @Column()
    NomReci: string;
    @Column()
    CINotE: string;
    @Column()
    NomNotE: string;
    @Column()
    InscritosHabilitados: string;
    @Column()
    IdTipoMesa: string;
    @Column()
    IdEstadoMesaGeografia: string;
    @Column()
    FechaRegistro: string;
    @Column()
    EstadoRegistro: string;
}
