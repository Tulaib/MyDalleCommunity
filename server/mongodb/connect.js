import mongoose, { Mongoose } from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("connected Mongodb"))
    .catch((er) => console.log("err", er));
};

export default connectDB;   
