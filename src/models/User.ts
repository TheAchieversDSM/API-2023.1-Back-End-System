import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  user_id!: number;

  @Column({
    type: "varchar",
  })
  nome!: string;

  @Column({
    type: "varchar",
  })
  email!: string;

  @Column({ type: "varchar" })
  senha!: string;

  @Column({
    type: "int",
  })
  tipoUsuario!: number;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.senha) {
      this.senha = bcrypt.hashSync(this.senha, bcrypt.genSaltSync(10));
    }
  }
  compare(input: string): Promise<boolean> {
    return bcrypt.compare(input, this.senha);
  }
}
