import Chat from "../../../entities/Chat";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { Resolvers } from "../../../types/resolvers";
import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        UpdateRideStatus: privateResolver(
            async(
                _, 
                args: UpdateRideStatusMutationArgs, 
                { req, pubSub }
            ): Promise<UpdateRideStatusResponse> => {
            const user: User = req.user;
            if (user.isDriving){
                try {
                    let ride: Ride | undefined;
                    if (args.status === "ACCEPTED") {
                        const ride = await Ride.findOne({id: args.rideId, status: "REQUESTING"},{relations: ["passenger"]});
                        if (ride) {
                            ride.driver = user;
                            user.isTaken = true;
                            user.save();
                        }
                    } else {
                        ride = await Ride.findOne({
                            id: args.rideId,
                            driver: user
                        });
                    }
                    if (ride) {
                        ride.status = args.status;
                        user.isTaken = true;
                        user.save();
                        const chat = await Chat.create({
                            driver: user,
                            passenger: ride.passenger
                        }).save();
                        ride.chat = chat;
                        ride.save();
                        pubSub.publish("rideUpdate", { RideStatusSubscription: ride });
                        return {
                            ok: true,
                            error: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can't update ride"
                        }
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }
            } else {
                return {
                    ok: false,
                    error: "You are not driving"
                }
            }

        })
    }
}

export default resolvers;