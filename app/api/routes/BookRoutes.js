import express from "express";
import { FetchBooks, FetchFavoriteBooks, GetBookByID } from "../controllers/BookController.js";

const Router = express.Router();

Router.get("/fetch", FetchBooks);

Router.post("/fetch-by-id", GetBookByID);

Router.post("/fetch-fav", FetchFavoriteBooks)

export default Router;