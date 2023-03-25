import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Medida } from "./Medida";
import { Parametro } from "./Parametro";
import { Report } from "./Report";

@Entity({ name: "alerta" })
export class Alerta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar"
  })
  nome!: string;

  @Column()
  valorMax!: number;

  @Column()
  valorMinimo!: number;

  @Column()
  nivel!: number;

  @OneToMany(
    () => Report,
    (reports) => reports.alertas
  )
  reports!: Report

  @ManyToOne(
    () => Medida,
    (medidas) => medidas.alertas
  )
  @JoinColumn({
    name: "fk_medida_id",
  })
  medidas!: Medida[]
}
