import mongoose from "mongoose";

mongoose.connect(process.env.URL_BANCO, { dbName: "registro" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

