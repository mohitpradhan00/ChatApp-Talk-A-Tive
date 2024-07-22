import mongoose from "mongoose";

export const Connectdb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGOURI);
        console.log(`MONGODB Connected ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};


