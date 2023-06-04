import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Alerta } from "./Alerta";
import { Estacao } from "./Estacao";
import { Parametro } from "./Parametro";

@Entity({ name: "medida" })
export class Medida {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  medida_id!: number;

  @Column({
    type: "varchar",
  })
  valorMedido!: string;

  @Column({
    type: "bigint",
  })
  unixtime!: number;

  @ManyToMany(() => Alerta, (alertas: any) => alertas.medida)
  alertas!: Alerta[];

  @ManyToOne(() => Parametro, (parametros: any) => parametros.medidas)
  parametros!: Parametro[];

  @ManyToOne(() => Estacao, (estacao: any) => estacao.medidas)
  estacao!: Estacao[];
}
