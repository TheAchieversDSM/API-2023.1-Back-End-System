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
    type: "int",
  })
  nivel!: number;

  @ManyToOne(() => Alerta, (alerta) => alerta.reports)
  @JoinColumn({
    name: "fk_alerta_id",
  })
  alerta!: Alerta[];
}
