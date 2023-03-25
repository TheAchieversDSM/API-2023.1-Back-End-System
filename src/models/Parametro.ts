import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { EstacaoParametro } from "./EstacaoParametro";
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
  fator!: number;

  @Column()
  offset!: number;

  @OneToOne(() => TipoParametro, (tipo) => tipo.parametro)
  @JoinColumn({
    name: "fk_tipo_id",
  })
  tipo!: string;

  @OneToOne(() => Medida, (medidas) => medidas.parametro)
  medidas!: Medida;

  @OneToMany(
    () => EstacaoParametro,
    (estacao_parametro) => estacao_parametro.parametro
  )
  estacao_parametro!: EstacaoParametro;
}
