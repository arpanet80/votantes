import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('geografiaconhabilitados')
export class GeografiaConHabilitadosDeptal {

    @PrimaryColumn()
    CodigoMesa: string;
    
    @Column()
    dep: string;
    @Column()
    Departamento: string;
    @Column()
    prov: string;
    @Column()
    Provincia: string;
    @Column()
    sec: string;
    @Column()
    Municipio: string;
    @Column()
    idloc: string;
    @Column()
    Asientoelectoral: string;
    @Column()
    dist: string;
    @Column()
    Distrito: string;
    @Column()
    zon: string;
    @Column()
    Zona: string;
    @Column()
    Cincun: string;
    @Column()
    Tipocircunscripcion: string;
    @Column()
    reci: string;
    @Column()
    Recinto: string;
    @Column()
    Numerodemesa: string;
    @Column()
    mesa: string;
    @Column()
    habilitados : string;
    @Column()
    inhabilitados: string;
}
