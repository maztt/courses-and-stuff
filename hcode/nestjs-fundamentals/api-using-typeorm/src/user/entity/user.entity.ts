
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Role } from "../../enums/role.enum";

@Entity({
  name: 'users'
})
export class UserEntity {

  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id?: number

  @Column({
    length: 63
  })
  name: string

  @Column({
    length: 127,
    unique: true
  })
  email: string

  @Column({
    length: 127
  })
  password: string

  @Column({
    default: Role.User
  })
  role: number

  @CreateDateColumn()
  createdAt?: Date

  @CreateDateColumn()
  updatedAt?: Date
}