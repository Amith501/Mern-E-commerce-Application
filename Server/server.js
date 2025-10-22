import express from "express";
import connectDb from "./database/Connect.js";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import productRouter from "./routes/Product.js";
const server = express();
server.use(
  cors({
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

const PORT = 3000 || process.env.PORT;
server.get("/", (req, res) => {
  res.send("this is a expres app");
});
dotenv.config();

//middle ware
server.use(express.json());

server.use("/api/user", userRouter);

server.use("/api/product", productRouter);
connectDb()
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(` Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed ! ", err);
  });
