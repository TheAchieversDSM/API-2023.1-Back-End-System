import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Estacao } from "./Estacao";
import { Medida } from "./Medida";
import { TipoParametro } from "./TipoParametro";

@Entity({ name: "parametro" })
export class Parametro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  unidadeDeMedida!: string;

  @Column()
  formula!: string;

  @Column()
  fator!: number;

  @Column()
  offset!: number;

  @OneToOne(() => TipoParametro, (tipo) => tipo.parametro)
  @JoinColumn({
    name: "fk_tipo_id",
  })
  tipo!: TipoParametro;

  @OneToOne(() => Medida, (medidas) => medidas.parametros)
  medidas!: Medida;

  @ManyToMany(() => Estacao, (estacao) => estacao.parametros)
  estacoes!: Estacao[];
}
