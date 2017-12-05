import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    id = undefined;

    @Column({ type: "int" })
    user_id = undefined;

    @Column({ type: "int" })
    contact_id = undefined;
}
