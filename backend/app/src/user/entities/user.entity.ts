import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/browser';

/**
 * This class defines what a user is inside the database.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  firstname: string;

  @Column({ type: 'varchar', length: 20 })
  lastname: string;

  @Column({ type: 'varchar', length: 20 })
  login: string;

  @Column({ type: 'varchar', length: 40 })
  mail: string;

  @Column({ type: 'varchar', length: 40 })
  hash: string;
}
