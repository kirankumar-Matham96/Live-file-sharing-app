import "dotenv/config";
import express from "express";
import { userRouter } from "./src/features/users/routes.js";
import { connectToDB } from "./src/config/mongoose.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "welcome to realtime file sharing app" });
});

app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`App started and running on port: ${process.env.PORT}`);
  connectToDB();
});
