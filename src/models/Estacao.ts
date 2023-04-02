import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Medida } from "./Medida";

import { Parametro } from "./Parametro";

@Entity({ name: "estacao" })
export class Estacao {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  estacao_id!: number;

  @Column({
    type: "varchar",
  })
  nome!: string;

  @Column({
    type: "varchar",
  })
  uid!: string;

  @Column({
    type: "varchar",
  })
  UTC!: string;

  @Column({
    type: "float",
  })
  lati!: number;

  @Column({
    type: "float",
  })
  long!: number;

  @Column({
    type: "bigint",
  })
  unixtime!: number;

  @ManyToMany(() => Parametro, (parametro) => parametro.estacoes)
  @JoinTable({
    name: "estacao_parametro",
  })
  parametros!: Parametro[];

  @OneToMany(() => Medida, (medidas) => medidas.parametros)
  medidas!: Medida;
}
