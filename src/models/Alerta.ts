import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Medida } from "./Medida";
import { Report } from "./Report";
import { Parametro } from "./Parametro";

@Entity({ name: "alerta" })
export class Alerta {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  alerta_id!: number;

  @Column({
    type: "varchar",
  })
  nome!: string;

  @Column({
    type: "float",
  })
  valorMax!: number;

  @Column({
    type: "float",
  })
  valorMinimo!: number;

  @Column({
    type: "int",
  })
  nivel!: number;

  @ManyToMany(() => Medida, (medida) => medida.alertas)
  @JoinTable({
    name: "alerta_medida",
  })
  medida!: Medida[];

  @OneToMany(() => Report, (reports) => reports.alerta)
  reports!: Report;

  @ManyToOne(() => Parametro, (parametro) => parametro.alerta)
  @JoinColumn({
    name: "fk_parametro",
  })
  parametro!: Parametro[];
}
