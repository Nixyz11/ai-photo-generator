import mongoose from 'mongoose';

const connectDB = (url)=>{
mongoose.set('strictQuery',true);

mongoose.connect(url).then(()=>console.log('MongoDB connected')).catch((err)=>{
    console.log(err);
    console.log("nece nesto konekcija");


});

}

export default connectDB;