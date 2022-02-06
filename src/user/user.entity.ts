import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  state: string;

  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert() // runs this before saving to db
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
