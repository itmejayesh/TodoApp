import mongoose from "mongoose";

export async function Connect() {
  try {
    mongoose.connect(process.env.DATABASE_URL!);

    const connection = await mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("something goes wrong!");
    console.log(error);
  }
}
