import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'club' })
export class ClubEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;
}
