import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('novotante')
export class NoVotante {

    // @PrimaryGeneratedColumn() // Auto-incremented primary key
    // id: number;
    
    @Column()
    codigomesa: string;
    @Column()
    nombrecompleto: string;
    @PrimaryColumn()
    documentoidentidad: string;
    @Column()
    numerocorrelativo: string;
    @Column()
    numeropagina: string;
    @Column()
    nombreusuario: string;

}
