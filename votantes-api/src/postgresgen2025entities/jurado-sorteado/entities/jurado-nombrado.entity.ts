import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('juradosnombrados')
export class JuradoNombrado {
    @PrimaryColumn()
    id: number;
    @Column()
    Departamento: string;
    @Column()
    Provincia: string;
    @Column()
    Municipio: string;
    @Column()
    Localidad: string;
    @Column()
    Recinto: string;
    @Column()
    NúmeroMesa: string;
    @Column()
    CódigoMesa: string;
    @Column()
    ApPaterno: string;
    @Column()
    ApMaterno: string;
    @Column()
    ApEsposo: string;
    @Column()
    Nombres: string;
    @Column()
    NroDocumento: string;
    @Column()
    TipodeJurado: string;
    @Column()
    FechaRegistro: string;
    @Column()
    UsuarioRegistro: string;
}
