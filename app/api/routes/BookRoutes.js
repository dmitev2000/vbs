import express from "express";
import { FetchBooks } from "../controllers/BookController.js";

const Router = express.Router();

Router.get("/fetch", FetchBooks);

export default Router;