import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class UserEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'varchar',
    default: 'user',
    name: 'role',
    nullable: false,
  })
  role?: string;

  @Column({ type: 'varchar', name: 'firstName', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', name: 'username', nullable: true })
  username: string;

  @Column({ type: 'varchar', name: 'langCode', nullable: true })
  langCode: string;

  @Column({ type: 'varchar', name: 'sessionid', nullable: true })
  dialogId?: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;
}
