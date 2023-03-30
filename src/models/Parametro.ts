import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Estacao } from "./Estacao";
import { Medida } from "./Medida";
import { TipoParametro } from "./TipoParametro";
import { UnidadeMedida } from "./UnidadeMedida";

@Entity({ name: "parametro" })
export class Parametro {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  parametro_id!: number;

  @Column({
    type: "varchar",
  })
  nome!: string;

  @Column({
    type: "varchar",
  })
  formula!: string;

  @Column({
    type: "float",
  })
  fator!: number;

  @Column({
    type: "float",
  })
  offset!: number;

  @ManyToOne(() => TipoParametro, (tipo) => tipo.parametro)
  @JoinColumn({
    name: "fk_tipo_id",
  })
  tipo!: TipoParametro[];

  @OneToMany(() => Medida, (medidas) => medidas.parametros)
  medidas!: Medida;

  @ManyToMany(() => Estacao, (estacao) => estacao.parametros)
  estacoes!: Estacao[];

  @ManyToOne(
    () => UnidadeMedida,
    (unidadeDeMedida) => unidadeDeMedida.parametro
  )
  @JoinColumn({
    name: "fk_unidadeDeMedida_id",
  })
  unidadeDeMedida!: UnidadeMedida[];
}
