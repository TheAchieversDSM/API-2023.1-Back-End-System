import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./Parametro";

@Entity({name: "tipo_parametro"})
export class TipoParametro {
  @PrimaryGeneratedColumn()
  tipo_id!: number;

  @Column()
  nome!: string;

  @OneToMany(() => Parametro, (parametro) => parametro.tipo)
  parametro!: Parametro;
}
