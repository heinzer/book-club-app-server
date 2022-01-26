import { Entity, Column } from 'typeorm';

@Entity({ name: 'test' })
export class Item {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
