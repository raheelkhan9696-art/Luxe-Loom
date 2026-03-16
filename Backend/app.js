import "dotenv/config";
import express from "express";
import cors from "cors";

// Import Routes
import connectDB from "./src/config/dbconfig.js";
import adminRoutes from "./src/routes/adminroutes.js";
import userRoutes from "./src/routes/userroutes.js";
import orderRoutes from "./src/routes/orderroutes.js";
import productRoutes from "./src/routes/productroutes.js";
import uploadRoutes from "./src/routes/uploadroutes.js";
import clientroutes from "./src/routes/clientroutes.js";

// ... other app.use calls

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  }),
);

// --- MOUNT ROUTES ---
app.use("/api/admin", adminRoutes);
app.use("/api/auth", userRoutes); // Login, Signup, Profile
app.use("/api/orders", orderRoutes); // Order creation, tracking
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/client", clientroutes); // Client-facing product browsing, cart, checkout


// --- GLOBAL ERROR HANDLER ---

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});


// --- START SERVER ---
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
