import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'bool', nullable: true, default: true })
  active: boolean;
}
