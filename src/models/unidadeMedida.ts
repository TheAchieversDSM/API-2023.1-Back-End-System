import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./Parametro";

@Entity({ name: "unidade_medida" })
export class UnidadeMedida {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  unidade_id!: number;

  @Column({
    type: "varchar",
  })
  nome!: string;

  @OneToMany(() => Parametro, (parametro: any) => parametro.unidadeDeMedida)
  parametro!: Parametro;
}
