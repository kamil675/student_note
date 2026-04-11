import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing in .env ");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1); // ✅ stop server if DB fail
  }
};

export default connectDB;
