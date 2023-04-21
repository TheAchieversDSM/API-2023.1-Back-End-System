import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Alerta } from "./Alerta";

@Entity({ name: "report" })
export class Report {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  report_id!: number;

  @Column({
    type: "bigint",
  })
  unixtime!: number;

  @Column({
    type: "varchar",
  })
  msg!: string;
  @Column({
    type: "varchar",
  })
  estacao_uid!: string;
  @Column({
    type: "varchar",
  })
  valorEmitido!: string;

  @Column({
    type: "varchar",
  })
  tipoParametro!: string;

  @Column({
    type: "int",
  })
  nivelAlerta!: string;
  @ManyToOne(() => Alerta, (alerta) => alerta.reports)
  @JoinColumn({
    name: "fk_alerta_id",
  })
  alerta!: Alerta[];
}
