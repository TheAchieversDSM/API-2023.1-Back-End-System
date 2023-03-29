import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./Parametro";

@Entity({name: "UnidadeMedida"})
export class UnidadeMedida{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @OneToMany(() => Parametro, (parametro) => parametro.unidadeDeMedida)
    parametro!: Parametro;
}