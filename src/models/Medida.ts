import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Alerta } from "./Alerta";
import { Parametro } from "./Parametro";

@Entity({ name: "medida" })
export class Medida {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  unixtime!: number;

  @OneToMany(() => Alerta, (alerta) => alerta.medida)
  alerta!: Alerta;
  
  @OneToOne(() => Parametro, (parametro) => parametro.medidas)
  @JoinColumn({
    name: "fk_parametro_id",
  })
  parametro!: Parametro;
}
