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

@Entity({ name: "report" })
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  unixtime!: number;

  @Column()
  nivel!: number;

  @ManyToOne(() => Alerta, (alerta) => alerta.reports)
  @JoinColumn({
    name: "fk_alerta_id"
  })
  alerta!: Alerta[];
}