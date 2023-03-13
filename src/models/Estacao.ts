import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "estacao" })
export class Estacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  lati!: number;

  @Column()
  long!: number;

  @Column()
  unixtime!: number;
}
