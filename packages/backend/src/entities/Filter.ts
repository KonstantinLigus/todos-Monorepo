import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Filter {
  @PrimaryColumn()
  owner: string;

  @Column({ default: '' })
  title: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isComplete: boolean;
}
