import { Resolvers } from "../../../types/resolvers";
import { sendVerificationSMS } from "../../../utils/sendSMS";
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
const resolvers: Resolvers = {
    Mutation: {
        StartPhoneVerification: async (
            _, 
            args: StartPhoneVerificationMutationArgs
        ): Promise<StartPhoneVerificationResponse> => {
            const {phoneNumber} = args;
            try {
                const exsitingVerification =  await Verification.findOne({payload: phoneNumber});
                if (exsitingVerification){
                    exsitingVerification.remove();
                }
                const newVerification = await Verification.create({
                    payload: phoneNumber,
                    target: "PHONE",
                }).save();
                await sendVerificationSMS(newVerification.payload, newVerification.key);
                return {
                    ok:true,
                    error:null
                };
            } catch (error) {
                return{
                    ok:false,
                    error:error.message
                }
            }
        }
    }
};

export default resolvers;