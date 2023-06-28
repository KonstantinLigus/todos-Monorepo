import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isComplete: boolean;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: '' })
  owner: string;
}
