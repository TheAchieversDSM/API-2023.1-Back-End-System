import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { EstacaoParametro } from "./EstacaoParametro";

@Entity({ name: "estacao" })
export class Estacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  lati!: number;

  @Column()
  long!: number;

  @Column()
  unixtime!: number;

  @OneToMany(
    () => EstacaoParametro,
    (estacao_parametro) => estacao_parametro.estacao
  )
  estacao_parametro!: EstacaoParametro;
}
