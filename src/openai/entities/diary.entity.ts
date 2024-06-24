import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "diary"})
export class Diary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    auth_id: string;

    @Column()
    title: string;

    @Column()
    weather: string;

    @Column()
    auth: string;

    @Column()
    date: string;

    @Column()
    content: string;
}