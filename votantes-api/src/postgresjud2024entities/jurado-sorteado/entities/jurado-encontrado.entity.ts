import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class JuradoEncontrado {
    @PrimaryColumn()
    cedula: string;
    @Column()
    asistente: boolean;
    @Column()
    esjurado: boolean;
    @Column()
    tipoDesignacion: string;
    @Column()
    codigoMesaEnQueAsistio: string;
}
