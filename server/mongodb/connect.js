import mongoose from "mongoose";

const connectDB=(url)=>{
    mongoose.set('strictQuery', true);//this will be used when we implement the search functionality

    mongoose.connect(url)
    .then (()=>console.log('MonogDB connected'))
    .catch((err)=>console.log(err));
}

export default connectDB;