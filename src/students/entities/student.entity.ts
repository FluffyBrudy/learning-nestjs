import { City } from 'src/cities/entities/city.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//name=table name in db
@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 20 })
  name: string;

  @Column({ name: 'class', type: 'int8' })
  class: number;

  @ManyToOne(() => City, (city) => city.students, { nullable: true })
  @JoinColumn({ name: 'city_id' })
  city: City;
}
