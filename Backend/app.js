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

const app = express();
// Render sets the PORT environment variable automatically
const port = process.env.PORT || 3000; 

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optimized CORS for production
app.use(
  cors({
    origin: "*", // For development. In production, consider replacing with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

// Health Check (Crucial for Render to know your app is "Alive")
app.get("/health", (req, res) => {
  res.status(200).send("Vault is Secure");
});

// --- MOUNT ROUTES ---
app.use("/api/admin", adminRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/client", clientroutes);

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- START SERVER ---
// IMPORTANT: Bind to '0.0.0.0' for Render
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});