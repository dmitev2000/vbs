import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BookRoutes from "./routes/BookRoutes.js";
import AuthorRoutes from "./routes/AuthorRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

const uri = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api/books/", BookRoutes);
app.use("/api/authors/", AuthorRoutes);
app.use("/api/auth/", AuthRoutes);

// Error handler
app.use((err, req, res, next) => {
  return res.status(err.status).json(err.message);
});

connection.once("open", () => {
  console.log("MongoDB connection established successfully.");
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
});
