import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "parametro"})
export class Parametro {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    tipo!: string;

    @Column()
    nome!: string;

    @Column()
    unidadeDeMedida!: string;

    @Column()
    fator!: number;

    @Column()
    offset!: number;

}