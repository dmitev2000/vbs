import express from "express";
import { FetchBooks, GetBookByID } from "../controllers/BookController.js";

const Router = express.Router();

Router.get("/fetch", FetchBooks);

Router.post("/fetch-by-id", GetBookByID);

export default Router;