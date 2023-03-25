import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
  } from "typeorm";
import { Alerta } from "./Alerta";
  
  @Entity({ name: "report" })
  export class Report {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    id_alerta!: number;
  
    @Column()
    unixtime!: number;

    @Column()
    nivel!: number;

    @ManyToOne(
      () => Alerta,
      (alertas) => alertas.reports
    )
    @JoinColumn({
      name: "fk_alerta_id",
    })
    alertas!: Alerta[]

  }