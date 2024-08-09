import mongoose from "mongoose";

export const connectDb = ayanc()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('mongo db connected')
    } catch (error) {
        console.log("🚀 ~ connectDb ~ error:", error)
    }


}