import express from "express";
import { GetAuthorByID } from '../controllers/AuthorController.js';

const Router = express.Router();

Router.post("/", GetAuthorByID);

export default Router;