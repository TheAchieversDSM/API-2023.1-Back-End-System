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
  
  @Entity({ name: "medida" })
  export class Medida {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    id_estacao!: number;
  
    @Column()
    id_parametro!: number;
  
    @Column()
    unixtime!: number;

    @OneToMany(
      () => Alerta,
      (alertas) => alertas.medidas
    )
    alertas!: Alerta
  }