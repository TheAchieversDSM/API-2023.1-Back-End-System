import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
  } from "typeorm";
  
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
  }