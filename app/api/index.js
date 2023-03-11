import express from "express";
import cors from "cors";
import BookRoutes from "./routes/BookRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/", BookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
