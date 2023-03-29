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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

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

  @OneToMany(() => Medida, (medidas) => medidas.parametros)
  medidas!: Medida;

  @ManyToMany(() => Estacao, (estacao) => estacao.parametros)
  estacoes!: Estacao[];

  @ManyToOne(() => UnidadeMedida, (unidadeDeMedida) => unidadeDeMedida.parametro)
  @JoinColumn({
    name: "fk_unidadeDeMedida_id",
  })
  unidadeDeMedida!: UnidadeMedida[];
}
