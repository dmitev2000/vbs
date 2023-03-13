import express from "express";
import cors from "cors";
import BookRoutes from "./routes/BookRoutes.js";
import AuthorRoutes from "./routes/AuthorRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api/books/", BookRoutes);
app.use("/api/authors/", AuthorRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
