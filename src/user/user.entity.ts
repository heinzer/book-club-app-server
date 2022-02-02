import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string;

  @Column({
      type: 'varchar',
      nullable: false
  })
  email: string;
  @BeforeInsert() // runs this before saving to db
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
