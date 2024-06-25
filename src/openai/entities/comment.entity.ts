import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "comment"})
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    auth_id: string;

    @Column()
    auth_content_id: number;

    @Column()
    writer: string;

    @Column()
    comment: string;

    @CreateDateColumn()
    createdAt: Date;
}