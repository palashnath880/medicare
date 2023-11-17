import connectDB from "../../config/db"
import Doctor from "../../models/Doctors";

export const getDoctors = async () => {
    await connectDB();
    try {
        const doctors = await Doctor.find({}).exec();
        return doctors;
    } catch (err) {
        throw new Error(err);
    }
}