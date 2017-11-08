import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id = undefined;

    @Column({ type: "varchar", unique: true })
    nickname = "";

    @Column({ type: "varchar" })
    password = "";

    @Column({ type: "varchar" })
    first_name = "";

    @Column({ type: "varchar" })
    last_name = "";

    @Column({ type: "varchar", unique: true })
    email = "";

    @Column({ type: "datetime" })
    last_active = new Date().toLocaleString();
}
