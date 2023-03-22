import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
  } from "typeorm";
  
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
  }