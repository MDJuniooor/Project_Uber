import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    OneToMany,
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
} from "typeorm";

import Message from "./Message";
import Ride from "./Ride";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    
    @OneToMany(type => Message, message=> message.chat)
    messages: Message[];

    @Column({nullable: true})
    passengerId: number;

    @Column({nullable: true})
    driverId: number;

    @Column({ nullable: true})
    rideId: number;
    

    @OneToOne(type => Ride, ride => ride.chat)
    ride: Ride;

    @ManyToOne(type => User, user => user.chatsAsPassenger)
    passenger: User;

    @ManyToOne(type => User, user => user.chatsAsDriver)
    driver: User;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;


}

export default Chat;