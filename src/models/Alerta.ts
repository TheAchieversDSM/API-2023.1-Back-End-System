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

  @ManyToMany(() => Medida, (medida) => medida.alertas)
  @JoinTable({
    name: "alerta_medida"
  })
  medida!: Medida[];

  @OneToMany(() => Report, (reports) => reports.alerta)
  reports!: Report;
}
