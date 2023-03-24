import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./Parametro";

@Entity()
export class TipoParametro {
  @PrimaryGeneratedColumn()
  id!: number;

  /* Colocar o que o TIPO do parametro vai ter */

  @OneToOne(() => Parametro, (parametro) => parametro.tipo)
  parametro!: Parametro;
}
