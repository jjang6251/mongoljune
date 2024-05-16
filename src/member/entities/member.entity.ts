import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "members"})
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true, nullable: false})
    userid: string;

    @Column({nullable: false})
    password: string;

    @Column()
    name: string;

    @Column()
    birth: Date;


}
