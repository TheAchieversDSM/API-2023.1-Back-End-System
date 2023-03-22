import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Parametro } from "./Parametro";

@Entity({ name: "alerta" })
export class Alerta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  id_estacao!: number;

  @Column()
  id_parametro!: number;

  @Column()
  valorMax!: number;

  @Column()
  valorMinimo!: number;

  @Column()
  nivel!: number;
}
