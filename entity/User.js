import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id = undefined;

    @Column({ type: "varchar(50)", unique: true })
    nickname = "";

    @Column({ type: "varchar(50)" })
    password = "";

    @Column({ type: "varchar(50)" })
    first_name = "";

    @Column({ type: "varchar(50)" })
    last_name = "";

    @Column({ type: "varchar(50)", unique: true })
    email = "";

    @Column({ type: "datetime" })
    last_active = new Date().toLocaleString();
}
