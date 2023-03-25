import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./Parametro";

@Entity()
export class TipoParametro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @OneToOne(() => Parametro, (parametro) => parametro.tipo)
  parametro!: Parametro;
}
