import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/nodejscomplete", {});
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default await connectToDatabase();
