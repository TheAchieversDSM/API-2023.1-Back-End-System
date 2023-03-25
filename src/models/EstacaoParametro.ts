import { type } from "os";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estacao } from "./Estacao";
import { Parametro } from "./Parametro";

@Entity({ name: "estacao_parametro" })
export class EstacaoParametro {
  @ManyToOne(() => Estacao, (estacao) => estacao.estacao_parametro)
  @JoinColumn({
    name: "fk_estacao_id",
  })
  estacao!: Estacao[];
  @ManyToOne(() => Parametro, (parametro) => parametro.estacao_parametro)
  @JoinColumn({
    name: "fk_parametro_id",
  })
  parametro!: Parametro[];

  @PrimaryGeneratedColumn()
  id!: number;
}
