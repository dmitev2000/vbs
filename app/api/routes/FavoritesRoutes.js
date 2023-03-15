import express from "express";
import {
  AddToFavorites,
  RemoveFromFavorites,
  GetFavoriteBooksForUser,
} from "../controllers/FavoriteBooksController.js";

const Router = express.Router();

Router.post("/add", AddToFavorites);

Router.post("/remove", RemoveFromFavorites);

Router.post("/user-favs", GetFavoriteBooksForUser);

export default Router;
