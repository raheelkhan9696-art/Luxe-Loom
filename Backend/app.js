import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./src/config/dbconfig.js";

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(
  cors({
    origin: "*",
  }),
);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
