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
  valorMedido!: string;

  @Column()
  unixtime!: number;

  @OneToMany(() => Alerta, (alertas) => alertas.medida)
  alertas!: Alerta;

  @OneToOne(() => Parametro, (parametros) => parametros.medidas)
  @JoinColumn({
    name: "fk_parametro_id",
  })
  parametros!: Parametro;
}
