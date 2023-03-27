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
import { Report } from "./Report";

@Entity({ name: "alerta" })
export class Alerta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  valorMax!: number;

  @Column()
  valorMinimo!: number;

  @Column()
  nivel!: number;

  @ManyToOne(() => Medida, (medida) => medida.alertas)
  @JoinColumn({
    name: "fk_medida_id",
  })
  medida!: Medida[];

  @OneToMany(() => Report, (reports) => reports.alerta)
  reports!: Report;
}
