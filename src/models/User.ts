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
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  nome!: string;

  @Column()
  email!: string;

  @Column({select: false})
  senha!: string;

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
