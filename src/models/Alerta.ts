import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "alerta" })
export class Alerta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_estacao!: number;

  @Column()
  id_parametro!: number;

  @Column()
  valorMax!: number;

  @Column()
  valorMinimo!: number;
}