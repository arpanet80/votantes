import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('juradossorteados')
export class JuradoSorteado {

    @PrimaryColumn()
    NroDocumento: string;

    @Column()
    ProcesoElectoral: string;
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
    ControlAsistencia: string;
    @Column()
    Sanción: string;
    @Column()
    FechaRegistro: string;
    @Column()
    UsuarioRegistro: string;

}
