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

  @ManyToOne(() => Medida, (medida) => medida.alerta)
  @JoinColumn({
    name: "fk_medida_id",
  })
  medida!: Alerta[];

  @OneToMany(() => Report, (reports) => reports.alerta)
  reports!: Report;
}
