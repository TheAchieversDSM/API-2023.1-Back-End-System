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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  uid!: string;

  @Column()
  UTC!: string;

  @Column()
  lati!: number;

  @Column()
  long!: number;

  @Column()
  unixtime!: number;

  @ManyToMany(() => Parametro, (parametro) => parametro.estacoes)
  @JoinTable({
    name: "estacao_parametro",
  })
  parametros!: Parametro[];

  @OneToMany(() => Medida, (medidas) => medidas.parametros)
  medidas!: Medida;
}
