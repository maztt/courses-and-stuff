import { Role } from "src/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity({
  name: 'users'
})
export class UserEntity {

  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number

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
  createdAt: string

  @CreateDateColumn()
  updatedAt: string
}