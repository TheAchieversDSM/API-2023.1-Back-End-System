import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./Parametro";

@Entity({name: "unidade_medida"})
export class UnidadeMedida{
    @PrimaryGeneratedColumn()
    unidade_id!: number;

    @Column()
    nome!: string;

    @OneToMany(() => Parametro, (parametro) => parametro.unidadeDeMedida)
    parametro!: Parametro;
}