import { Resovlers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
const resolvers: Resovlers = {
    Query: {
        GetMyProfile: privateResolver(async (_,__, { req }) => {
            const {user} = req;
            return {
                ok: true,
                error: null,
                user
            }
        })
    }
};
export default resolvers;
