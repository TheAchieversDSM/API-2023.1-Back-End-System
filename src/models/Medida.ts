import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Alerta } from "./Alerta";
import { Estacao } from "./Estacao";
import { Parametro } from "./Parametro";

@Entity({ name: "medida" })
export class Medida {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  valorMedido!: string;

  @Column()
  unixtime!: number;

  @OneToMany(() => Alerta, (alertas) => alertas.medida)
  alertas!: Alerta;

  @ManyToOne(() => Parametro, (parametros) => parametros.medidas)
  parametros!: Parametro[];

  @ManyToOne(() => Estacao, (estacao) => estacao.medidas)
  estacao!: Estacao[];
}
