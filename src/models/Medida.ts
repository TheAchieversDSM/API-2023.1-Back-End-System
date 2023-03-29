import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Alerta } from "./Alerta";
import { Estacao } from "./Estacao";
import { Parametro } from "./Parametro";

@Entity({ name: "medida" })
export class Medida {
  @PrimaryGeneratedColumn()
  medida_id!: number;

  @Column()
  valorMedido!: string;

  @Column()
  unixtime!: number;

  @ManyToMany(() => Alerta, (alertas) => alertas.medida)
  alertas!: Alerta[];

  @ManyToOne(() => Parametro, (parametros) => parametros.medidas)
  parametros!: Parametro[];

  @ManyToOne(() => Estacao, (estacao) => estacao.medidas)
  estacao!: Estacao[];
}
