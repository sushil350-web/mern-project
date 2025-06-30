import mongoose from 'mongoose';

export const connectDb= async() =>{
    try {
await mongoose.connect(process.env.MONGO_URL, {
   dbName:"sushilsocial",
});
console.log("Connected to database succesfully")
    }catch(error){
        console.log(error)
    }
}